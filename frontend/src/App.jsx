import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * MinimalistShop - Main Application Component
 * Designed with a focus on clean UI and responsiveness.
 */
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product data from the Flask API on component mount
  useEffect(() => {
    fetch('http://127.0.0.1:5000/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      {/* Navigation - Professional Header */}
      <nav className="navbar">
        <div className="logo">MINIMALIST<span>SHOP</span></div>
        <div className="nav-links">
          <span className="nav-text">Shop</span>
          <span className="nav-text">Categories</span>
          <div className="cart-container">
            {/* Minimalist Shopping Bag Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span className="cart-badge">0</span>
          </div>
        </div>
      </nav>

      {/* Hero - Essential Branding Section */}
      <header className="hero">
        <h1>Essential Collection</h1>
        <p>Premium quality products designed for your daily life.</p>
      </header>

      {/* Main Product Display Area */}
      <main className="product-grid">
        {loading ? (
          <div className="loading">Loading our collection...</div>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-card">
              <div className="image-container">
                <div className="placeholder-img">
                  {/* Dynamic Initial Placeholder */}
                  <span>{product.name.charAt(0)}</span>
                </div>
                <button className="quick-add">Add to Cart</button>
              </div>
              <div className="product-details">
                <span className="category-tag">Premium</span>
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Footer - Branding and Info */}
      <footer className="footer">
        <p>&copy; 2026 MinimalistShop - Built with Flask & React</p>
      </footer>
    </div>
  );
}

export default App;