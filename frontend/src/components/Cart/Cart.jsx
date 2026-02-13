import React from "react";
import "./Cart.scss";

/**
 * Cart Component
 * Displays the list of items added to the shopping cart
 */
const Cart = ({ cartItems, onRemoveFromCart }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <p className="empty-msg">Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image_url} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => onRemoveFromCart(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          
          <div className="cart-summary">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;