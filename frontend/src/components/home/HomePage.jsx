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
  console.log(userList);

  const msg = useSelector((state) => state.users?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const handleDelete = (id) => {
    deletleUsers(user?.accessToken, dispatch, id, axiosJWT);
  };
  useEffect(() => {
    if (!user) {
      navigate("/MainPage");
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {/* {userList?.map((user) => {
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
        })} */}

        <table className="table-auto w-full border-collapse border border-gray-300 table_Data">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">STT</th>
              {/* <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
              <th className="border border-gray-300 px-4 py-2">Tên sản phẩm</th>
              <th className="border border-gray-300 px-4 py-2">Mục Sản Phẩm</th>
              <th className="border border-gray-300 px-4 py-2">Số lượng</th>
              <th className="border border-gray-300 px-4 py-2">Giá</th> */}
              <th className="border border-gray-300 px-4 py-2">Tên user </th>
              <th className="border border-gray-300 px-4 py-2">Role </th>

              <th className="border border-gray-300 px-4 py-2">Action </th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((user, index) => (
              <tr key={user.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{index++}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.username}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {user.isAdmin ? "Admin" : "User"}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  <div
                    className="delete-user"
                    onClick={() => handleDelete(user._id)}
                  >
                    {" "}
                    Delete{" "}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="errorMsg">{msg}</div>
      <Footer />
    </main>
  );
};
export default HomePage;
