from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enables Cross-Origin Resource Sharing for React frontend

# --- DATABASE CONFIGURATION ---
# Using SQLite for development. The database file will be 'ecommerce.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- OOP MODELS (Database Schema) ---

class Category(db.Model):
    """Represents a product category (e.g., Electronics, Books)"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    # Relationship: One category can have multiple products
    products = db.relationship('Product', backref='category', lazy=True)

class Product(db.Model):
    """Represents a single Product in the store"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)
    # Foreign Key: Connects product to a specific category
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)

# --- API ROUTES ---

@app.route('/')
def health_check():
    """Simple route to verify if the server is running"""
    return {"status": "success", "message": "Backend is running successfully!"}

@app.route('/api/products', methods=['GET'])
def get_products():
    """Fetches all products from the database and returns them as JSON"""
    products = Product.query.all()
    # Converting OOP objects into a list of dictionaries (JSON format)
    return jsonify([{
        "id": p.id,
        "name": p.name,
        "price": p.price,
        "category": p.category.name,
        "stock": p.stock
    } for p in products])

if __name__ == '__main__':
    with app.app_context():
        # This command creates the database file and tables based on the classes above
        db.create_all()
    app.run(debug=True, port=5000)