import React, { useState, useEffect } from "react";
import { products as initialProducts } from "../../data/products";
import Sidebar from "../../Components/layout/sidebar";
import "../Assets/productAdmin.css";
const ProductManager = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null); // Lưu sản phẩm đang chỉnh sửa

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Tạo URL tạm cho ảnh mới
      setEditingProduct({ ...editingProduct, image: imageUrl });
    }
  };

  // Xử lý khi nhấn "Chỉnh sửa"
  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  // Xử lý khi lưu chỉnh sửa
  const handleSave = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setEditingProduct(null); // Đóng form chỉnh sửa
  };
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="recent-section">
        <h3>Quản lý sản phẩm </h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Hình ảnh</th>
              <th>Loại</th>
              <th>Số lượng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()} VNĐ</td>
                <td>
                  <img src={product.image} alt={product.name} width="50" />
                </td>
                <td>{product.category}</td>
                <td>{product.inventory}</td>
                <td>
                  <button onClick={() => handleEditClick(product)}>
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Nút chuyển trang */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trang trước
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Trang sau
          </button>
        </div>
      </div>

      {/* Form chỉnh sửa sản phẩm */}
      {editingProduct && (
        <>
          <div
            className="overlay"
            onClick={() => setEditingProduct(null)}
          ></div>
          <div className="edit-form">
            <h3>Chỉnh sửa sản phẩm</h3>
            <label>Tên sản phẩm:</label>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
            />

            <label>Giá:</label>
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: Number(e.target.value),
                })
              }
            />

            <label>Loại:</label>
            <input
              type="text"
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
            />

            <label>Số lượng:</label>
            <input
              type="number"
              value={editingProduct.inventory}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  inventory: Number(e.target.value),
                })
              }
            />

            <label>Hình ảnh:</label>
            <img src={editingProduct.image} alt="Preview" />
            <input
              type="file"
              accept="image/*"
              className="file-input"
              onChange={handleImageChange}
            />

            <button onClick={handleSave}>Lưu</button>
            <button onClick={() => setEditingProduct(null)}>Hủy</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductManager;
