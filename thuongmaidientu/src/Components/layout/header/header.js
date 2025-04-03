// components/layout/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgUser, CgShoppingCart } from "react-icons/cg";
import "../../Css/header.css";
import logo from "../../../Assets/img/shopping.png";
import SearchBar from "../../common/searchBar";
import DropdownMenu from "../../UI/dropdownMenu";

export default function Header() {
  const [hoveredMenu, setHoveredMenu] = useState(null);

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__left">
          <Link to="/" className="nav__logo">
            <img src={logo} alt="Shop Logo" className="nav__logo-img" />
          </Link>
          <ul className="nav__list">
            <DropdownMenu
              title="Trang chủ"
              setHoveredMenu={setHoveredMenu}
              hoveredMenu={hoveredMenu}
              menuKey="home"
            />
            <DropdownMenu
              title="Cửa hàng"
              setHoveredMenu={setHoveredMenu}
              hoveredMenu={hoveredMenu}
              menuKey="shop"
            />
            <DropdownMenu
              title="Thông tin"
              setHoveredMenu={setHoveredMenu}
              hoveredMenu={hoveredMenu}
              menuKey="about"
            />
          </ul>
        </div>
        <div className="nav__icons">
          <SearchBar />
          <Link to="/login">
            <CgUser className="nav__item-user" />
          </Link>
          <Link to="/cart">
            <CgShoppingCart className="nav__item-cart" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
