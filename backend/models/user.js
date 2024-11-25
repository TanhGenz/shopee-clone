// file chứa khung sườn của users

// gọi mongoose để tương tác dữ liệu
const mongoose = require("mongoose");

// những thông tin khi đăng kí đăng nhập
// "unique: true" => sinh ra với mục đích nếu như những thông tin đã có rồi mà vẫn điền lại thì sẽ không cho
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 6,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      min: 10,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false, // bất kì ai đăng nhập vào cũng kh nhất thiết phải là admin
    },
  },
  { timestamps: true } // cho biết user đc tạo và update khi nào
);

module.exports = mongoose.model("User", userSchema);