import React from "react";
import { FaShoppingCart, FaHeart, FaShare } from "react-icons/fa";
import ProductActions from "./ProductActions";
import ProductDetails from "./ProductDetails";

export default function ProductInfo({
  product,
  quantity,
  setQuantity,
  addToCart,
}) {
  return (
    <div className="product-info">
      <h1 className="product-title">{product.name}</h1>
      <div className="product-price">
        <span className="price">{product.price.toLocaleString()} VND</span>
        <span className="original-price">
          {(product.price * 1.2).toLocaleString()} VND
        </span>
        <span className="discount">-20%</span>
      </div>

      <div className="product-description">
        <h2>Mô tả sản phẩm</h2>
        <p>{product.description}</p>
      </div>

      <ProductActions
        quantity={quantity}
        setQuantity={setQuantity}
        addToCart={() => addToCart(product, quantity)}
      />

      <ProductDetails product={product} />
    </div>
  );
}
