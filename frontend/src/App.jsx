import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProductCard from "./components/ProductCard/ProductCard";
import Cart from "./components/Cart/Cart";
import { getProducts } from "./services/api";
import "./App.scss";

/**
 * Main Application Component
 * Manages global state with LocalStorage persistence.
 */
function App() {
  const [products, setProducts] = useState([]);
  
  // Initialize cart from LocalStorage if available, otherwise empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shopping_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Sync cart state with LocalStorage whenever it changes
   */
  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Fetch products on component mount
   */
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

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Router>
      <div className="App">
        <Navbar cartCount={cart.length} />
        
        <main className="container">
          <Routes>
            <Route path="/" element={
              <>
                <h1>Premium Collection</h1>
                {loading && <p className="status-message">Loading products...</p>}
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