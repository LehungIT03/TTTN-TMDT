import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../Css/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        {/* Company Info */}
        <div className="footer__section">
          <h3 className="footer__title">Về chúng tôi</h3>
          <p className="footer__description">
            Chúng tôi là nền tảng thương mại điện tử hàng đầu, cung cấp các sản
            phẩm chất lượng với giá cả hợp lý.
          </p>
          <div className="footer__social">
            <a href="#" className="footer__social-link">
              <FaFacebookF />
            </a>
            <a href="#" className="footer__social-link">
              <FaTwitter />
            </a>
            <a href="#" className="footer__social-link">
              <FaInstagram />
            </a>
            <a href="#" className="footer__social-link">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
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

        {/* Categories */}
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

        {/* Customer Service */}
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

        {/* Contact Info */}
        <div className="footer__section">
          <h3 className="footer__title">Liên hệ</h3>
          <ul className="footer__contact-list">
            <li className="footer__contact-item">
              <FaPhone className="footer__contact-icon" />
              <span>+84 123 456 789</span>
            </li>
            <li className="footer__contact-item">
              <FaEnvelope className="footer__contact-icon" />
              <span>support@example.com</span>
            </li>
            <li className="footer__contact-item">
              <FaMapMarkerAlt className="footer__contact-icon" />
              <span>123 Đường ABC, Quận 1, TP.HCM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__bottom">
        <div className="container">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Your Shop Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
