const User = require("../models/User");

const userController = {
    //GET ALL USER
    // tim tat ca thang user trong database
    getAllUsers: async (req, res) => {
        try {
          const user = await User.find();
          res.status(200).json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    //DELETE A USER
    deleteUser: async (req, res) => {
    try {
    // req.params.id => v1/user/123
    //   await User.findByIdAndDelete(req.params.id);
        await User.findById(req.params.id);  
        res.status(200).json("User deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
}

module.exports = userController;