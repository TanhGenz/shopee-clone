// file này đảm nhiệm logic cho phần auth
const User = require("../models/User");
// bcrypt dùng để hash mật khẩu kh cho ng khác biết
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// array
let refreshTokens = [];

const authController = {
  //FUNC LOGIC cho REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      //Create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      //Save user to DB
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      // lỗi  500 => lỗi server
      res.status(500).json(err);
    }
  },

  // GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
  },

  // GENERATE REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "365d" }
    );
  },

  //LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("Incorrect username");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("Incorrect password");
      }
      if (user && validPassword) {
        // GENERATE ACCESS TOKEN
        const accessToken = authController.generateAccessToken(user);

        // GENERATE REFRESH TOKEN
        const refreshToken = authController.generateRefreshToken(user);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          // ngan chan csrf bang cach http chi duoc gui den website
          sameSite: "strict",
          // trong cookies da co refresh nen kh can fai khai ra
        });

        // kh muon hien password trong data in mongoDB
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // REQUEST REFRESH TOKEN
  // requestRefreshToken: async (req, res) => {
  //   //Take refresh token from user (lay thu dai han de tao moi)
  //   const refreshToken = req.cookies.refreshToken;

  //   if (!refreshToken) return res.status(401).json("You're not authenticated");
  //   // neu refresh token kh fai cua minh => token is not valid
  //   if (!refreshTokens.includes(refreshToken)) {
  //     return res.status(403).json("Refresh token is not valid");
  //   }
  //   // (1): verify token
  //   jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  //     //create new access token, refresh token and send to user
  //     // created generateAccessToken
  //     // user id van la tk user nho vao (1)
  //     const newAccessToken = authController.generateAccessToken(user);
  //     const newRefreshToken = authController.generateRefreshToken(user);
  //     // refeesh token se luu vao array
  //     refreshTokens.push(newRefreshToken);
  //     // new token refresh => input into cookkies
  //     res.cookie("refreshToken", refreshToken, {
  //       httpOnly: true,
  //       secure:false,
  //       path: "/",
  //       sameSite: "strict",
  //     });
  //     res.status(200).json({
  //       // nen luu vao data => de kh lap lai => recomment redix(data) => create array = data
  //       accessToken: newAccessToken,
  //       // refreshToken: newRefreshToken,
  //     });
  //   });
  // },

  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        // refreshToken: newRefreshToken,
      });
    });
  },

  //LOG OUT
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },
};

// store token (3 dang luu tru token)
// 1) local storage: luu tru phan client cua minh (luu tru token) => easy to acttack by XSS(chay scrypt)
// 2) Cookies: it bi anh huong XSS => verify => send token to cookies => not in local => bi anh huong boi CSRF (trang web lau hay hien quang cao)
// 3) redux store => luu access token
// HTTPONLY cookies => luu refresh token

module.exports = authController;
