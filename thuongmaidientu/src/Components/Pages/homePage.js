import React, { useEffect, useState } from "react";
import { banners, subBanner, categories } from "../../data";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../Css/homePage.css";
import { products } from "../../data";
import { Link } from "react-router-dom";
import CategoriesFilter from "./categoriesFilter";

export default function HomePage() {
  //#region BannerBanner
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };
  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, autoPlay]);
  //#endregion
  //#region random san pham
  const [randomProduct, setRandomProduct] = useState([]);
  useEffect(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setRandomProduct(shuffled.slice(0, 8));
  }, []);
  //#endregion
  //#region scroll

  const handleCategoryClick = (slug) => {
    localStorage.setItem("selectedCategory", slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  //#endregion
  return (
    <div className="home__page">
      <div className="banner__container">
        <div
          className="main__banner"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <button className="arrow left" onClick={prevSlide}>
            <FaAngleLeft />
          </button>
          <div
            className="banner__wrapper"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map((banner, index) => (
              <img
                key={banner.id}
                className={`banner__image ${
                  index === currentIndex ? "active" : ""
                }`}
                src={banner.img}
                alt={banner.name}
              />
            ))}
          </div>
          <button className="arrow right" onClick={nextSlide}>
            <FaAngleRight />
          </button>
          <div className="dots">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>
        </div>
        <div className="sub__banners">
          {subBanner.map((item) => (
            <img src={item.img} alt="category" className="side__banner" />
          ))}
        </div>
      </div>
      <div className="category__container ">
        {categories.map((category) => (
          <Link
            key={category.id}
            className="category__item"
            to={`/category/${category.slug}`}
            onClick={() => {
              handleCategoryClick(category.slug);
            }}
          >
            <img
              src={category.img}
              alt="category"
              className="category__image"
            />
            <span className="">{category.name}</span>
          </Link>
        ))}
      </div>

      <div className="category__divider"></div>
      <div className="random__products">
        <h2 className="product__title">Sản phẩm</h2>
        <div className="product__grid">
          {randomProduct.map((product) => (
            <div className="product__card" key={product.id}>
              <img className="" src={product.img} />
              <h3 className="">{product.name}</h3>
              <p className="">{product.price} VND</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
