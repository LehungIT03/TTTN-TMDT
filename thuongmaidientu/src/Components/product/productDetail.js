import React from "react";

export default function ProductDetails({ product }) {
  return (
    <div className="product-details">
      <h2>Thông tin chi tiết</h2>
      <div className="details-grid">
        <div className="detail-item">
          <span className="label">Thương hiệu:</span>
          <span className="value">Brand Name</span>
        </div>
        <div className="detail-item">
          <span className="label">Mã sản phẩm:</span>
          <span className="value">{product.id}</span>
        </div>
        <div className="detail-item">
          <span className="label">Danh mục:</span>
          <span className="value">{product.slug}</span>
        </div>
        <div className="detail-item">
          <span className="label">Tình trạng:</span>
          <span className="value">Còn hàng</span>
        </div>
      </div>
    </div>
  );
}
