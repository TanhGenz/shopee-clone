import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import Footer from "../footer/Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setUserpass] = useState("");
  const [usernameError, setUsernameError] = useState(""); // Lỗi cho username
  const [passwordError, setPasswordError] = useState(""); // Lỗi cho password

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Reset lỗi trước khi kiểm tra
    setUsernameError("");
    setPasswordError("");

    let valid = true;

    // Kiểm tra validation cho username
    if (!username) {
      setUsernameError("Username is required.");
      valid = false;
    }

    // Kiểm tra validation cho password
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    }

    // Nếu không hợp lệ thì dừng lại
    if (!valid) {
      return;
    }

    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };

  return (
    <div>
      <div>
        <section className="login-container login_Background">
          <div className="form_Infor">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkSxrMLzuLbuA0kjtuvAbcCP-Is9s5l04BNA&s"
              alt=""
            />
            <form onSubmit={handleLogin} className="form_Login">
              <h1 className="login-title">Đăng Nhập</h1>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && (
                <p className="error-message">{usernameError}</p>
              )}{" "}
              {/* Lỗi cho username */}
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setUserpass(e.target.value)}
              />
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}{" "}
              {/* Lỗi cho password */}
              <button type="submit" className="continue_Button">
                Continue
              </button>
              <div className="register_Shoppee">
                <div className="login-register">Bạn mới biết đến shoppee</div>
                <Link className="login-register-link" to="/register">
                  Đăng Ký ngay
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
