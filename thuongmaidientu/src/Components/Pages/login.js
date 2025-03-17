import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import "../Css/auth.css";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const success = login(email, password);
    if (success) {
      // If login successful, redirect based on role
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } else {
      setError("Email hoặc mật khẩu không chính xác");
    }
  };

  return (
    <div className="auth__container">
      <div className="auth__box">
        <h2>Đăng nhập</h2>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth__form">
          <div className="auth__form-group">
            <FaEnvelope className="auth__icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth__form-group">
            <FaLock className="auth__icon" />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth__form-options">
            <label className="auth__remember">
              <input type="checkbox" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <Link to="/forgot-password" className="auth__forgot">
              Quên mật khẩu?
            </Link>
          </div>
          <button type="submit" className="auth__button">
            Đăng nhập
          </button>
        </form>

        <div className="auth__divider">
          <span>Hoặc đăng nhập với</span>
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
          Chưa có tài khoản?{" "}
          <Link to="/signup" className="auth__switch-link">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
