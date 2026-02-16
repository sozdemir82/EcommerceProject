import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

/**
 * Navbar Component
 * @param {number} cartCount - Cart items total
 * @param {string} searchTerm - Search input state
 * @param {Function} onSearchChange - Search update handler
 * @param {Array} categories - Unique list of categories
 * @param {string} selectedCategory - Currently active category
 * @param {Function} onCategoryChange - Category update handler
 */
const Navbar = ({ 
  cartCount, 
  searchTerm, 
  onSearchChange, 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo" onClick={() => onCategoryChange("All")}>
          PREMIUM<span>STORE</span>
        </Link>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="nav-links">
          {/* Category Filter Dropdown */}
          <select 
            className="category-select" 
            value={selectedCategory} 
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <Link to="/cart" className="nav-item cart-link">
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;