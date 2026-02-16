import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

/**
 * Navbar Component
 * Contains the logo, search bar, and cart navigation.
 * @param {number} cartCount - Total quantity of items in the cart
 * @param {string} searchTerm - Current search input value
 * @param {Function} onSearchChange - Function to handle input changes
 */
const Navbar = ({ cartCount, searchTerm, onSearchChange }) => {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">
          PREMIUM<span>STORE</span>
        </Link>

        {/* Search Bar Section */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-item">Shop</Link>
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