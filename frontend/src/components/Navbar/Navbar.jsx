import React from "react";
import "./Navbar.scss"; // Updated to use SCSS extension

/**
 * Navbar Component
 * Renders the main navigation bar and branding
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Logo / Name */}
        <div className="brand">
          <a href="/">E-COMMERCE STORE</a>
        </div>

        {/* Navigation Links */}
        <ul className="nav-menu">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/cart" className="cart-link">
              Cart <span className="cart-count">(0)</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;