import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { categories, banners, subBanner } from "../../data/categoriesData";
import { useCart } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import "../Css/homePage.css";

// Fallback Image Component
const FallbackImage = ({ alt, className }) => (
  <div className={`fallback-image ${className}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
    <span>{alt}</span>
  </div>
);

// Product Card Component
const ProductCard = ({ product, onAddToCart }) => {
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="product-card">
      <div className="product__image">
        <Link to={`/product/${product.id}`}>
          {imageError ? (
            <FallbackImage alt={product.name} className="product-fallback" />
          ) : (
            <img
              src={product.image}
              alt={product.name}
              onError={() => setImageError(true)}
            />
          )}
        </Link>
      </div>
      <div className="product__info">
        <Link to={`/product/${product.id}`}>
          <h3 className="product__name">{product.name}</h3>
          <p className="product__price">{product.price.toLocaleString()} VND</p>
        </Link>
        <button
          className={`add-to-cart ${isAdding ? "adding" : ""}`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          <FaShoppingCart className={isAdding ? "rotate" : ""} />
          {isAdding ? "Đã thêm" : "Thêm vào giỏ"}
        </button>
      </div>
    </div>
  );
};

// Banner Slider Component
const BannerSlider = ({ banners, currentIndex, onDotClick }) => {
  const [imageErrors, setImageErrors] = useState({});

  return (
    <div className="banner-slider">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`banner-slide ${index === currentIndex ? "active" : ""}`}
        >
          {imageErrors[banner.id] ? (
            <FallbackImage alt={banner.name} className="banner-fallback" />
          ) : (
            <img
              src={banner.img}
              alt={banner.name}
              onError={() =>
                setImageErrors((prev) => ({ ...prev, [banner.id]: true }))
              }
            />
          )}
        </div>
      ))}
      <div className="banner-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => onDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Product Section Component
const ProductSection = ({ title, products, onAddToCart }) => (
  <div className={`${title.toLowerCase().replace(/\s+/g, "-")}-products`}>
    <h2>{title}</h2>
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  </div>
);

export default function HomePage() {
  const { addToCart } = useCart();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState(null);

  // Get featured products (products with rating >= 4.5)
  const featuredProducts = products.filter((product) => product.rating >= 4.5);

  // Get new products (products added in the last 30 days)
  const newProducts = products
    .filter((product) => {
      const productDate = new Date(product.dateAdded);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return productDate >= thirtyDaysAgo;
    })
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 8);

  // Get random products (excluding featured and new products)
  const randomProducts = [...products]
    .filter(
      (product) =>
        !featuredProducts.includes(product) && !newProducts.includes(product)
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotificationProduct(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="home-page">
      <BannerSlider
        banners={banners}
        currentIndex={currentBannerIndex}
        onDotClick={setCurrentBannerIndex}
      />

      <div className="categories-section">
        <h2>Danh mục sản phẩm</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="category-card"
            >
              <img src={category.img} alt={category.name} />
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      <ProductSection
        title="Sản phẩm nổi bật"
        products={featuredProducts}
        onAddToCart={handleAddToCart}
      />

      <div className="sub-banners">
        {subBanner.map((banner) => (
          <div key={banner.id} className="sub-banner">
            <img src={banner.img} alt={banner.name} />
          </div>
        ))}
      </div>

      <div className="products-sections">
        <ProductSection
          title="Sản phẩm mới"
          products={newProducts}
          onAddToCart={handleAddToCart}
        />

        <ProductSection
          title="Sản phẩm ngẫu nhiên"
          products={randomProducts}
          onAddToCart={handleAddToCart}
        />
      </div>

      {showNotification && notificationProduct && (
        <div className="notification">
          <p>Đã thêm {notificationProduct.name} vào giỏ hàng</p>
        </div>
      )}
    </div>
  );
}
