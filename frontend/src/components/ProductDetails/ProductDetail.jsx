import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../FunctionRenderApi/CartContext";
import "./ProductDetails.css";
import { formatCurrency } from "../ExchangeMoney/formatCurrency";
import { LoveContext } from "../../FunctionRenderApi/LoveContext";
import { AuthContext } from "../../FunctionRenderApi/AuthContext";
export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [love, setLove] = useState(null);

  const { addToCart } = useContext(CartContext);
  const { addToLove } = useContext(LoveContext);

  useEffect(() => {
    fetch(
      `https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products/${id}`
    )
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .then((data) => setLove(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert("Đã thêm vào giỏ hàng!");
  };
  const handleLove = () => {
    addToLove(product);
    alert("Đã thêm vào yêu thích!");
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
          <button onClick={handleLove} className="buy_Immediately">
            ❤️
          </button>
        </div>
      </div>
      <div className="img_Details">
        <img src={product.avatar} alt="" />
      </div>
    </div>
  );
}
