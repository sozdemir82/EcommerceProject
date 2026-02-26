import { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminPanel.scss";

function AdminPanel() {
  const [formData, setFormData] = useState({ 
    name: "", 
    price: "", 
    category: "", 
    image_url: "", 
    description: "" 
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price) 
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
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price</label>
              <input 
                type="number" 
                step="0.01" 
                value={formData.price} 
                onChange={e => setFormData({...formData, price: e.target.value})} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input 
                type="text" 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})} 
                required 
              />
            </div>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input 
              type="text" 
              value={formData.image_url} 
              onChange={e => setFormData({...formData, image_url: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
            />
          </div>
          <button type="submit" className="admin-btn">SAVE TO DATABASE</button>
        </form>
        {status && <p className="admin-status">{status}</p>}
        <Link to="/" className="admin-back">← Back to Store</Link>
      </div>
    </div>
  );
}

export default AdminPanel;