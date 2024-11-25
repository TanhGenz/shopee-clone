const jwt = require("jsonwebtoken");

const verifyTokens = {
    // verifyToken 
    // header => token : verify token
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if(token){
            //bearer 123456
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN,(err, user) => {
                if(err){
                    // 403: bi ngan cam
                    return res.status(403).json("token is not valid");
                }
                req.user = user;
                next();
            });
        }
        else{
            return res.status(401).json("you are not authenticated")
        }
    },
    verifyTokenAndAdmin :(req, res, next) => {
        verifyTokens.verifyToken(req, res, () => {
            // chi can tk do la chinh ng dung hoac la admin thi moi duoc xoa tai khoan
          if (req.user.id == req.params.id || req.user.isAdmin) {
            next();
          } else {
            res.status(403).json("You're not allowed to do that!");
          }
        });
    }
}

module.exports = verifyTokens;




/*
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
  const token = req.headers.token;
  const refreshToken = req.cookies.refreshToken;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id|| req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
};
*/