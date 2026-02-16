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
 * Global controller for state management. 
 * Handles dual-filtering (Search + Category) based on backend data.
 */
function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Initialize cart from LocalStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shopping_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Effect: Persist cart changes to LocalStorage
   */
  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Effect: Fetch product catalog from the backend API
   */
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load products. Please check your backend.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, []);

  /**
   * Logic: Extract unique categories directly from product data.
   * This ensures the UI updates automatically when backend categories change.
   */
  const categories = products.length > 0 
    ? [...new Set(products.map(p => p.category))].filter(Boolean) 
    : [];

  /**
   * Logic: Filter products based on search term and selected category.
   */
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

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
        <Navbar 
          cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <main>
          <Routes>
            <Route path="/" element={
              <div className="container">
                <h1>{selectedCategory === "All" ? "Premium Collection" : selectedCategory}</h1>
                
                {loading && <p className="status-message">Loading products...</p>}
                {error && <p className="error-message">{error}</p>}
                
                <div className="product-grid">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                    ))
                  ) : (
                    !loading && (
                      <div className="no-results">
                        <p>No products found matching your criteria.</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            } />
            <Route path="/cart" element={
              <Cart cartItems={cart} onRemoveFromCart={removeFromCart} onUpdateQuantity={updateQuantity} />
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