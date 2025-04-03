import React from "react";
import { Link } from "react-router-dom";
import "../../Css/footer.css";
export default function FooterLinks() {
  return (
    <div className="footer__section">
      <h3 className="footer__title">Liên kết nhanh</h3>
      <ul className="footer__list">
        <li className="footer__item">
          <Link to="/" className="footer__link">
            Trang chủ
          </Link>
        </li>
        <li className="footer__item">
          <Link to="/category/all" className="footer__link">
            Sản phẩm
          </Link>
        </li>
        <li className="footer__item">
          <Link to="/about" className="footer__link">
            Về chúng tôi
          </Link>
        </li>
        <li className="footer__item">
          <Link to="/contact" className="footer__link">
            Liên hệ
          </Link>
        </li>
      </ul>
    </div>
  );
}
