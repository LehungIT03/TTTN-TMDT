import React from "react";
import "../Css/contact.css";

export default function Contact() {
  return (
    <div className="contact__container">
      <h2>Liên Hệ Chúng Tôi</h2>
      <p>Hãy để lại tin nhắn, chúng tôi sẽ phản hồi sớm nhất!</p>

      <div className="contact__info">
        <div className="info">
          <h3>📍 Địa chỉ</h3>
          <p>123 Đường ABC, Quận 1, TP.HCM</p>
        </div>
        <div className="info">
          <h3>📞 Hotline</h3>
          <p>+84 123 456 789</p>
        </div>
        <div className="info">
          <h3>✉ Email</h3>
          <p>support@example.com</p>
        </div>
      </div>

      <form className="contact__form">
        <input type="text" placeholder="Họ và tên" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Nội dung tin nhắn" required></textarea>
        <button type="submit">Gửi Tin Nhắn</button>
      </form>
    </div>
  );
}
