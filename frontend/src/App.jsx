import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProductCard from "./components/ProductCard/ProductCard";
import Cart from "./components/Cart/Cart";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { getProducts } from "./services/api";
import "./App.scss";

function App() {
  const [products, setProducts] = useState([]);
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
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, []);

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
        <Navbar cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} />
        <main>
          <Routes>
            <Route path="/" element={
              <div className="container">
                <h1>Premium Collection</h1>
                {loading && <p className="status-message">Loading...</p>}
                {error && <p className="error-message">{error}</p>}
                <div className="product-grid">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                  ))}
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