import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductGallery from "../Components/product/productGallery";
import ProductInfo from "../Components/product/productInfo";
import "../Components/Css/product.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="product-not-found">Sản phẩm không tồn tại</div>;
  }

  return (
    <div className="product-page">
      <div className="product-container">
        <ProductGallery product={product} />
        <ProductInfo
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
          addToCart={addToCart}
        />
      </div>
    </div>
  );
}
