import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar";

// Pages
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import AdminPanel from "./pages/Admin/AdminPanel";
import Login from "./pages/Login/Login";

// Services & Styles
import { getProducts } from "./services/api";
import "./App.scss";

/**
 * App Component
 * Global controller for state management and routing.
 */
function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cart State with LocalStorage Persistence
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shopping_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

  // Initial Data Fetch from Backend
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

  // Derived State: Categories
  const categories = products.length > 0 
    ? [...new Set(products.map(p => p.category))].filter(Boolean) 
    : [];

  // PROFESYONEL FILTRELEME MANTIGI (Search & Category)
  const filteredProducts = products.filter((product) => {
    // Category match check
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

    // Search match check (Handle Turkish characters and case sensitivity)
    const searchLower = searchTerm.toLocaleLowerCase('tr-TR');
    const productNameLower = (product.name || "").toLocaleLowerCase('tr-TR');
    const matchesSearch = productNameLower.includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  // Cart Management Functions
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
        {/* Navbar component with all necessary search and category props */}
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
              <Home 
                products={filteredProducts} 
                loading={loading} 
                error={error} 
                selectedCategory={selectedCategory}
                onAddToCart={addToCart}
              />
            } />
            <Route path="/cart" element={
              <Cart 
                cartItems={cart} 
                onRemoveFromCart={removeFromCart} 
                onUpdateQuantity={updateQuantity} 
              />
            } />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;