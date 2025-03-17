import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";
import "../Css/auth.css";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    // Add your signup logic here
    console.log("Signup data:", formData);
    // For now, just navigate to home page
    navigate("/");
  };

  return (
    <div className="auth__container">
      <div className="auth__box">
        <h2>Đăng ký</h2>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth__form">
          <div className="auth__form-group">
            <FaUser className="auth__icon" />
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth__form-group">
            <FaEnvelope className="auth__icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth__form-group">
            <FaLock className="auth__icon" />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth__form-group">
            <FaLock className="auth__icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth__button">
            Đăng ký
          </button>
        </form>

        <div className="auth__divider">
          <span>Hoặc đăng ký với</span>
        </div>

        <div className="auth__social">
          <button className="auth__social-button google">
            <FaGoogle />
            Google
          </button>
          <button className="auth__social-button facebook">
            <FaFacebook />
            Facebook
          </button>
        </div>

        <div className="auth__switch">
          Đã có tài khoản?{" "}
          <Link to="/login" className="auth__switch-link">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
