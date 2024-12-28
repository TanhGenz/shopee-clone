import React, { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  // Chuyển đổi cart thành mảng khi cần tính toán
  const [cart, setCart] = useState([]); // Khai báo cart và setCart trong context

  //   // Khởi tạo giỏ hàng từ Local Storage
  //   const storedCart = localStorage.getItem("cart");
  //   if (storedCart) {
  //     setCart(JSON.parse(storedCart));
  //   }
  // }, []);
  // const calculateTotalAmount = (cartArray) => {
  //   const total = cartArray.reduce(
  //     (sum, item) => sum + item.price * item.quantity,
  //     0
  //   );
  //   setTotalAmount(total);
  // };
  // const handleCheckout = () => {
  //   setCart([]);
  //   localStorage.removeItem("cart"); // Xóa giỏ hàng khỏi Local Storage
  //   Navigate("/Checkout");
  //   alert("Tiến hành thanh toán...");
  // };
  // useEffect(() => {
  //   // Cập nhật Local Storage mỗi khi giỏ hàng thay đổi
  //   calculateTotalAmount(cartArray);
  //   localStorage.setItem("cart", JSON.stringify(cartArray));
  // }, [cartArray]);
  const addToCart = (product) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === product.id);
    if (itemIndex === -1) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      const updatedCart = cart.map((cartItem, index) =>
        index === itemIndex
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
