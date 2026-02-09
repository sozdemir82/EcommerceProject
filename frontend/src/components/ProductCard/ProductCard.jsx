import React from 'react';
import './ProductCard.css';

/**
 * ProductCard component to display individual product details.
 * @param {Object} product - Product data object.
 * @param {Function} onAddToCart - Callback function when "Add to Cart" is clicked.
 */
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        {/* Render product image or initial-based placeholder if image is missing */}
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="image-placeholder">
            <span>{product.name ? product.name[0] : 'P'}</span>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category || 'Essential'}</p>
        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <button 
            className="add-to-cart-btn" 
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;