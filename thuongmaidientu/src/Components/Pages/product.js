import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/products";
import { FaShoppingCart, FaHeart, FaShare, FaCheck } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import "../Css/product.css";

export default function ProductProduct() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  // Find the product based on ID
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log("Adding to cart:", { product, quantity });
  };

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-gallery">
          <div className="main-image">
            <img
              src={product.image || "https://via.placeholder.com/400"}
              alt={product.name}
            />
          </div>
          <div className="thumbnail-list">
            {/* Add more thumbnails if product has multiple images */}
            <div
              className={`thumbnail ${selectedImage === 0 ? "active" : ""}`}
              onClick={() => setSelectedImage(0)}
            >
              <img
                src={product.image || "https://via.placeholder.com/100"}
                alt={product.name}
              />
            </div>
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price">
            <span className="price">{product.price.toLocaleString()} VND</span>
            <span className="original-price">
              {(product.price * 1.2).toLocaleString()} VND
            </span>
            <span className="discount">-20%</span>
          </div>

          <div className="product-description">
            <h2>Mô tả sản phẩm</h2>
            <p>{product.description}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <label>Số lượng:</label>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="quantity-btn"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="quantity-input"
                />
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                <FaShoppingCart /> Thêm vào giỏ hàng
              </button>
              <button className="wishlist-btn">
                <FaHeart /> Yêu thích
              </button>
              <button className="share-btn">
                <FaShare /> Chia sẻ
              </button>
            </div>
          </div>

          <div className="product-details">
            <h2>Thông tin chi tiết</h2>
            <div className="details-grid">
              <div className="detail-item">
                <span className="label">Thương hiệu:</span>
                <span className="value">Brand Name</span>
              </div>
              <div className="detail-item">
                <span className="label">Mã sản phẩm:</span>
                <span className="value">{product.id}</span>
              </div>
              <div className="detail-item">
                <span className="label">Danh mục:</span>
                <span className="value">{product.slug}</span>
              </div>
              <div className="detail-item">
                <span className="label">Tình trạng:</span>
                <span className="value">Còn hàng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
