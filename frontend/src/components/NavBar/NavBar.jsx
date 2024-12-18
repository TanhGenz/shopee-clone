import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./navbar.css";
import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logOutSuccess } from "../../redux/authSlice";
import { CartContext } from "../../FunctionRenderApi/CartContext";
import { FaShoppingCart } from "react-icons/fa"; // Import icon giỏ hàng
import { Button } from "react-bootstrap";
import { formatCurrency } from "../ExchangeMoney/formatCurrency";
export default function NavBar() {
  const { cart, addToCart, setCart } = useContext(CartContext);
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;

  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const decreaseQuantity = (item) => {
    const updatedCart = cart
      .map((cartItem) => {
        if (cartItem.id === item.id) {
          // Nếu số lượng > 1 thì giảm
          if (cartItem.quantity > 1) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          } else {
            // Nếu số lượng = 1 thì xóa sản phẩm
            return null;
          }
        }
        return cartItem;
      })
      .filter(Boolean); // Loại bỏ các sản phẩm null
    setCart(updatedCart);
  };
  const increaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  const [showCart, setShowCart] = useState(false); // Trạng thái hiển thị danh sách sản phẩm
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);

  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleAddToCart = (item) => {
    if (!user) {
      // Hiển thị thông báo nếu chưa đăng nhập
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/login"); // Chuyển hướng đến trang đăng nhập
      return;
    }

    // Nếu đã đăng nhập, thêm sản phẩm vào giỏ hàng
    addToCart(item);
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
  };

  const handleCheckout = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thực hiện thanh toán!");
      navigate("/login");
      return;
    }
    // Logic thanh toán tiếp theo
    alert("Tiến hành thanh toán...");
  };

  return (
    <nav className="navbar-container">
      <a href="/MainPage">
        <img
          className="img_Header"
          src="data:image/png;base64,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"
          alt="Logo"
        />
      </a>

      {/* Icon giỏ hàng */}
      <div className="cart-container">
        <div onClick={toggleCart} className="cart-icon"></div>

        {/* Dropdown hiển thị sản phẩm */}
        {showCart && (
          <div className="cart-dropdown">
            {cart.length > 0 ? (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.avatar} alt={item.name} />{" "}
                    {/* Hình ảnh sản phẩm */}
                    <div className="cart-item-info">
                      <h5>{item.name}</h5>
                      <p>{formatCurrency(item.price)}</p>
                    </div>
                    <div className="cart-item-quantity">
                      <button
                        className="decreaseButton"
                        onClick={() => decreaseQuantity(item)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="increaseButton"
                        onClick={() => increaseQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <div className="cart-footer">
                  <button onClick={() => navigate("/checkout")}>
                    Thanh Toán
                  </button>
                </div>
              </>
            ) : (
              <p>Giỏ hàng trống</p>
            )}
          </div>
        )}
      </div>

      {/* Đăng xuất */}
      {user ? (
        <>
          {/* Chỉ hiển thị giỏ hàng khi isAdmin là false (người dùng bình thường) */}
          {!user.isAdmin && (
            <div className="cart-container">
              <button onClick={toggleCart}>
                <FaShoppingCart />
                {cart.length > 0 && <span>{cart.length}</span>}
              </button>

              {showCart && (
                <div className="cart-items">
                  {/* Hiển thị các sản phẩm trong giỏ hàng */}
                </div>
              )}
            </div>
          )}

          <p className="navbar-user">
            Hi: <span>{user.username}</span>
          </p>

          {/* Chỉ hiển thị nút "Product List" cho admin */}
          {user.isAdmin && (
            <Link to={"/ProductList"}>
              <Button variant="secondary">User List Product</Button>
            </Link>
          )}

          <Link to="/logout" className="navbar-logout" onClick={handleLogout}>
            Log out
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">
            Login
          </Link>
          <Link to="/register" className="navbar-register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
}
