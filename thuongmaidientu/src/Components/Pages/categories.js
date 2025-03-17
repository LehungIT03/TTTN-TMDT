import React, { useEffect, useState } from "react";
import { products, categories } from "../../data";
import "../Css/categories.css";
import ProductList from "./productList";
import CategoriesFilter from "./categoriesFilter";
import { IoMenu } from "react-icons/io5";
import { useParams } from "react-router-dom";

export default function Categories() {
  const { slug } = useParams();

  //tạo state để lưu danh sách sản phẩm theo loại
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory") || null
  );
  //tạo state để lưu giá sản phẩm
  const [selectedPrice, setSelectedPrice] = useState(
    localStorage.getItem("selectedPrice") || ""
  );
  //tạo state để lưu danh sách sản phẩm đã lọc
  const [filteredProducts, setFilteredProducts] = useState(products);
  //tạo state để lưu trạng thái mở/đóng filter
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  //lưu loại sản phẩm vào localStorage
  useEffect(() => {
    if (slug === "all") {
      setSelectedCategory(null);
      localStorage.removeItem("selectedCategory");
    } else {
      setSelectedCategory(slug);
      localStorage.setItem("selectedCategory", slug);
    }
  }, [slug]);
  //lọc sản phẩm theo loại và giá
  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedPrice]);
  //lọc sản phẩm theo loại và giá
  const filterProducts = () => {
    let filtered = products;

    // Lọc theo danh mục
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.slug === selectedCategory
      );
    }

    // Lọc theo giá
    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filtered = filtered.filter(
          (product) => product.price >= min && product.price <= max
        );
      } else if (!isNaN(min)) {
        filtered = filtered.filter((product) => product.price >= min);
      }
    }

    setFilteredProducts(filtered);
  };
  /*
  const [products, setProducts] = useState([]);
  lấy danh sách sản phẩm từ API theo loại và giá, và gán vào state products

  useEffect(() => {
    fetchProducts(selectedCategory, priceRange);
  }, [selectedCategory, priceRange]);
  const fetchProducts = async (category, price) => {
    let url = `/api/products?`;
    if (category) url += `category=${category}&`;
    if (price) url += `price=${price}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };
*/

  //lọc sản phẩm theo loại
  const categoryTitle =
    categories.find((cat) => cat.slug === selectedCategory)?.name ||
    "Danh sách toàn bộ sản phẩm";
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
          closeFilter={() => setIsOpenFilter(false)}
        />
      )}

      <ProductList products={filteredProducts} />
    </div>
  );
}
