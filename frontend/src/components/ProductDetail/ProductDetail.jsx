import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts } from "../../services/api";
import "./ProductDetail.scss";

/**
 * ProductDetail Component
 * Fetches specific product data based on the URL parameter :id.
 */
const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
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

  if (loading) return <div className="status-message container">Loading product details...</div>;
  if (!product) return <div className="error-message container">Product not found!</div>;

  return (
    <div className="product-detail-container container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back to Shop
      </button>
      
      <div className="detail-content">
        <div className="image-section">
          <img src={product.image_url || "https://via.placeholder.com/500"} alt={product.name} />
        </div>
        
        <div className="info-section">
          <span className="badge">Premium Choice</span>
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>
          <div className="divider"></div>
          <p className="description">{product.description}</p>
          
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