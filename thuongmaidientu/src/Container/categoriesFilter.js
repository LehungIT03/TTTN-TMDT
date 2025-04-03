import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import FiltersSidebar from "../Components/common/filterSideBar";
import SortDropdown from "../Components/common/sortDropdown";
import ProductGrid from "../Components/common/productGrid";
import "../Components/Css/categoriesFilter.css";
export default function CategoriesFilter({
  categories = [],
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
  closeFilter,
  products = [],
}) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-").map(Number);
      setPriceRange({ min: min || 0, max: max || "" });
    } else {
      setPriceRange({ min: 0, max: "" });
    }
  }, [selectedPrice]);

  useEffect(() => {
    const filterProducts = () => {
      try {
        setIsLoading(true);
        setError(null);

        let filtered = [...(Array.isArray(products) ? products : [])];

        if (selectedCategory) {
          filtered = filtered.filter(
            (product) =>
              product?.category?.toLowerCase().replace(/\s+/g, "-") ===
              selectedCategory
          );
        }

        filtered = filtered.filter((product) => {
          const price = Number(product?.price) || 0;
          const min = Number(priceRange.min) || 0;
          const max = priceRange.max ? Number(priceRange.max) : Infinity;
          return price >= min && price <= max;
        });

        switch (sortBy) {
          case "price-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "name-asc":
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "name-desc":
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
          default:
            break;
        }

        setFilteredProducts(filtered);
      } catch (err) {
        setError("Có lỗi xảy ra khi lọc sản phẩm.");
        console.error("Error filtering products:", err);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    filterProducts();
  }, [selectedCategory, sortBy, priceRange, products]);

  return (
    <div className="category-page">
      <h1>
        {selectedCategory
          ? categories.find((cat) => cat?.slug === selectedCategory)?.name ||
            "Danh mục"
          : "Tất cả sản phẩm"}
      </h1>
      <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
      <div className="category-content">
        <FiltersSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setSelectedPrice={setSelectedPrice}
        />
        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
          addToCart={addToCart}
        />
      </div>
    </div>
  );
}
