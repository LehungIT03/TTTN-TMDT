import React from "react";

export default function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  setSelectedPrice,
}) {
  const handleCategorySelect = (categorySlug) => {
    setSelectedCategory(categorySlug === "all" ? null : categorySlug);
    localStorage.setItem("selectedCategory", categorySlug);
  };

  const handlePriceChange = (type, value) => {
    const newValue = value === "" ? (type === "min" ? 0 : "") : Number(value);
    setPriceRange((prev) => ({ ...prev, [type]: newValue }));
    setSelectedPrice(`${priceRange.min}-${priceRange.max}`);
  };

  return (
    <div className="filters-sidebar">
      <div className="filter-section">
        <h3>Danh mục</h3>
        <div className="category-list">
          <button
            className={!selectedCategory ? "active" : ""}
            onClick={() => handleCategorySelect(null)}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button
              key={cat?.id}
              className={selectedCategory === cat?.slug ? "active" : ""}
              onClick={() => handleCategorySelect(cat?.slug)}
            >
              {cat?.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Khoảng giá</h3>
        <div className="price-range">
          <input
            type="number"
            placeholder="Giá tối thiểu"
            value={priceRange.min}
            onChange={(e) => handlePriceChange("min", e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Giá tối đa"
            value={priceRange.max}
            onChange={(e) => handlePriceChange("max", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
