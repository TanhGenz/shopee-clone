import { deletleUsers, getAllUsers } from "../../redux/apiRequest";
import "./home.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const HomePage = () => {
  // lay token tu login
  const user = useSelector((state) => state.auth.login?.currentUser);
  // optional chaining => handle
  const userList = useSelector((state) => state.users.users?.allUsers);
  const msg = useSelector((state) => state.users?.msg);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleDelete = (id) => {
    deletleUsers(user?.accessToken, dispatch, id, axiosJWT);
  };

  // REFRESH TOKEN

  // new axios

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  return (
    <main className="home-container">
      <div className="home-title">User List</div>

      <div className="home-role">
        {`Your role: ${user?.isAdmin ? `Admin` : `User`}`}
      </div>
      <Link to={"/ProductList"}>
        <Button variant="secondary">User List Product</Button>
      </Link>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div
                className="delete-user"
                onClick={() => handleDelete(user._id)}
              >
                {" "}
                Delete{" "}
              </div>
            </div>
          );
        })}
      </div>
      <div className="errorMsg">{msg}</div>
      <Footer />
    </main>
  );
};

export default HomePage;
