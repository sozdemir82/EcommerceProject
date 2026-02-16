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
 * The central controller of the application managing products, cart, and search filtering.
 */
function App() {
  // Global product list from backend
  const [products, setProducts] = useState([]);
  
  // Search term state to filter products globally
  const [searchTerm, setSearchTerm] = useState("");

  // Cart state with lazy initialization from LocalStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shopping_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // UI status states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Effect: Persist cart to LocalStorage on every cart update
   */
  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Effect: Fetch product catalog from API on mount
   */
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load products. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, []);

  /**
   * Logic: Filter products based on the search term provided via Navbar
   */
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Function: Add a product to the cart or increment quantity if it exists
   * @param {Object} product - Product to be added
   */
  const addToCart = (product) => {
    setCart((prevCart) => {
      const isItemInCart = prevCart.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  /**
   * Function: Remove an item completely from the cart
   * @param {number} productId 
   */
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  /**
   * Function: Update item quantity within the cart (min value: 1)
   * @param {number} productId 
   * @param {number} amount 
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
        {/* Pass search state and setter to Navbar */}
        <Navbar 
          cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <main>
          <Routes>
            <Route path="/" element={
              <div className="container">
                <h1>Premium Collection</h1>
                
                {loading && <p className="status-message">Loading products...</p>}
                {error && <p className="error-message">{error}</p>}
                
                {/* Product display logic with search results check */}
                <div className="product-grid">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                    ))
                  ) : (
                    !loading && (
                      <div className="no-results">
                        <p>No products found matching "<strong>{searchTerm}</strong>"</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            } />
            
            <Route path="/cart" element={
              <Cart 
                cartItems={cart} 
                onRemoveFromCart={removeFromCart} 
                onUpdateQuantity={updateQuantity} 
              />
            } />
            
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