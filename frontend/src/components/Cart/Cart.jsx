import React from "react";
import "./Cart.scss";

/**
 * Cart Component
 * Responsible for rendering the shopping cart page, calculating totals,
 * and providing interfaces for quantity adjustments and item removal.
 */
const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  
  /**
   * Calculate the total price of all items in the cart.
   * Multiplies each item's price by its quantity and sums them up.
   */
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1), 
    0
  );

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      
      {/* Conditional rendering: check if the cart is empty */}
      {cartItems.length === 0 ? (
        <p className="empty-msg">Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          {/* List of cart items */}
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image_url} alt={item.name} />
                
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="price-tag">${item.price}</p>
                  
                  {/* Quantity adjustment controls */}
                  <div className="quantity-controls">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove item button */}
                <button 
                  className="remove-btn" 
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          
          {/* Cart Summary sidebar */}
          <div className="cart-summary">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;