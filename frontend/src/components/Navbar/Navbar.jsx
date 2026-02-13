import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

/**
 * Navbar Component
 * Features Link components for seamless client-side navigation.
 */
const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <Link to="/">E-COMMERCE</Link>
        </div>
        <ul className="nav-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart" className="cart-link">
              Cart <span className="cart-count">({cartCount})</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;