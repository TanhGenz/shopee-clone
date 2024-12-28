import React, { useContext, useState } from "react";
import { CartContext } from "../../FunctionRenderApi/CartContext";
import { formatCurrency } from "../ExchangeMoney/formatCurrency";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    // Xử lý thanh toán
    alert("Thanh toán thành công!");
    clearCart();
  };

  // if (cartItem.length === 0) return <p>Giỏ hàng trống</p>;

  return (
    <div className="checkout-page">
      <h1>Thông tin thanh toán</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <img src={item.avatar} alt={item.name} style={{ width: "50px" }} />
            <span>{item.name}</span>
            <span>Số lượng: {item.quantity}</span>
            <span>Giá: {formatCurrency(item.price)}</span>
          </li>
        ))}
      </ul>
      <p>
        Tổng cộng:{" "}
        {formatCurrency(
          cart.reduce((total, item) => total + item.price * item.quantity, 0)
        )}
      </p>
      <button onClick={handleCheckout}>Thanh toán</button>
    </div>
  );
}
