import React from 'react';
import './Navbar.css';

/**
 * Navbar component for site-wide navigation and cart status.
 * @param {number} cartCount - Current number of items in the shopping cart.
 */
const Navbar = ({ cartCount = 0 }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>MINIMALIST SHOP</h1>
        </div>
        
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/about">About</a></li>
        </ul>

        <div className="navbar-actions">
          <div className="cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="cart-badge">{cartCount}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;