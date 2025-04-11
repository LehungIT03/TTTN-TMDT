import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSpinner } from "react-icons/fa";

export default function ProductGrid({ products, isLoading, error, addToCart }) {
  // xử lý lỗi sản phẩm
  if (error) return <div className="error-message">{error}</div>;

  if (isLoading)
    return (
      <div className="loading-spinner">
        <FaSpinner className="spinner" />
        <p>Đang tải sản phẩm...</p>
      </div>
    );

  if (!products.length)
    return <p className="no-products">Không có sản phẩm phù hợp.</p>;

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} />
          </Link>
          <h3>{product.name}</h3>
          <p>{product.price?.toLocaleString()} VND</p>
          <button onClick={() => addToCart(product)}>
            <FaShoppingCart /> Thêm vào giỏ
          </button>
        </div>
      ))}
    </div>
  );
}
