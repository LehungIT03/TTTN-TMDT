import React from "react";
import { Link } from "react-router-dom";
import { CgChevronDown } from "react-icons/cg";

export default function DropdownMenu({
  title,
  setHoveredMenu,
  hoveredMenu,
  menuKey,
}) {
  const menuItems = {
    home: [
      { path: "/category/ban-chay", label: "Bán chạy" },
      { path: "/category/thoi-trang", label: "Thời trang" },
      { path: "/category/cong-nghe", label: "Thiết bị điện tử" },
      { path: "/category/doi-song", label: "Nhà cửa & đời sống" },
    ],
    shop: [
      { path: "/category/all", label: "Tất cả sản phẩm" },
      { path: "/category/phu-kien", label: "Phụ kiện" },
      { path: "/category/thoi-trang", label: "Quần áo" },
      { path: "/category/giay-dep", label: "Giày dép" },
      { path: "/category/do-choi", label: "Đồ chơi" },
      { path: "/category/nha-sach", label: "Nhà sách" },
    ],
    about: [
      { path: "/about", label: "Về chúng tôi" },
      { path: "/contact", label: "Liên hệ" },
    ],
  };
  return (
    <li
      className="dropdown"
      onMouseEnter={() => setHoveredMenu(menuKey)}
      onMouseLeave={() => setHoveredMenu(null)}
    >
      <Link to="/" className="nav__link">
        {title} <CgChevronDown />
      </Link>
      {hoveredMenu === menuKey && (
        <div className="dropdown__menu">
          <h3>
            <strong>{title}</strong>
          </h3>
          <ul>
            {menuItems[menuKey].map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
