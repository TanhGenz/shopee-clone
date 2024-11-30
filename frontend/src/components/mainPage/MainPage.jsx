import React, { useEffect, useState } from "react";
import "./mainPage.css";
export default function MainPage() {
  const [dataSanPham, setDataSanPham] = useState([]);
  useEffect(() => {
    fetch("https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products")
      .then((res) => res.json())
      .then((data) => {
        setDataSanPham(data);
      });
  }, []);
  return (
    <div className="product-list">
      <h1>Trang chính của user</h1>
      <div className="data_List grid grid-cols-3 gap-4">
        {dataSanPham.map((product) => (
          <div
            key={product.id}
            className=" dataSanPham border p-4 rounded shadow"
          >
            <img
              src={product.avatar}
              alt={product.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-bold">{product.name}</h2>

            <p className="text-green-600 font-semibold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
