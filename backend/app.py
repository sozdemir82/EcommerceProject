# File Location: /backend/app.py
# FIX: Standardized routes to ensure Frontend can find the API.

from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Product
from routes import admin_bp

def create_app():
    app = Flask(__name__)
    
    # Enable CORS so React (port 3000) can talk to Flask (port 5000)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Database Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize Database
    db.init_app(app)

    # Register Admin Blueprint
    app.register_blueprint(admin_bp)

    # --- MAIN SEARCH ROUTE (The one React is looking for) ---
    @app.route('/api/products', methods=['GET'])
    def get_products():
        """
        Main endpoint for the storefront. 
        Supports category filtering and returns all products by default.
        """
        try:
            category_query = request.args.get('category', '').strip()
            
            if category_query:
                # Filter by category if query exists
                products = Product.query.filter(Product.category.ilike(f"%{category_query}%")).all()
            else:
                # Return all products if no category is specified
                products = Product.query.all()
                
            return jsonify([p.to_dict() for p in products]), 200
            
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    # Database synchronization
    with app.app_context():
        db.create_all()
        print(">> Database Tables Ready.")

    return app

if __name__ == '__main__':
    app = create_app()
    # Explicitly setting host and port to avoid 'Not Found' errors
    app.run(debug=True, host='127.0.0.1', port=5000)