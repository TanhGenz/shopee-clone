import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./mainPage.css";
import { formatCurrency } from "../ExchangeMoney/formatCurrency";
import Footer from "../footer/Footer";
import Slider from "../slider/Slider";
import images from "../slider/images";
export default function MainPage() {
  const [dataSanPham, setDataSanPham] = useState([]);
  const navigate = useNavigate(); // Hook điều hướng
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' hoặc 'desc'

  const handleSortPrice = () => {
    const sortedProducts = [...dataSanPham].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price; // Giá tăng dần
      } else {
        return b.price - a.price; // Giá giảm dần
      }
    });

    setDataSanPham(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Đổi trạng thái
  };
  useEffect(() => {
    fetch("https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products")
      .then((res) => res.json())
      .then((data) => {
        setDataSanPham(data);
      });
  }, []);
  return (
    <div className="product-list">
      <Slider>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </Slider>

      <button onClick={handleSortPrice} className="button_Short">
        Sắp xếp giá: {sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
      </button>
      <div>
        <div className="data_List grid grid-cols-3 gap-4">
          {dataSanPham.map((product) => (
            <div
              key={product.id}
              className=" dataSanPham border p-4 rounded shadow"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.avatar}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-bold">{product.name}</h2>

              <p className="text-green-600 font-semibold">
                {formatCurrency(product.price)}
              </p>
              <button>Add to cart</button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
