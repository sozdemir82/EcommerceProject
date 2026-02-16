import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';

/**
 * ProductCard Component
 * Fixed layout to prevent excessive white space and improve visual hierarchy.
 */
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          {/* Using a placeholder if image is missing, but with better styling */}
          <div className="img-fallback">{product.name.charAt(0)}</div>
        </div>
        
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3 className="product-title">{product.name}</h3>
          <p className="product-description">
            {product.description?.substring(0, 60)}...
          </p>
        </div>
      </Link>

      <div className="product-footer">
        <span className="product-price">${product.price.toFixed(2)}</span>
        <button 
          className="add-btn" 
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;