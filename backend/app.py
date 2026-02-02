from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # React'ın bağlanabilmesi için şart

# Veritabanı ayarı (Şimdilik SQLite kullanıyoruz, ileride kolayca PostgreSQL'e geçeriz)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- MODELLER ---

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    # Bir kategoride birden fazla ürün olabilir (İlişki)
    products = db.relationship('Product', backref='category', lazy=True)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)

# Veritabanını oluşturma komutu
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return {"message": "Backend Calisiyor!"}

if __name__ == '__main__':
    app.run(debug=True)