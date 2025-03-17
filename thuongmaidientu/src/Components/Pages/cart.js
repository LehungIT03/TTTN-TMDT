import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import "../Css/cart.css";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart__empty">
        <h2>Giỏ hàng trống</h2>
        <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
        <Link to="/" className="continue-shopping">
          <FaArrowLeft /> Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="cart__page">
      <div className="cart__container">
        <h2>Giỏ hàng ({getCartCount()} sản phẩm)</h2>
        <div className="cart__content">
          <div className="cart__items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart__item">
                <img
                  src={item.img}
                  alt={item.name}
                  className="cart__item-image"
                />
                <div className="cart__item-details">
                  <h3>{item.name}</h3>
                  <p className="cart__item-price">
                    {item.price.toLocaleString()} VND
                  </p>
                  <div className="cart__item-quantity">
                    <label>Số lượng:</label>
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <div className="cart__checkout">
            <div className="cart__summary">
              <div className="cart__total">
                <h3>Tổng cộng:</h3>
                <p>{getCartTotal().toLocaleString()} VND</p>
              </div>
              <div className="cart__actions">
                <Link to="/" className="continue-shopping">
                  <FaArrowLeft /> Tiếp tục mua sắm
                </Link>
                <button className="checkout-button">Thanh toán</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
