import React, { useEffect, useRef, useState } from "react";

export default function CategoriesFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  setSelectedPrice,
  closeFilter,
}) {
  const sidebarRef = useRef(null);
  // sate lưu trữ giá sản phẩm
  const [priceRange, setPriceRange] = useState("");

  // hiệu ứng khi nhấn ra bên ngoài thì categgory filter sẽ đóng lại
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeFilter();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeFilter]);
  //lưu loại sản phẩm đã chọn vào localStorage
  useEffect(() => {
    setSelectedCategory(localStorage.getItem("selectedCategory") || null);
    setSelectedPrice(localStorage.getItem("selectedPrice") || "");
  });
  return (
    <div className="filter__overlay">
      <div className="sidebar__filter" ref={sidebarRef}>
        <button className="close__btn" onClick={closeFilter}>
          x
        </button>
        <h3 className="">Lọc sản phẩm theo loại</h3>
        <ul className="">
          {categories.map((category) => (
            <li key={category.id} className="">
              <label>
                <input
                  type="radio"
                  name="category"
                  value={category.slug}
                  checked={selectedCategory === category.slug}
                  onChange={() => {
                    setSelectedCategory(category.slug);
                    localStorage.setItem("selectedCategory", category.slug);
                  }}
                />
                {category.name}
              </label>
            </li>
          ))}
        </ul>
        <h3 className="">Lọc sản phẩm theo giá</h3>
        <select
          value={priceRange}
          onChange={(e) => {
            setPriceRange(e.target.value);
            setSelectedPrice(e.target.value);
            localStorage.setItem("selectedPrice", e.target.value);
          }}
        >
          <option value="">Toàn bộ sản phẩm</option>
          <option value="0-100000">0-100,000 VND</option>
          <option value="100000-200000">100,000-200,000 VND</option>
          <option value="200000-500000">200,000-500,000 VND</option>
          <option value="500000-1000000">500,000-1,000,000 VND</option>
          <option value="1000000">Trên 1,000,000 VND</option>
        </select>
        <button
          className="btn__reset"
          onClick={() => {
            localStorage.removeItem("selectedCategory");
            localStorage.removeItem("selectedPrice");
            setSelectedCategory(null);
            setSelectedPrice("");
            setPriceRange("");
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
