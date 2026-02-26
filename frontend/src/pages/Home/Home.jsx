import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.scss";

/**
 * Home Page Component
 * Responsible for rendering the product grid, loading states, and error messages.
 */
const Home = ({ products, loading, error, selectedCategory, onAddToCart }) => {
  return (
    <div className="container">
      {/* Dynamic Title based on selected category */}
      <h1>{selectedCategory === "All" ? "Premium Collection" : selectedCategory}</h1>
      
      {/* Feedback for loading and error states */}
      {loading && <p className="status-message">Loading products...</p>}
      {error && <p className="error-message">{error}</p>}
      
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
            />
          ))
        ) : (
          !loading && (
            <div className="no-results">
              <p>No products found.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;