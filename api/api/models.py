from api import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    username = db.Column(db.String(15), nullable = False, unique = True)
    password = db.Column(db.String, nullable = False)
    email = db.Column(db.String) 
    public_id = db.Column(db.String, nullable = False)
    expenses = db.relationship('Expense', backref = 'user', lazy = False)


class Expense(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    price = db.Column(db.Integer) # A column that tracks the price
    description = db.Column(db.String)
    date = db.Column(db.DateTime, nullable = False)
    # category = db.Column() # The type of the expense
    # payment_frequency = db.Column()
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class RefreshToken(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_public_id = db.Column(db.String, nullable = False, unique = True)
    is_valid = db.Column(db.Boolean, default = True)
    expiration_date = db.Column(db.DateTime)
