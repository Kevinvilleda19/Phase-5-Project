import React, { useEffect, useState, useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { fetchProducts, fetchARProducts } from '../services/api';
import { toast } from 'react-toastify'; // Import toast for notifications

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [arProducts, setARProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchProducts().then((fetchedProducts) => {
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
      setRecommendedProducts(getRecommendations(fetchedProducts));
    });

    fetchARProducts().then(setARProducts);
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');

    if (searchQuery) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [location.search, products]);

  const getRecommendations = (products) => {
    const randomIndex = Math.floor(Math.random() * products.length);
    const category = products[randomIndex].category;
    return products.filter((product) => product.category === category).slice(0, 3);
  };

  // Get unique categories from the products
  const categories = Array.from(new Set(products.map(product => product.category)));

  const handleCategorySelect = (category) => {
    setDropdownOpen(false);
    if (category === "All") {
      setFilteredProducts(products); // Show all products if "All" is selected
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleAddToCart = (product) => {
    addToCart(product); // Add the product to the cart
    toast.success(`${product.title} has been added to your cart!`); // Show a success toast notification
  };

  return (
    <div>
      <header className="navbar">
        <Link to="/" className="navbar-logo">VistaMart</Link>

        {/* Dropdown for Categories */}
        <div className="navbar-categories" ref={dropdownRef}>
          <button
            className="navbar-categories-link"
            onClick={() => setDropdownOpen(prev => !prev)}>
            Categories
          </button>
          {dropdownOpen && (
            <div className="navbar-dropdown">
              <a className="navbar-dropdown-item" onClick={() => handleCategorySelect("All")}>
                All
              </a>
              {categories.map((category, index) => (
                <a key={index}
                   className="navbar-dropdown-item"
                   onClick={() => handleCategorySelect(category)}>
                  {category}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="main-content">
        <h1>Product Catalog</h1>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-image-link">
                <img src={product.image} alt={product.title} className="product-image" />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.id}`} className="product-title">{product.title}</Link>
                <p className="product-price">${product.price}</p>
                <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        <h2>Recommended for You</h2>
        <div className="product-grid">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-image-link">
                <img src={product.image} alt={product.title} className="product-image" />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.id}`} className="product-title">{product.title}</Link>
                <p className="product-price">${product.price}</p>
                <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
