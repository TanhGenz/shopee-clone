import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import "./productlist.css";
export default function ProductList() {
  const [dataSanPham, setDataSanPham] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    avatar: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Điều khiển hiển thị modal
  const [modalType, setModalType] = useState(""); // "add" hoặc "edit"

  // Lấy danh sách sản phẩm
  const fetchProducts = () => {
    fetch("https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products")
      .then((res) => res.json())
      .then((data) => setDataSanPham(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Thêm sản phẩm
  const handleAddProduct = () => {
    fetch("https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    }).then(() => {
      fetchProducts();
      setIsModalOpen(false); // Đóng modal
    });
  };

  // Cập nhật sản phẩm
  const handleUpdateProduct = () => {
    if (editProduct) {
      fetch(
        `https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products/${editProduct.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editProduct),
        }
      ).then(() => {
        fetchProducts();
        setIsModalOpen(false); // Đóng modal
      });
    }
  };

  // Xóa sản phẩm
  const handleDeleteProduct = (id) => {
    fetch(
      `https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products/${id}`,
      {
        method: "DELETE",
      }
    ).then(() => fetchProducts());
  };

  // Mở modal
  const openModal = (type, product = null) => {
    setModalType(type);
    if (type === "edit" && product) {
      setEditProduct(product);
    } else {
      setNewProduct({ name: "", price: "", avatar: "" });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="product-list">
      <h1>Danh sách sản phẩm</h1>

      <button
        onClick={() => openModal("add")}
        className="bg-green-500 text-white p-2 mb-4"
      >
        Thêm sản phẩm
      </button>

      <div className="data_List grid grid-cols-3 gap-4">
        {dataSanPham.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={product.avatar}
              alt={product.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-green-600 font-semibold">${product.price}</p>
            <button
              onClick={() => openModal("edit", product)}
              className="bg-yellow-500 text-white p-2"
            >
              Sửa
            </button>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="bg-red-500 text-white p-2 ml-2"
            >
              Xóa
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {modalType === "add" ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
            </h2>
            <input
              type="text"
              placeholder="Tên sản phẩm"
              value={
                modalType === "add" ? newProduct.name : editProduct?.name || ""
              }
              onChange={(e) =>
                modalType === "add"
                  ? setNewProduct({ ...newProduct, name: e.target.value })
                  : setEditProduct({ ...editProduct, name: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Giá sản phẩm"
              value={
                modalType === "add"
                  ? newProduct.price
                  : editProduct?.price || ""
              }
              onChange={(e) =>
                modalType === "add"
                  ? setNewProduct({ ...newProduct, price: e.target.value })
                  : setEditProduct({ ...editProduct, price: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="URL hình ảnh"
              value={
                modalType === "add"
                  ? newProduct.avatar
                  : editProduct?.avatar || ""
              }
              onChange={(e) =>
                modalType === "add"
                  ? setNewProduct({ ...newProduct, avatar: e.target.value })
                  : setEditProduct({ ...editProduct, avatar: e.target.value })
              }
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white p-2 mr-2"
              >
                Đóng
              </button>
              <button
                onClick={
                  modalType === "add" ? handleAddProduct : handleUpdateProduct
                }
                className="bg-blue-500 text-white p-2"
              >
                {modalType === "add" ? "Thêm" : "Cập nhật"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
