import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import ProductCard from './components/ProductCard/ProductCard';
import { getProducts } from './services/api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Initialize data fetching from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Application Error: Failed to load products.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  /**
   * Handles the add to cart logic and updates global state.
   */
  const handleAddToCart = (product) => {
    setCartCount(prev => prev + 1);
    console.log(`Professional Log: ${product.name} added to cart.`);
  };

  return (
    <div className="App">
      <Navbar cartCount={cartCount} />
      
      <header className="hero-section">
        <h1>Essential Collection 2026</h1>
        <p>Future designs met with today's comfort.</p>
      </header>

      {/* Main content wrapper for responsive alignment */}
      <main className="container">
        {loading ? (
          <div className="loading-state">Synchronizing with server...</div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2026 Minimalist Shop. All rights reserved.</p>
          <p>Built with React & Flask - Professional Grade Architecture</p>
        </div>
      </footer>
    </div>
  );
}

export default App;