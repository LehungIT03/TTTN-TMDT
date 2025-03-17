import React from "react";
import logo from "../../Assets/img/shopping.png";
import {
  FaRegEnvelope,
  FaCaretRight,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { AiOutlinePhone } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import "../Css/footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const ScrollToTop = () => {
    localStorage.removeItem("selectedCategory");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="footer">
      <div className="footer__grid container grid">
        <div className="footer__content">
          <Link to="/" className="footer__logo">
            <img src={logo} alt="" className="footer__logo-img" />
          </Link>
          <p className="footer__description">
            Bạn thấy trang thương mại điện tử này như thế nào? có khiến bạn hài
            lòng hay thất vọng? hãy liên hệ và góp ý cho chúng tôi.
          </p>
          <ul className="tooter__contact">
            <li className="footer__contact-item">
              <AiOutlinePhone className="icon" /> +84 7777 566 84
            </li>
            <li className="footer__contact-item">
              <MdOutlineLocationOn className="icon" /> Ho Chi Minh
            </li>
            <li className="footer__contact-item">
              <FaRegEnvelope className="icon" /> thuongmaidientu@reactjs.com
            </li>
          </ul>
        </div>
        <div className="footer__content">
          <h3 className="footer__title">Thông tin</h3>
          <ul className="footer__links">
            <li>
              <Link to="/about" className="footer__link" onClick={ScrollToTop}>
                <FaCaretRight className="icon" /> Về chúng tôi
              </Link>
            </li>
            <li>
              <Link
                to="/category/all"
                className="footer__link"
                onClick={ScrollToTop}
              >
                <FaCaretRight className="icon" /> Sản phẩm
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__content">
          <h3 className="footer__title">Khuyến mãi</h3>
          <div className="footer__sale">
            <ul className="sale-list">
              <li className="sale-item">
                <span></span>
                <span></span>
              </li>
              <li className="sale-item">
                <span></span>
                <span></span>
              </li>
              <li className="sale-item">
                <span></span>
                <span></span>
              </li>
              <li className="sale-item">
                <span></span>
                <span></span>
              </li>
              <li className="sale-item">
                <span></span>
                <span></span>
              </li>
              <li className="sale-item">
                <span></span>
                <span></span>
              </li>
              <li className="sale-item">
                <span></span>
                <span></span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__content">
          <h3 className="footer__title">Ủng hộ</h3>
          <p className="footer__description">
            để lại ủng hộ để chúng tôi có thể phát triển hơn
          </p>
          <div action="" className="subscribe__form">
            <input type="text" className="" placeholder="" />
            <label>Email</label>
            <button className="btn btn--flex subscribe__btn">
              <FaRegEnvelope /> Ủng hộ ngay
            </button>
          </div>
          <div className="footer__socials">
            <h3 className="footer__social-follow">Theo dõi chúng tôi</h3>
            <div className="footer__social-links">
              <div>
                <Link to="/under-dev" className="footer__social-link">
                  <FaFacebookF />
                </Link>
              </div>
              <div>
                <Link to="/under-dev" className="footer__social-link">
                  <FaTwitter />
                </Link>
              </div>
              <div>
                <Link to="/under-dev" className="footer__social-link">
                  <FaLinkedinIn />
                </Link>
              </div>
              <div>
                <Link to="/under-dev" className="footer__social-link">
                  <FaYoutube />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="copyright__text">
        &copy; Copyright 2025 <span>Title</span> All Rights Reserved.
      </p>
    </footer>
  );
}
