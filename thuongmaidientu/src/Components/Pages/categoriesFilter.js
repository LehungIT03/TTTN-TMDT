import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle price range change
  const handlePriceRangeChange = (type, value) => {
    // Allow empty value for max, but keep min at 0
    if (value === "") {
      setPriceRange((prev) => ({
        ...prev,
        [type]: type === "min" ? 0 : "",
      }));
      return;
    }

    const newValue = Number(value);
    if (isNaN(newValue)) return;

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

  // Initialize price range from selectedPrice if it exists
  useEffect(() => {
    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        setPriceRange({ min, max });
      }
    } else {
      setPriceRange({ min: 0, max: "" });
    }
  }, [selectedPrice]);

  // Validate and sanitize price range
  const validatePriceRange = (min, max) => {
    const minPrice = Math.max(0, Number(min) || 0);
    const maxPrice = max ? Math.max(minPrice, Number(max)) : "";
    return { min: minPrice, max: maxPrice };
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

        // Filter by price range with better validation
        filtered = filtered.filter((product) => {
          const productPrice = Number(product?.price) || 0;
          const minPrice = priceRange.min === "" ? 0 : Number(priceRange.min);
          // Only filter by max price if it's specified
          if (priceRange.max === "") {
            return productPrice >= minPrice;
          }
          const maxPrice = Number(priceRange.max);
          return productPrice >= minPrice && productPrice <= maxPrice;
        });

        // Sort products
        switch (sortBy) {
          case "price-asc":
            filtered.sort(
              (a, b) => (Number(a?.price) || 0) - (Number(b?.price) || 0)
            );
            break;
          case "price-desc":
            filtered.sort(
              (a, b) => (Number(b?.price) || 0) - (Number(a?.price) || 0)
            );
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
    // If categorySlug is null or "all", set selectedCategory to null
    const categoryToSet = categorySlug === "all" ? null : categorySlug;
    setSelectedCategory(categoryToSet);
    // Save to localStorage
    localStorage.setItem("selectedCategory", categoryToSet);
    // Update URL path
    if (categorySlug) {
      navigate(`/category/${categorySlug}`);
    } else {
      navigate("/category/all");
    }
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add this function at the top level of the component
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    // Use a more reliable fallback image URL
    e.target.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
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
                      onError={handleImageError}
                      loading="lazy"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
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
