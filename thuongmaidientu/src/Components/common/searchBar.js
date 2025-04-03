import React, { useState, useRef, useEffect } from "react";
import { CgSearch, CgShoppingCart } from "react-icons/cg";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";

export default function SearchBar({ navigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.slice(0, 5));
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(e.target)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="nav__item">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <CgSearch
          className="nav__item-search"
          onClick={() => searchInputRef.current.focus()}
        />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {showResults && searchResults.length > 0 && (
          <div ref={searchResultsRef} className="search-results">
            {searchResults.map((product) => (
              <div
                key={product.id}
                className="search-result-item"
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="search-result-image"
                />
                <div className="search-result-info">
                  <h4>{product.name}</h4>
                  <p>{product.price.toLocaleString()} VND</p>
                </div>
                <button
                  className="search-result-add-cart"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                >
                  <CgShoppingCart />
                </button>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
