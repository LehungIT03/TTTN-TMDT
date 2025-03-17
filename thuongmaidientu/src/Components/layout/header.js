import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import "../Css/header.css";
import {
  CgChevronDown,
  CgUser,
  CgSearch,
  CgShoppingCart,
} from "react-icons/cg";
import logo from "../../Assets/img/shopping.png";
export default function Header() {
  //#endregion
  //#region Dropdown
  /*===========================thời gian hiển thị của dropdown=========================*/
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [hoveredMenu, setHoverdMenu] = useState(false);
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
  //#endregion
  //#region Tìm kiếm
  const searchInputRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target)
      ) {
        searchInputRef.current.classList.remove("open");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleSearch = () => {
    searchInputRef.current.classList.toggle("open");
    if (searchInputRef.current.classList.contains("open")) {
      searchInputRef.current.focus();
    }
  };

  //#endregion
  // scroll to top
  const ScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //#region luu trang thai khi click vao category
  const handleCategoryClick = (slug) => {
    localStorage.setItem("selectedCategory", slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  //#endregion
  return (
    <div>
      <header className="header">
        <nav className="nav container">
          <Link to="/" className="nav__logo" onClick={ScrollToTop}>
            <img src={logo} alt="" className="nav__logo-img" />
          </Link>
          <div className="nav__left container">
            <ul className="nav__list">
              <li
                className="dropdown"
                onMouseEnter={() => setHoverdMenu("home")}
                onMouseLeave={() => setHoverdMenu(false)}
              >
                <a className="">
                  Trang chủ <CgChevronDown />
                </a>

                {isHomeDropdownOpen && (
                  <div className="dropdown__menu">
                    <h3>
                      <strong>Trang chủ</strong>
                    </h3>
                    <ul className="">
                      <li className="">
                        <a className="" href="#">
                          Bán chạy
                        </a>
                      </li>
                      <li className="">
                        <Link
                          to="/category/thoi-trang"
                          onClick={handleCategoryClick}
                        >
                          thời trang
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          to="/category/cong-nghe"
                          onClick={handleCategoryClick}
                        >
                          Thiết bị điện tử
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          to="/category/doi-song"
                          onClick={handleCategoryClick}
                        >
                          nhà cửa & đời sống
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li
                className="dropdown"
                onMouseEnter={() => setHoverdMenu("shop")}
                onMouseLeave={() => setHoverdMenu(false)}
              >
                <a className="">
                  Cửa hàng <CgChevronDown />
                </a>

                {isShopDropdownOpen && (
                  <div className="dropdown__menu shop-dropdown">
                    <div className="shop-dropdown__column">
                      <h3>
                        <strong>Loại sản phẩm</strong>
                      </h3>
                      <ul className="">
                        <li className="">
                          <Link
                            to="/category/all"
                            onClick={handleCategoryClick}
                          >
                            Tất cả sản phẩm
                          </Link>
                        </li>
                        <li className="">
                          <Link
                            to="/category/phu-kien"
                            onClick={handleCategoryClick}
                          >
                            Phụ kiện
                          </Link>
                        </li>
                        <li className="">
                          <Link
                            to="/category/thoi-trang"
                            onClick={handleCategoryClick}
                          >
                            Quần áo <span className="hot-tag">HOT</span>
                          </Link>
                        </li>
                        <li className="">
                          <Link
                            to="/category/giay-dep"
                            onClick={handleCategoryClick}
                          >
                            Giày dép
                          </Link>
                        </li>
                        <li className="">
                          <Link
                            to="/category/do-choi"
                            onClick={handleCategoryClick}
                          >
                            Đồ chơi <span className="hot-tag">HOT</span>
                          </Link>
                        </li>
                        <li className="">
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
                        <strong>Tìm kiếm</strong>
                      </h3>
                      <ul className="">
                        <li className="">
                          <Link to="category/all" onClick={handleCategoryClick}>
                            sản phẩm theo loại
                            <span className="hot-tag">HOT</span>
                          </Link>
                        </li>
                        <li className="">
                          <a className="" href="#">
                            sản phẩm theo đơn giá
                          </a>
                        </li>
                      </ul>
                      <h3>
                        <strong>Trang điện tử</strong>
                      </h3>
                      <ul className="">
                        <li className="">
                          <a className="" href="#">
                            giỏ hàng
                          </a>
                        </li>
                        <li className="">
                          <a className="" href="#">
                            Tài khoản
                          </a>
                        </li>{" "}
                        <li className="">
                          <a className="" href="#">
                            lịch sử mua hàng
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>

              <li
                className="dropdown"
                onMouseEnter={() => setHoverdMenu("about")}
                onMouseLeave={() => setHoverdMenu(false)}
              >
                <a className="">
                  Thông tin <CgChevronDown />
                </a>

                {isAboutDropdownOpen && (
                  <div className="dropdown__menu">
                    <h3>
                      <strong>Thông tin cửa hàng</strong>
                    </h3>
                    <ul className="">
                      <li className="">
                        <a className="" href="#">
                          Về chúng tôi
                        </a>
                      </li>
                      <li className="">
                        <a className="" href="#">
                          Liên hệ
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item search-container">
                <CgSearch className="nav__item-search" onClick={toggleSearch} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="search-input"
                />
              </li>

              <li className="nav__item">
                <a className="" href="">
                  <CgUser />
                </a>
              </li>
              <li className="nav__item">
                <a className="" href="">
                  <CgShoppingCart />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}
