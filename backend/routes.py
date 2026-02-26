# File Location: /backend/routes.py
# Description: This file defines the API endpoints and connects them to the Service Layer.

from flask import Blueprint, request, jsonify
from admin_service import AdminService
from models import Product

# Create a Blueprint for admin-related API routes
admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/api/admin/products', methods=['POST'])
def create_product():
    """
    Handles POST requests to add a new product.
    Expected JSON: {name, description, price, category, image_url, stock_quantity}
    """
    data = request.get_json()
    
    # Ensuring data is present before processing
    if not data:
        return jsonify({"status": "error", "message": "No data provided"}), 400
        
    # Calling the AdminService to handle business logic
    response, status_code = AdminService.add_new_product(data)
    return jsonify(response), status_code

@admin_bp.route('/api/admin/products', methods=['GET'])
def list_products():
    """
    Handles GET requests to fetch all products for the management dashboard.
    Returns a list of products in JSON format.
    """
    try:
        # Querying all products from the database
        products = Product.query.all()
        # Converting each product object to a dictionary
        return jsonify([p.to_dict() for p in products]), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@admin_bp.route('/api/admin/products/<int:product_id>', methods=['DELETE'])
def remove_product(product_id):
    """
    Handles DELETE requests for a specific product based on its ID.
    """
    response, status_code = AdminService.delete_product(product_id)
    return jsonify(response), status_code