import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { formatCurrency } from "../ExchangeMoney/formatCurrency";
export default function ProductDetail() {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch chi tiết sản phẩm từ API
    fetch(
      `https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products/${id}`
    )
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <div className=" p-4">
        <h1>Chi tiết sản phẩm</h1>
        <img
          src={product.avatar}
          alt={product.name}
          className="w-full h-64 object-cover mb-4 rounded"
        />
        <div className="sharing_Button">
          <p>Chia sẻ</p>
          <i class="fab fa-facebook-messenger"></i>
          <i class="fab fa-facebook-f"></i>
          <i class="fab fa-pinterest"></i>
          <i class="fab fa-linkedin"></i>
        </div>
      </div>
      <div className="details_Product">
        <h1 className="text-2xl font-bold">Tên sp: {product.name}</h1>
        <span>
          Giá sản phẩm :
          <p className="text-green-600 font-semibold text-xl mb-2 product_Price">
            {formatCurrency(product.price)}
          </p>
        </span>
        <p className="text-gray-700">Mô Tả :{product.description}</p>

        <div className="numberAmount">
          <p>Số lượng</p>
          <input type="number" name="" id="increaseNumber" />
        </div>
        <div className="payingButton">
          <button className="add_ProductButton">Thêm vào giỏ hàng</button>

          <button className="buy_Immediately">Mua ngay</button>
        </div>
      </div>
    </div>
  );
}
