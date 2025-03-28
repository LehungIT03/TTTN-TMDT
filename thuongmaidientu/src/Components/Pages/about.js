import React from "react";
import {
  FaStar,
  FaUsers,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../Css/about.css"; // Import CSS

export default function About() {
  return (
    <div className="about__page">
      <div className="about__container">
        {/* Giới thiệu */}
        <section className="about__intro">
          <h1>🌟 Về Chúng Tôi</h1>
          <p>
            Chúng tôi là nền tảng thương mại điện tử hàng đầu, cung cấp sản phẩm
            chất lượng cao với giá cả hợp lý.
          </p>
        </section>

        {/* Sứ mệnh */}
        <section className="about__mission">
          <h2>🎯 Sứ Mệnh</h2>
          <div className="mission__items">
            <div className="mission__item">
              <FaStar className="icon" />
              <p>Chất lượng hàng đầu</p>
            </div>
            <div className="mission__item">
              <FaUsers className="icon" />
              <p>Khách hàng là trọng tâm</p>
            </div>
            <div className="mission__item">
              <FaCheckCircle className="icon" />
              <p>Minh bạch & Uy tín</p>
            </div>
          </div>
        </section>

        {/* Đội ngũ */}
        <section className="about__team">
          <h2>🤝 Đội Ngũ</h2>
          <div className="team__members">
            <div className="member">
              <img src="https://picsum.photos/100?random=1" alt="CEO" />
              <h3>Nguyễn Văn A</h3>
              <p>CEO</p>
            </div>
            <div className="member">
              <img src="https://picsum.photos/100?random=2" alt="Marketing" />
              <h3>Trần Thị B</h3>
              <p>Marketing</p>
            </div>
            <div className="member">
              <img src="https://picsum.photos/100?random=3" alt="Developer" />
              <h3>Lê Văn C</h3>
              <p>Phát triển sản phẩm</p>
            </div>
          </div>
        </section>

        {/* Liên hệ */}
        <section className="about__contact">
          <h2>📞 Liên Hệ</h2>
          <div className="contact__info">
            <p>
              <FaMapMarkerAlt className="icon" /> 123 Đường ABC, Quận 1, TP.HCM
            </p>
            <p>
              <FaEnvelope className="icon" /> support@example.com
            </p>
            <p>
              <FaPhone className="icon" /> +84 123 456 789
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
