// file này làm chức năng cho users

const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyTokens = require("../controllers/verifyToken");
//GET ALL USERS
router.get("/", verifyTokens.verifyToken, userController.getAllUsers);

//DELETE USER
// func chỉ có admin mới được quyền xoá user | "/:id" => v1/user/123456789 
router.delete("/:id", verifyTokens.verifyTokenAndAdmin, userController.deleteUser);

module.exports = router;