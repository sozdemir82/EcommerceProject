import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // EMPTY STATE
  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart-hero">
          <div className="icon-circle">🛒</div>
          <h2 className="empty-title">Your cart is empty</h2>
          <p className="empty-subtitle">
            Looks like you haven't made your choice yet. Explore our products and find something you love!
          </p>
          <button className="start-shopping-btn" onClick={() => navigate("/")}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE STATE
  return (
    <div className="container">
      <div className="cart-page-wrapper">
        <h1 className="cart-page-title">Shopping Cart</h1>
        
        <div className="cart-content-layout">
          {/* Left Side: Items */}
          <div className="cart-items-section">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="item-img-box">{item.name.charAt(0)}</div>
                
                <div className="item-info-wrapper">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    <span className="item-price">${item.price.toFixed(2)}</span>
                  </div>

                  <div className="item-footer-actions">
                    <div className="quantity-box">
                      <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                      <span className="qty-num">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                    </div>
                    
                    <button className="delete-btn" onClick={() => onRemoveFromCart(item.id)}>
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Summary */}
          <aside className="cart-summary-aside">
            <div className="summary-sticky-card">
              <h3 className="summary-header">Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="shipping-free">FREE</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row total-row">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button className="checkout-main-btn">Proceed to Checkout</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;