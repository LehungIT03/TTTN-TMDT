import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";
import { useCart } from "../contexts/CartContext";
import { categories } from "../../data/categoriesData";

const Home = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const handleCategoryClick = (categorySlug) => {
    // Navigate directly to the category page with the slug
    navigate(`/category/${categorySlug}`);
  };

  return (
    <div className="home">
      {/* ... other sections ... */}

      <section className="category__section">
        <h2 className="section__title">Danh mục sản phẩm</h2>
        <div className="category__grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category__card"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ... rest of the component ... */}
    </div>
  );
};

export default Home;
