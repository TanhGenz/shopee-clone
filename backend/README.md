### `npm install express mongoose`
express => cho sever, mongoose là mongoDB => đẻ ra khi đăng kí, hay đăng nhập sẽ có sever lưu và sever đó sẽ sử dụng mongodb
<!-- "dependencies": {
    "express": "^4.21.1",
    "mongoose": "^8.8.2"
  } -->

### `npm install cors dotenv bcrypt cookie-parser jsonwebtoken`
<!-- "dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.8.2"
  } -->


### `app.use(cors());` => sinh ra để ngăn lỗi
**CORS Origin Error (Cross-Origin Resource Sharing)**
Xảy ra khi trình duyệt ngăn chặn một yêu cầu đến từ một nguồn khác với nguồn của trang hiện tại. Lỗi này thường xuất hiện khi cố gắng gửi yêu cầu API hoặc yêu cầu tài nguyên (như JSON, hình ảnh, hoặc tệp dữ liệu) từ một trang web đến một máy chủ có origin khác (khác tên miền, cổng, hoặc giao thức).

**create database by mongoDB**
**AUTHENTICATION**
So sánh dữ liệu nhập và database hiện có
**AUTHORIZATION**
Phân quyền (admin | user)

**Models cho user**
patern MVC => model view controller




**ROUTES**
func phân quyền

**JWT**
<!-- //DELETE A USER
    deleteUser: async (req, res) => {
    try {
    // req.params.id => v1/user/123
    //   await User.findByIdAndDelete(req.params.id);
        await User.findById(req.params.id);  
        res.status(200).json("User deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }, -->
nếu như kh có jwt thì ai cũng có thể vo tương tác với dữ liệu và xoá user đc hết, kh chưng thực gì hết => JWT 
Xác thực người dùng, giúp mình khi đăng nhập vào sẽ cho token => trong token có mã = CMND => xác thực danh tính

**middleWare**
xác thực => cho hành động = middleWare

**ACCESS TOKEN**
ngan han muon token => het hieu luc => tao tken moi => user (safety)
**REFRESH TOKEN**
dai han lay token (du tru)