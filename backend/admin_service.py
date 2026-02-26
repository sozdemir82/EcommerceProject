# File Location: /backend/admin_service.py
# Description: This service layer handles administrative operations and database logic.

from models import db, Product

class AdminService:
    """
    Administrative service class using static methods for product management.
    Separates the business logic from the API endpoints for better maintainability.
    """

    @staticmethod
    def add_new_product(data):
        """
        Validates and saves a new product entry to the database.
        :param data: Dictionary containing product details (from request body).
        :return: Response dictionary and HTTP status code.
        """
        try:
            # Create a new instance of the Product model using the provided data
            new_product = Product(
                name=data.get('name'),
                description=data.get('description'),
                price=data.get('price'),
                category=data.get('category'),
                image_url=data.get('image_url'),
                stock_quantity=data.get('stock_quantity', 0)
            )

            # Stage the new product and commit it to the database
            db.session.add(new_product)
            db.session.commit()
            
            return {"status": "success", "message": "Product successfully added."}, 201

        except Exception as e:
            # In case of an error, rollback the transaction to prevent data corruption
            db.session.rollback()
            return {"status": "error", "message": f"Server Error: {str(e)}"}, 500

    @staticmethod
    def delete_product(product_id):
        """
        Deletes a product from the database based on the provided ID.
        """
        try:
            # Query the database for the specific product
            product = Product.query.get(product_id)
            if not product:
                return {"status": "error", "message": "Product not found."}, 404

            # Remove the product and commit changes
            db.session.delete(product)
            db.session.commit()
            return {"status": "success", "message": "Product deleted successfully."}, 200

        except Exception as e:
            db.session.rollback()
            return {"status": "error", "message": str(e)}, 500