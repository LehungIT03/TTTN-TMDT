import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { FaShoppingCart, FaStar, FaCheck } from "react-icons/fa";
import "../Css/productDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-detail">
      {showNotification && (
        <div className="notification">
          <FaCheck className="notification-icon" />
          <span>Đã thêm {product.name} vào giỏ hàng!</span>
        </div>
      )}

      <div className="product-container">
        {/* Product Image */}
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>

          <div className="product-price">
            {product.price.toLocaleString()} VND
          </div>

          <div className="product-rating">
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <span>(4.5/5)</span>
          </div>

          <div className="product-description">
            <h2>Mô tả sản phẩm</h2>
            <p>
              {product.description ||
                "Sản phẩm chất lượng cao, đảm bảo uy tín. Chúng tôi cam kết mang đến cho khách hàng những sản phẩm tốt nhất với giá cả hợp lý."}
            </p>
          </div>

          <div className="product-category">
            <span>Danh mục:</span>
            <span className="category-name">{product.category}</span>
          </div>

          <div className="product-actions">
            <div className="quantity-controls">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
                onClick={() => setQuantity(quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <FaShoppingCart /> Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <h2>Sản phẩm liên quan</h2>
        <div className="related-products-grid">
          {products
            .filter(
              (p) => p.category === product.category && p.id !== product.id
            )
            .slice(0, 4)
            .map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="related-product-card"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="related-product-image"
                />
                <div className="related-product-info">
                  <h3>{relatedProduct.name}</h3>
                  <p>{relatedProduct.price.toLocaleString()} VND</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
