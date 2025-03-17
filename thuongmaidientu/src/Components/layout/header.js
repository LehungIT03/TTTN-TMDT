import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/header.css";
import {
  CgChevronDown,
  CgUser,
  CgSearch,
  CgShoppingCart,
} from "react-icons/cg";
import logo from "../../Assets/img/shopping.png";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";

export default function Header() {
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle dropdown menu visibility
  useEffect(() => {
    let timer;
    if (hoveredMenu === "home") {
      setIsHomeDropdownOpen(true);
      setIsShopDropdownOpen(false);
      setIsAboutDropdownOpen(false);
    } else if (hoveredMenu === "shop") {
      setIsShopDropdownOpen(true);
      setIsHomeDropdownOpen(false);
      setIsAboutDropdownOpen(false);
    } else if (hoveredMenu === "about") {
      setIsAboutDropdownOpen(true);
      setIsHomeDropdownOpen(false);
      setIsShopDropdownOpen(false);
    } else {
      timer = setTimeout(() => {
        setIsHomeDropdownOpen(false);
        setIsShopDropdownOpen(false);
        setIsAboutDropdownOpen(false);
      }, 200);
    }
    return () => clearTimeout(timer);
  }, [hoveredMenu]);

  // Handle search input
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(e.target)
      ) {
        searchInputRef.current.classList.remove("open");
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.slice(0, 5));
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const toggleSearch = () => {
    searchInputRef.current.classList.toggle("open");
    if (searchInputRef.current.classList.contains("open")) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
      setSearchQuery("");
    }
  };

  const handleResultClick = (product) => {
    navigate(`/product/${product.slug}`);
    setShowResults(false);
    setSearchQuery("");
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (slug) => {
    localStorage.setItem("selectedCategory", slug);
    scrollToTop();
  };

  return (
    <header className="header">
      <nav className="nav container">
        {/* Logo */}
        <Link to="/" className="nav__logo" onClick={scrollToTop}>
          <img src={logo} alt="Shop Logo" className="nav__logo-img" />
        </Link>

        {/* Main Navigation */}
        <div className="nav__left container">
          <ul className="nav__list">
            {/* Home Dropdown */}
            <li
              className="dropdown"
              onMouseEnter={() => setHoveredMenu("home")}
              onMouseLeave={() => setHoveredMenu(false)}
            >
              <Link to="/" className="nav__link">
                Trang chủ <CgChevronDown />
              </Link>

              {isHomeDropdownOpen && (
                <div className="dropdown__menu">
                  <h3>
                    <strong>Trang chủ</strong>
                  </h3>
                  <ul>
                    <li>
                      <Link to="/category/ban-chay">Bán chạy</Link>
                    </li>
                    <li>
                      <Link
                        to="/category/thoi-trang"
                        onClick={handleCategoryClick}
                      >
                        Thời trang
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/category/cong-nghe"
                        onClick={handleCategoryClick}
                      >
                        Thiết bị điện tử
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/category/doi-song"
                        onClick={handleCategoryClick}
                      >
                        Nhà cửa & đời sống
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* Shop Dropdown */}
            <li
              className="dropdown"
              onMouseEnter={() => setHoveredMenu("shop")}
              onMouseLeave={() => setHoveredMenu(false)}
            >
              <Link
                to="/category/all"
                onClick={() => {
                  setSelectedCategory(null);
                  localStorage.removeItem("selectedCategory");
                  localStorage.setItem("showFilter", "true");
                  scrollToTop();
                }}
                className="nav__link"
              >
                Cửa hàng <CgChevronDown />
              </Link>

              {isShopDropdownOpen && (
                <div className="dropdown__menu shop-dropdown">
                  <div className="shop-dropdown__column">
                    <h3>
                      <strong>Loại sản phẩm</strong>
                    </h3>
                    <ul>
                      <li>
                        <Link
                          to="/category/all"
                          onClick={() => {
                            setSelectedCategory(null);
                            localStorage.removeItem("selectedCategory");
                            localStorage.setItem("showFilter", "true");
                            scrollToTop();
                          }}
                        >
                          Tất cả sản phẩm
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/category/phu-kien"
                          onClick={handleCategoryClick}
                        >
                          Phụ kiện
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/category/thoi-trang"
                          onClick={handleCategoryClick}
                        >
                          Quần áo <span className="hot-tag">HOT</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/category/giay-dep"
                          onClick={handleCategoryClick}
                        >
                          Giày dép
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/category/do-choi"
                          onClick={handleCategoryClick}
                        >
                          Đồ chơi <span className="hot-tag">HOT</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/category/nha-sach"
                          onClick={handleCategoryClick}
                        >
                          Nhà sách <span className="hot-tag">HOT</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="shop-dropdown__column">
                    <h3>
                      <strong>Tài khoản</strong>
                    </h3>
                    <ul>
                      <li>
                        <Link to="/login">Đăng nhập</Link>
                      </li>
                      <li>
                        <Link to="/signup">Đăng ký</Link>
                      </li>
                      <li>
                        <Link to="/cart">Giỏ hàng</Link>
                      </li>
                      <li>
                        <Link to="/orders">Lịch sử mua hàng</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </li>

            {/* About Dropdown */}
            <li
              className="dropdown"
              onMouseEnter={() => setHoveredMenu("about")}
              onMouseLeave={() => setHoveredMenu(false)}
            >
              <Link to="/about" className="nav__link">
                Thông tin <CgChevronDown />
              </Link>

              {isAboutDropdownOpen && (
                <div className="dropdown__menu">
                  <h3>
                    <strong>Thông tin cửa hàng</strong>
                  </h3>
                  <ul>
                    <li>
                      <Link to="/about">Về chúng tôi</Link>
                    </li>
                    <li>
                      <Link to="/contact">Liên hệ</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>

        {/* Right Navigation */}
        <div className="nav__icons">
          {/* Search */}
          <div className="nav__item">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <CgSearch className="nav__item-search" onClick={toggleSearch} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {showResults && searchResults.length > 0 && (
                <div ref={searchResultsRef} className="search-results">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="search-result-item"
                      onClick={() => handleResultClick(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="search-result-image"
                      />
                      <div className="search-result-info">
                        <h4>{product.name}</h4>
                        <p>{product.price.toLocaleString()} VND</p>
                      </div>
                      <button
                        className="search-result-add-cart"
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <CgShoppingCart />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* User Account */}
          <div className="nav__item">
            <Link to="/login">
              <CgUser className="nav__item-user" />
            </Link>
          </div>

          {/* Shopping Cart */}
          <div className="nav__item">
            <Link to="/cart">
              <CgShoppingCart className="nav__item-cart" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
