import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/products";
import { categories } from "../../data/categoriesData";
import "../Css/categories.css";
import ProductList from "./productList";
import CategoriesFilter from "./categoriesFilter";
import { IoMenu } from "react-icons/io5";

// Utility function to get category title
const getCategoryTitle = (selectedCategory) => {
  return (
    categories.find((cat) => cat.slug === selectedCategory)?.name ||
    "Danh sách toàn bộ sản phẩm"
  );
};

// Utility function to filter products
const filterProducts = (products, selectedCategory, selectedPrice) => {
  let filtered = [...products];

  // Filter by category
<<<<<<< HEAD
  if (selectedCategory && selectedCategory !== "all") {
    filtered = filtered.filter((product) => {
      // Convert product category to slug format for comparison
      const productCategorySlug = product.category
        .toLowerCase()
        .replace(/\s+/g, "-");
      return productCategorySlug === selectedCategory;
    });
=======
  if (selectedCategory) {
    filtered = filtered.filter(
      (product) =>
        product.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
    );
>>>>>>> e7e0bfc (Khởi tạo trang product admin  và cập nhật giao diện)
  }

  // Filter by price range if selected
  if (selectedPrice) {
    const [min, max] = selectedPrice.split("-").map(Number);
    if (!isNaN(min) && !isNaN(max)) {
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }
  }

  return filtered;
};

export default function Categories() {
  const { slug } = useParams();
<<<<<<< HEAD
  const [selectedCategory, setSelectedCategory] = useState(slug);
=======
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const saved = localStorage.getItem("selectedCategory");
    return saved || null;
  });
>>>>>>> e7e0bfc (Khởi tạo trang product admin  và cập nhật giao diện)
  const [selectedPrice, setSelectedPrice] = useState(() => {
    const saved = localStorage.getItem("selectedPrice");
    return saved || "";
  });
  const [filteredProducts, setFilteredProducts] = useState(products);
<<<<<<< HEAD
  const [isOpenFilter, setIsOpenFilter] = useState(true);

  // Update selectedCategory when slug changes
  useEffect(() => {
    setSelectedCategory(slug);
=======
  const [isOpenFilter, setIsOpenFilter] = useState(() => {
    return localStorage.getItem("showFilter") === "true";
  });

  // Update selectedCategory when slug changes
  useEffect(() => {
    if (slug === "all") {
      setSelectedCategory(null);
      localStorage.removeItem("selectedCategory");
      setIsOpenFilter(true); // Show filter for "all" category
    } else {
      setSelectedCategory(slug);
      localStorage.setItem("selectedCategory", slug);
    }
>>>>>>> e7e0bfc (Khởi tạo trang product admin  và cập nhật giao diện)
  }, [slug]);

  // Filter products based on selected category and price
  useEffect(() => {
    const filtered = filterProducts(products, selectedCategory, selectedPrice);
    setFilteredProducts(filtered);
  }, [selectedCategory, selectedPrice]);

  // Handle filter close
  const handleFilterClose = () => {
    setIsOpenFilter(false);
<<<<<<< HEAD
=======
    localStorage.removeItem("showFilter");
>>>>>>> e7e0bfc (Khởi tạo trang product admin  và cập nhật giao diện)
  };

  const categoryTitle = getCategoryTitle(selectedCategory);

  return (
    <div className="category__page">
      <div className="category__header">
        <button className="filter__btn" onClick={() => setIsOpenFilter(true)}>
          <IoMenu />
        </button>
        <h1 className="title__category">{categoryTitle}</h1>
      </div>

      {isOpenFilter && (
        <CategoriesFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          closeFilter={handleFilterClose}
          products={products}
        />
      )}

      <ProductList products={filteredProducts} />
    </div>
  );
}
