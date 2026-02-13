import React from "react";
import "./ProductCard.scss";

/**
 * ProductCard Component
 * Handles individual product display and 'Add to Cart' trigger.
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
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)} // This must match the prop name
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;