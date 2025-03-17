import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaShoppingCart, FaFilter, FaSort, FaSpinner } from "react-icons/fa";
import "../Css/categoriesFilter.css";

export default function CategoriesFilter({
  categories = [],
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
  closeFilter,
  products = [],
}) {
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000000 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize price range from selectedPrice if it exists
  useEffect(() => {
    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        setPriceRange({ min, max });
      }
    }
  }, [selectedPrice]);

  // Validate and sanitize price range
  const validatePriceRange = (min, max) => {
    const minPrice = Math.max(0, Number(min) || 0);
    const maxPrice = Math.max(minPrice, Number(max) || 100000000);
    return { min: minPrice, max: maxPrice };
  };

  // Handle price range change
  const handlePriceRangeChange = (type, value) => {
    const newValue = Number(value) || 0;
    setPriceRange((prev) => {
      const newRange = {
        ...prev,
        [type]: newValue,
      };
      const validatedRange = validatePriceRange(newRange.min, newRange.max);
      // Update parent component's selectedPrice
      setSelectedPrice(`${validatedRange.min}-${validatedRange.max}`);
      return validatedRange;
    });
  };

  useEffect(() => {
    const filterProducts = () => {
      try {
        setIsLoading(true);
        setError(null);

        // Ensure products is an array before spreading
        const productsArray = Array.isArray(products) ? products : [];
        let filtered = [...productsArray];

        // Filter by category
        if (selectedCategory) {
          filtered = filtered.filter(
            (product) =>
              product?.category?.toLowerCase().replace(/\s+/g, "-") ===
              selectedCategory
          );
        }

        // Filter by price range
        filtered = filtered.filter(
          (product) =>
            product?.price >= priceRange.min && product?.price <= priceRange.max
        );

        // Sort products
        switch (sortBy) {
          case "price-asc":
            filtered.sort((a, b) => (a?.price || 0) - (b?.price || 0));
            break;
          case "price-desc":
            filtered.sort((a, b) => (b?.price || 0) - (a?.price || 0));
            break;
          case "name-asc":
            filtered.sort((a, b) =>
              (a?.name || "").localeCompare(b?.name || "")
            );
            break;
          case "name-desc":
            filtered.sort((a, b) =>
              (b?.name || "").localeCompare(a?.name || "")
            );
            break;
          default:
            break;
        }

        setFilteredProducts(filtered);
      } catch (err) {
        setError("Có lỗi xảy ra khi lọc sản phẩm. Vui lòng thử lại.");
        console.error("Error filtering products:", err);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    filterProducts();
  }, [selectedCategory, sortBy, priceRange, products]);

  const handleAddToCart = (product) => {
    try {
      if (!product) {
        throw new Error("Invalid product");
      }
      addToCart(product);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategorySelect = (categorySlug) => {
    setSelectedCategory(categorySlug);
    // Save to localStorage
    localStorage.setItem("selectedCategory", categorySlug);
  };

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Thử lại</button>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>
          {selectedCategory
            ? categories.find((cat) => cat?.slug === selectedCategory)?.name ||
              "Danh mục"
            : "Tất cả sản phẩm"}
        </h1>
        <div className="category-controls">
          <button className="filter-toggle" onClick={closeFilter}>
            <FaFilter /> Đóng
          </button>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option key="default" value="default">
              Sắp xếp mặc định
            </option>
            <option key="price-asc" value="price-asc">
              Giá tăng dần
            </option>
            <option key="price-desc" value="price-desc">
              Giá giảm dần
            </option>
            <option key="name-asc" value="name-asc">
              Tên A-Z
            </option>
            <option key="name-desc" value="name-desc">
              Tên Z-A
            </option>
          </select>
        </div>
      </div>

      <div className="category-content">
        {/* Filters Sidebar */}
        <div className="filters-sidebar">
          <div className="filter-section">
            <h3>Danh mục</h3>
            <div className="category-list">
              <button
                className={`category-item ${!selectedCategory ? "active" : ""}`}
                onClick={() => handleCategorySelect(null)}
              >
                Tất cả
              </button>
              {Array.isArray(categories) &&
                categories.map((cat) => (
                  <button
                    key={cat?.id}
                    className={`category-item ${
                      selectedCategory === cat?.slug ? "active" : ""
                    }`}
                    onClick={() => handleCategorySelect(cat?.slug)}
                  >
                    {cat?.name}
                  </button>
                ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Khoảng giá</h3>
            <div className="price-range">
              <input
                type="number"
                placeholder="Giá tối thiểu"
                value={priceRange.min}
                onChange={(e) => handlePriceRangeChange("min", e.target.value)}
                min="0"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Giá tối đa"
                value={priceRange.max}
                onChange={(e) => handlePriceRangeChange("max", e.target.value)}
                min={priceRange.min}
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {isLoading ? (
            <div className="loading-spinner">
              <FaSpinner className="spinner" />
              <p>Đang tải sản phẩm...</p>
            </div>
          ) : Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product?.id} className="product-card">
                <div className="product__image">
                  <Link to={`/product/${product?.id}`} onClick={scrollToTop}>
                    <img
                      src={product?.image}
                      alt={product?.name || "Product image"}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x300?text=No+Image";
                      }}
                    />
                  </Link>
                </div>
                <div className="product__info">
                  <Link to={`/product/${product?.id}`} onClick={scrollToTop}>
                    <h3 className="product__name">{product?.name}</h3>
                    <p className="product__price">
                      {product?.price?.toLocaleString()} VND
                    </p>
                  </Link>
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart /> Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>Không tìm thấy sản phẩm nào phù hợp với tiêu chí của bạn.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
