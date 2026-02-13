import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProductCard from "./components/ProductCard/ProductCard";
import Cart from "./components/Cart/Cart";
import { getProducts } from "./services/api";
import "./App.scss";

/**
 * Main Application with Routing
 * Handles global state for products and shopping cart.
 */
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load products from backend
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, []);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove item from cart by its index
  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Router>
      <div className="App">
        {/* Pass cart size to Navbar */}
        <Navbar cartCount={cart.length} />
        
        <main className="container">
          <Routes>
            {/* Home Route: Shows Product Grid */}
            <Route path="/" element={
              <>
                <h1>Premium Collection</h1>
                {loading && <p className="status-message">Loading...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && (
                  <div className="product-grid">
                    {products.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={addToCart} 
                      />
                    ))}
                  </div>
                )}
              </>
            } />

            {/* Cart Route: Shows Cart Details */}
            <Route path="/cart" element={
              <Cart cartItems={cart} onRemoveFromCart={removeFromCart} />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;