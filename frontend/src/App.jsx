import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * Main Application Component
 * Managed states: products (API data) and cartCount (Shopping cart logic)
 */
function App() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Fetch product data from the backend on component mount
  useEffect(() => {
    fetch('http://127.0.0.1:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  // Handler for adding items to cart
  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    /* The main wrapper that enables the sticky footer layout via Flexbox */
    <div className="layout">
      
      {/* HEADER: Sticky navigation bar with off-white background */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">MINIMALIST<span>SHOP</span></div>
          <div className="nav-links">
            <span className="nav-item">Shop</span>
            <span className="nav-item">Journal</span>
            <div className="cart-container">
              {/* Shopping bag icon (SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {/* Dynamic cart count badge */}
              <span className="cart-badge">{cartCount}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT: Pushes the footer down if content is short */}
      <div className="main-content">
        <div className="app-container">
          <header className="hero">
            <h1>Essential Collection</h1>
            <p>Premium quality products designed for your daily life.</p>
          </header>

          {/* Grid system for product cards */}
          <main className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="image-container">
                  {/* Displays first letter of product name as a placeholder */}
                  <div className="placeholder-img"><span>{product.name[0]}</span></div>
                  {/* Centered button with hover effects */}
                  <button className="quick-add" onClick={addToCart}>Add to Cart</button>
                </div>
                <div className="product-details">
                  <p className="category-tag">Premium</p>
                  <h3>{product.name}</h3>
                  <p className="price">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>

      {/* FOOTER: Multi-column footer with greyish background */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-section">
            <div className="logo">MINIMALIST<span>SHOP</span></div>
            <p>Elevating your everyday essentials with timeless design.</p>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <span>Shipping & Returns</span>
            <span>Contact Us</span>
          </div>
          <div className="footer-section">
            <h4>Newsletter</h4>
            <div className="subscribe">
              <input type="email" placeholder="Email address" />
              <button>→</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 MinimalistShop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;