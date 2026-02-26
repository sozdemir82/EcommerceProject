import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProductCard from "./components/ProductCard/ProductCard";
import Cart from "./components/Cart/Cart";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { getProducts } from "./services/api";
import "./App.scss";

/**
 * App Component
 * Global controller for state management. 
 */
function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shopping_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

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

  const categories = products.length > 0 
    ? [...new Set(products.map(p => p.category))].filter(Boolean) 
    : [];

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
                    !loading && <div className="no-results"><p>No products found.</p></div>
                  )}
                </div>
              </div>
            } />
            <Route path="/cart" element={<Cart cartItems={cart} onRemoveFromCart={removeFromCart} onUpdateQuantity={updateQuantity} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
            {/* Backend integration for routes.py */}
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

/**
 * AdminPanel Component
 * Connects to Flask routes.py endpoints.
 */
function AdminPanel() {
  const [formData, setFormData] = useState({ name: "", price: "", category: "", image_url: "", description: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price) // Ensure Float for models.py
        }),
      });
      if (response.ok) {
        setStatus("Product successfully added to Database.");
        setFormData({ name: "", price: "", category: "", image_url: "", description: "" });
      } else {
        setStatus("Backend error occurred.");
      }
    } catch (err) {
      setStatus("Connection failed. Is Flask running?");
    }
  };

  return (
    <div className="container admin-container">
      <div className="admin-box">
        <h2>Backend Inventory Manager</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price</label>
              <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
            </div>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <button type="submit" className="admin-btn">SAVE TO DATABASE</button>
        </form>
        {status && <p className="admin-status">{status}</p>}
        <Link to="/" className="admin-back">← Back to Store</Link>
      </div>
    </div>
  );
}

export default App;