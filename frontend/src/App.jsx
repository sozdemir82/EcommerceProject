import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import ProductCard from "./components/ProductCard/ProductCard";
import { getProducts } from "./services/api";
import "./App.scss";

/**
 * Main Application Component
 * Manages products fetching and cart state globally.
 */
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // Cart items storage
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API on mount
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Could not load products. Check backend.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, []);

  /**
   * Adds a selected product to the cart state
   * @param {Object} product - The product to be added
   */
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="App">
      {/* Pass the dynamic cart length to Navbar */}
      <Navbar cartCount={cart.length} />
      
      <main className="container">
        <h1>Our Premium Products</h1>

        {loading && <p className="status-message">Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} // Correctly passing the function
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;