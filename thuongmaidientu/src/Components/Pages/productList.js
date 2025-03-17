import React from "react";
import { Link } from "react-router-dom";

export default function ProductList({
  products,
  selectedCategory,
  selectedPrice,
}) {
  //lọc sản phẩm theo loại
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.slug === selectedCategory)
    : products;
  //lọc sản phẩm theo giá
  if (selectedPrice) {
    const [min, max] = selectedPrice.split("-").map(Number);
    if (!isNaN(min) && !isNaN(max)) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
    } else if (!isNaN(min)) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min
      );
    }
  }
  return (
    <div className="product__list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="product__card"
          >
            <h3 className="">{product.name}</h3>
            <img className="" src={product.img} alt={product.name} />
            <p className="">{product.description}</p>
            <p className="">{product.price.toLocaleString()} vnd</p>
          </Link>
        ))
      ) : (
        <p className="">khong co san pham trong danh muc nay</p>
      )}
    </div>
  );
}
