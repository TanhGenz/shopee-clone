// ở file này chi để cho biết route nằm ở đâu
// Do là làm theo logic mvc controller nên logic sẽ kh trực tiếp vào đây mà thông qua authController

const authController = require("../controllers/authController");
const verifyTokens = require("../controllers/verifyToken");
const router = require("express").Router();
// const { verifyToken } = require("../controllers/verifyToken");

//REGISTER
router.post("/register", authController.registerUser);
//LOG IN
router.post("/login", authController.loginUser);

// REFRESH TOKEN 
router.post("/refresh", authController.requestRefreshToken);

//LOG OUT
router.post("/logout", verifyTokens.verifyToken, authController.logOut);


module.exports = router;