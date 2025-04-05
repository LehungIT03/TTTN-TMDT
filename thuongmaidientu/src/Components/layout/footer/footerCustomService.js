import React from "react";
import { Link } from "react-router-dom";
import "../../Css/footer.css";
export default function FooterCustomService() {
  return (
    <div className="footer__section">
      <h3 className="footer__title">Chăm sóc khách hàng</h3>
      <ul className="footer__list">
        <li className="footer__item">
          <Link to="/faq" className="footer__link">
            Câu hỏi thường gặp
          </Link>
        </li>
        <li className="footer__item">
          <Link to="/shipping" className="footer__link">
            Chính sách vận chuyển
          </Link>
        </li>
        <li className="footer__item">
          <Link to="/returns" className="footer__link">
            Chính sách đổi trả
          </Link>
        </li>
        <li className="footer__item">
          <Link to="/privacy" className="footer__link">
            Chính sách bảo mật
          </Link>
        </li>
      </ul>
    </div>
  );
}
