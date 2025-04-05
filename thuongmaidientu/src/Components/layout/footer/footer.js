import React from "react";
import { footerSocialLinks } from "../../../config/footerConfig";
import "../../Css/footer.css";
import FooterLinks from "./footerLinks";
import FooterContact from "./footerContact";
import FooterCategories from "./footerCategories";
import FooterCustomService from "./footerCustomService";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__section">
          <h3 className="footer__title">Về chúng tôi</h3>
          <p className="footer__description">
            Chúng tôi là nền tảng thương mại điện tử hàng đầu, cung cấp các sản
            phẩm chất lượng với giá cả hợp lý.
          </p>
          <div className="footer__social">
            {footerSocialLinks.map((social, index) => (
              <a key={index} href={social.link} className="footer__social-link">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <FooterLinks />
        <FooterCategories />
        <FooterCustomService />
        <FooterContact />
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
