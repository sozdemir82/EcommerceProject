import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProductCard from "./components/ProductCard/ProductCard";
import Cart from "./components/Cart/Cart";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { getProducts } from "./services/api";
import "./App.scss";

/**
 * App Component
 * The central controller of the application managing global state,
 * routing, and persistent storage.
 */
function App() {
  // Global state for product list fetched from backend
  const [products, setProducts] = useState([]);
  
  // Cart state with lazy initialization from LocalStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shopping_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // UI States for handling data loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Effect: Persist cart data to LocalStorage whenever the cart state changes
   */
  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Effect: Fetch products from API on initial component mount
   */
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load products. Please check your backend connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, []);

  /**
   * Adds a product to the cart. 
   * If the product already exists, increments its quantity.
   * @param {Object} product - The product object to add
   */
  const addToCart = (product) => {
    setCart((prevCart) => {
      const isItemInCart = prevCart.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prevCart.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  /**
   * Removes a specific product from the cart completely
   * @param {number} productId - ID of the product to be removed
   */
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  /**
   * Adjusts the quantity of a product in the cart
   * @param {number} productId - Target product ID
   * @param {number} amount - Positive or negative value to change quantity
   */
  const updateQuantity = (productId, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + amount) }
          : item
      )
    );
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar displays total item count (sum of all quantities) */}
        <Navbar cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} />
        
        <main>
          <Routes>
            {/* Home Route: Displays the product catalog */}
            <Route path="/" element={
              <div className="container">
                <h1>Premium Collection</h1>
                {loading && <p className="status-message">Fetching latest products...</p>}
                {error && <p className="error-message">{error}</p>}
                <div className="product-grid">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                  ))}
                </div>
              </div>
            } />

            {/* Cart Route: Displays shopping cart details and management */}
            <Route path="/cart" element={
              <Cart 
                cartItems={cart} 
                onRemoveFromCart={removeFromCart} 
                onUpdateQuantity={updateQuantity} 
              />
            } />

            {/* Product Detail Route: Dynamic route for individual product views */}
            <Route path="/product/:id" element={
              <ProductDetail onAddToCart={addToCart} />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;