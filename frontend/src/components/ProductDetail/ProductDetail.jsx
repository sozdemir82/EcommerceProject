import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts } from "../../services/api";
import "./ProductDetail.scss";

/**
 * ProductDetail Component
 * Displays detailed information about a specific product.
 * Uses dynamic routing parameters to identify and fetch the correct product.
 * * @param {Function} onAddToCart - Global function to add the current product to the cart
 */
const ProductDetail = ({ onAddToCart }) => {
  // Extract the product ID from the URL parameters
  const { id } = useParams();
  
  // Navigation hook to allow users to return to the previous page
  const navigate = useNavigate();
  
  // Local state for the product data, loading status, and potential errors
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Effect Hook: Fetches the product list and filters for the matching ID
   * whenever the ID in the URL changes.
   */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Fetching all products from API (Optimized: in a real app, you'd fetch by ID)
        const products = await getProducts();
        const foundProduct = products.find((p) => p.id === parseInt(id));
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Render loading state while waiting for API response
  if (loading) return <div className="status-message container">Loading product details...</div>;
  
  // Render error state if the product is not found in the database
  if (!product) return <div className="error-message container">Product not found!</div>;

  return (
    <div className="product-detail-container container">
      {/* Back button triggers browser history navigation */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back to Shop
      </button>
      
      <div className="detail-content">
        {/* Left Section: Product Visuals */}
        <div className="image-section">
          <img 
            src={product.image_url || "https://via.placeholder.com/500"} 
            alt={product.name} 
          />
        </div>
        
        {/* Right Section: Product Details and Actions */}
        <div className="info-section">
          <span className="badge">Premium Choice</span>
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>
          
          <div className="divider"></div>
          
          <p className="description">{product.description}</p>
          
          {/* Action button to trigger the global addToCart function */}
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

export default ProductDetail;