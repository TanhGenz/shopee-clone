import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mainPage.css";
import { formatCurrency } from "../ExchangeMoney/formatCurrency";
import Footer from "../footer/Footer";
import Slider from "../slider/Slider";
import images from "../slider/images";

export default function MainPage() {
  const [dataSanPham, setDataSanPham] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Sản phẩm sau khi lọc
  const [selectedCategory, setSelectedCategory] = useState(""); // Loại sản phẩm được chọn
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const navigate = useNavigate();

  const productTypes = [
    { name: "Iphone", type: "Device", icon: "📱" },
    { name: "Áo khoác", type: "laptop", icon: "🧥" },
    { name: "Tai nghe", type: "headphone", icon: "🎧" },
    { name: "Đồng hồ", type: "watch", icon: "⌚" },
  ];

  useEffect(() => {
    // Fetch danh sách sản phẩm từ API
    fetch("https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products")
      .then((res) => res.json())
      .then((data) => {
        setDataSanPham(data);
        setFilteredProducts(data); // Hiển thị tất cả sản phẩm lúc đầu
      });
  }, []);

  const handleCategorySelect = (type) => {
    setSelectedCategory(type);
    if (type) {
      const filtered = dataSanPham.filter(
        (product) => product.productType === type
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(dataSanPham);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Lọc sản phẩm theo từ khóa tìm kiếm
    const filtered = dataSanPham.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="product-list">
      <Slider>
        {images.map((image, index) => (
          <img key={index} src={image.imgURL} alt={image.imgAlt} />
        ))}
      </Slider>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="product-types">
        {productTypes.map((category, index) => (
          <button
            key={index}
            className={`category-item ${
              selectedCategory === category.type ? "active" : ""
            }`}
            onClick={() => handleCategorySelect(category.type)}
          >
            <span className="icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
        <button
          className={`category-item ${selectedCategory === "" ? "active" : ""}`}
          onClick={() => handleCategorySelect("")}
        >
          Tất cả
        </button>
      </div>
      {/* Danh sách sản phẩm */}
      <div>
        <div className="data_List grid grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="dataSanPham border p-4 rounded shadow"
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
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
