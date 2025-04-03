import React from "react";
import { FaShoppingCart, FaHeart, FaShare } from "react-icons/fa";

export default function ProductActions({ quantity, setQuantity, addToCart }) {
  return (
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
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
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
        <button className="add-to-cart-btn" onClick={addToCart}>
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
  );
}
