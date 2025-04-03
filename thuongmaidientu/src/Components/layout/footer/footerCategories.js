import React from "react";
import { Link } from "react-router-dom";
import "../../Css/footer.css";
export default function FooterCategories() {
  return (
    <div className="footer__section">
      <h3 className="footer__title">Danh mục</h3>
      <ul className="footer__list">
        <li className="footer__item">
          <Link to="/category/thoi-trang" className="footer__link">
            Thời trang
          </Link>
        </li>
        <li className="footer__item">
          <Link to="/category/cong-nghe" className="footer__link">
            Công nghệ
          </Link>
        </li>
        <li className="footer__item">
          <Link to="/category/doi-song" className="footer__link">
            Đời sống
          </Link>
        </li>
        <li className="footer__item">
          <Link to="/category/do-choi" className="footer__link">
            Đồ chơi
          </Link>
        </li>
      </ul>
    </div>
  );
}
