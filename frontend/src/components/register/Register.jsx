import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import "./register.css";
import Footer from "../footer/Footer";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setUserpass] = useState("");
  const [usernameError, setUsernameError] = useState(""); // Lỗi cho username
  const [emailError, setEmailError] = useState(""); // Lỗi cho username

  const [passwordError, setPasswordError] = useState(""); // Lỗi cho password

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let valid = true;
  const handleRegister = (e) => {
    // khi regis thanh cong => not refresh page
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");
    setEmailError("");
    if (!username) {
      setUsernameError("Username is required.");
      valid = false;
    }

    // Kiểm tra validation cho password
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    }

    // Nếu không hợp lệ thì dừng lại
    if (!valid) {
      return;
    }
    const newUser = {
      email: email,
      username: username,
      password: password,
    };
    registerUser(newUser, dispatch, navigate);
  };

  return (
    <div>
      <section className="login-container login_Background">
        <div className="form_Infor">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkSxrMLzuLbuA0kjtuvAbcCP-Is9s5l04BNA&s"
            alt=""
          />
          <form onSubmit={handleRegister} className="form_Login form_register">
            <h1 className="login-title"> Sign up </h1>
            <input
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-message">{emailError}</p>}{" "}
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && <p className="error-message">{usernameError}</p>}{" "}
            {/* Lỗi cho password */}
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setUserpass(e.target.value)}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}{" "}
            {/* Lỗi cho password */}
            <button type="submit" className="continue_Button">
              {" "}
              Create account{" "}
            </button>
            <div className="register_Shoppee">
              <div className="login-register"> Bạn đã có tài khoản? </div>
              <Link className="login-register-link" to="/login">
                Đăng nhập ngay{" "}
              </Link>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Register;
