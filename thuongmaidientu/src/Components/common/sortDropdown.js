import React from "react";

export default function SortDropdown({ sortBy, setSortBy }) {
  return (
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      <option value="default">Sắp xếp mặc định</option>
      <option value="price-asc">Giá tăng dần</option>
      <option value="price-desc">Giá giảm dần</option>
      <option value="name-asc">Tên A-Z</option>
      <option value="name-desc">Tên Z-A</option>
    </select>
  );
}
