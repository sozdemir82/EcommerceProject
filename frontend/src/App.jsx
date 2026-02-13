import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import ProductCard from "./components/ProductCard/ProductCard";
import { getProducts } from "./services/api";
import "./App.scss"; // Updated to use SCSS

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch products from the backend API on component mount
   */
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Could not load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  return (
    <div className="App">
      <Navbar />
      
      <main className="container">
        <h1>Our Products</h1>

        {loading && <p className="status-message">Loading products...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                // We will add the addToCart prop here in the next step
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;