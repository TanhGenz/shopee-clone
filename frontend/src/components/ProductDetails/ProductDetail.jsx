import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../FunctionRenderApi/CartContext";
import "./ProductDetails.css";
import { formatCurrency } from "../ExchangeMoney/formatCurrency";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(
      `https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products/${id}`
    )
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="product-detail">
      {/* Nội dung chi tiết sản phẩm */}
      <div className="details_Product">
        <h1 className="text-2xl font-bold">Tên sp: {product.name}</h1>
        <span>
          Giá sản phẩm :
          <p className="text-green-600 font-semibold text-xl mb-2 product_Price">
            {formatCurrency(product.price)}
          </p>
        </span>
        <p className="text-gray-700">Mô Tả : {product.description}</p>

        <div className="payingButton">
          <button className="add_ProductButton" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </button>
          <button className="buy_Immediately">Mua ngay</button>
        </div>
      </div>
    </div>
  );
}
