import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.scss";

/**
 * ProductCard Component
 * Now supports navigation to detailed product page.
 */
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img 
          src={product.image_url || "https://via.placeholder.com/150"} 
          alt={product.name} 
          className="product-image" 
        />
      </Link>
      
      <div className="product-info">
        <h3>
          <Link to={`/product/${product.id}`} className="product-title-link">
            {product.name}
          </Link>
        </h3>
        <p className="description">{product.description}</p>
        <div className="card-footer">
          <span className="price">${product.price}</span>
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