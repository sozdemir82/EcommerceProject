import React from "react";
import "./ProductCard.scss"; // Fixed the extension from .css to .scss

/**
 * ProductCard Component
 * Displays individual product details and handles 'Add to Cart' action
 */
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img 
        src={product.image_url || "https://via.placeholder.com/150"} 
        alt={product.name} 
        className="product-image" 
      />
      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <div className="card-footer">
        <span className="price">${product.price}</span>
        <button 
          onClick={() => onAddToCart(product)}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;