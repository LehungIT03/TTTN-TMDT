import React, { useState } from "react";

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="product-gallery">
      <div className="main-image">
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
        />
      </div>
      <div className="thumbnail-list">
        <div
          className={`thumbnail ${selectedImage === 0 ? "active" : ""}`}
          onClick={() => setSelectedImage(0)}
        >
          <img
            src={product.image || "https://via.placeholder.com/100"}
            alt={product.name}
          />
        </div>
      </div>
    </div>
  );
}
