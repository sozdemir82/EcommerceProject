import React from "react";
import "./Navbar.scss";

/**
 * Navbar Component
 * Receives cartCount as a prop to display items in the cart dynamically.
 */
const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <a href="/">E-COMMERCE</a>
        </div>
        <ul className="nav-menu">
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li>
            <a href="/cart" className="cart-link">
              Cart <span className="cart-count">({cartCount})</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;