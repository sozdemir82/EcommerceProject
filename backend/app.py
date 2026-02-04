from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React frontend

# Database Configuration (SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- MODELS (OOP Structure with SQLAlchemy) ---

class Category(db.Model):
    """Category model to organize products like Electronics, Fashion, etc."""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    products = db.relationship('Product', backref='category', lazy=True)

    def to_dict(self):
        """Convert Category object to dictionary for JSON responses"""
        return {"id": self.id, "name": self.name}

class Product(db.Model):
    """Product model representing individual items in the store"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)

    def to_dict(self):
        """Convert Product object to dictionary for JSON responses"""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "category_id": self.category_id
        }

# --- DATABASE SEEDING (Initial Data Setup) ---

def seed_database():
    """Seeds the database with initial categories and products if it's empty"""
    if Category.query.first() is None:
        print("Seeding database with sample data...")
        
        # 1. Create Categories
        electronics = Category(name="Electronics")
        fashion = Category(name="Fashion")
        home = Category(name="Home & Garden")
        
        db.session.add_all([electronics, fashion, home])
        db.session.commit() # Commit to generate IDs for relationships

        # 2. Create Sample Products
        sample_products = [
            Product(name="Wireless Headphones", description="Noise-canceling Bluetooth headphones", price=199.99, category_id=electronics.id),
            Product(name="Smartphone X", description="6.7 inch OLED display, 128GB", price=999.00, category_id=electronics.id),
            Product(name="Cotton T-Shirt", description="Organic cotton, slim fit", price=29.50, category_id=fashion.id),
            Product(name="Modern Coffee Table", description="Minimalist wooden design", price=145.00, category_id=home.id)
        ]
        
        db.session.add_all(sample_products)
        db.session.commit()
        print("Database seeded successfully!")

# --- ROUTES (RESTful API Endpoints) ---

@app.route('/')
def home():
    """Health check endpoint to ensure backend is running"""
    return jsonify({"message": "Backend is running successfully!", "status": "success"})

@app.route('/products', methods=['GET'])
def get_products():
    """Retrieve all products from the database"""
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products])

@app.route('/categories', methods=['GET'])
def get_categories():
    """Retrieve all categories from the database"""
    categories = Category.query.all()
    return jsonify([c.to_dict() for c in categories])

# --- SERVER STARTUP ---

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Initialize database tables
        seed_database()  # Populate with initial data if needed
    app.run(debug=True, port=5000)