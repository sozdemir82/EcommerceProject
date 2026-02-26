# File Location: /backend/models.py
# Description: Defines the database schema using SQLAlchemy ORM with an OOP approach.

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialize the SQLAlchemy instance to be used across the application
db = SQLAlchemy()

class Product(db.Model):
    """
    Product model representing the items available in the e-commerce store.
    Follows professional industry standards for structured data.
    """
    __tablename__ = 'products'

    # Primary key: Unique identifier for each product
    id = db.Column(db.Integer, primary_key=True)
    
    # Core product details
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    
    # Image handling (stores the URL of the product image)
    image_url = db.Column(db.String(255), nullable=True)
    
    # Inventory management
    stock_quantity = db.Column(db.Integer, default=0)
    
    # Audit trail: Automatically stores the creation timestamp
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        """
        Converts the database object into a dictionary format.
        Essential for sending clean JSON data to the React frontend.
        """
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "category": self.category,
            "image_url": self.image_url,
            "stock_quantity": self.stock_quantity,
            "created_at": self.created_at.isoformat()
        }