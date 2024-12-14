import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import "./productlist.css";
import { formatCurrency } from "../ExchangeMoney/formatCurrency";
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
    // Kiểm tra và cập nhật dữ liệu sản phẩm
    if (editProduct.name && editProduct.price && editProduct.avatar) {
      setDataSanPham((prev) =>
        prev.map((item) =>
          item.id === editProduct.id ? { ...editProduct } : item
        )
      );
      setIsModalOpen(false); // Đóng modal
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
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
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

      {/* Nút thêm sản phẩm */}
      <button
        onClick={() => openModal("add")}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Thêm sản phẩm
      </button>

      {/* Bảng danh sách sản phẩm */}
      <table className="table-auto w-full border-collapse border border-gray-300 table_Data">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">STT</th>
            <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
            <th className="border border-gray-300 px-4 py-2">Tên sản phẩm</th>
            <th className="border border-gray-300 px-4 py-2">Mục Sản Phẩm</th>
            <th className="border border-gray-300 px-4 py-2">Số lượng</th>
            <th className="border border-gray-300 px-4 py-2">Giá</th>
            <th className="border border-gray-300 px-4 py-2">Action </th>
          </tr>
        </thead>
        <tbody>
          {dataSanPham.map((product, index) => (
            <tr key={product.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={product.avatar}
                  alt={product.name}
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.productType}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.Amount}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">
                {formatCurrency(product.price)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => {
                    setEditProduct(product); // Lưu sản phẩm đang được sửa vào state
                    openModal("edit");
                  }}
                  className="buttonEdit"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="deleteButton"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-xl font-bold mb-4">
              {modalType === "edit" ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
            </h2>

            {/* Hiển thị ảnh sản phẩm */}
            <div className="text-center mb-4">
              <img
                src={editProduct?.avatar || "https://via.placeholder.com/150"}
                alt={editProduct?.name || "Placeholder"}
                className="w-32 h-32 object-cover rounded-full mx-auto border"
              />
            </div>

            {/* Form chỉnh sửa */}
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Tên sản phẩm</label>
                <input
                  type="text"
                  value={editProduct?.name || ""}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Giá sản phẩm</label>
                <input
                  type="number"
                  value={editProduct?.price || ""}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, price: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">
                  URL ảnh sản phẩm
                </label>
                <input
                  type="text"
                  value={editProduct?.avatar || ""}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, avatar: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Nhập URL ảnh sản phẩm"
                />
              </div>
            </div>

            {/* Nút hành động */}
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdateProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
