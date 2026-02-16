from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for frontend communication
CORS(app)

# Standardized product data with clear category names
products = [
    {
        "id": 1,
        "name": "Wireless Headphones",
        "description": "Noise-canceling Bluetooth headphones",
        "price": 199.99,
        "category": "Electronics",
        "category_id": 1
    },
    {
        "id": 2,
        "name": "Smartphone X",
        "description": "6.7 inch OLED display, 128GB",
        "price": 999,
        "category": "Electronics",
        "category_id": 1
    },
    {
        "id": 3,
        "name": "Cotton T-Shirt",
        "description": "Organic cotton, slim fit",
        "price": 29.5,
        "category": "Clothing",
        "category_id": 2
    },
    {
        "id": 4,
        "name": "Modern Coffee Table",
        "description": "Minimalist wooden design",
        "price": 145,
        "category": "Furniture",
        "category_id": 3
    }
]

@app.route('/api/products', methods=['GET'])
def get_products():
    """
    Returns the list of products in JSON format.
    Standardizes the response for the frontend application.
    """
    return jsonify(products)

if __name__ == '__main__':
    # Run the Flask server on port 5000 with debug mode enabled
    app.run(debug=True, port=5000)