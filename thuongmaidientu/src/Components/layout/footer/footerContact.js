import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "../../Css/footer.css";
export default function FooterContact() {
  return (
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
  );
}
