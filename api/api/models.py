from api import db
from os import path

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    username = db.Column(db.String(15), nullable = False, unique = True)
    password = db.Column(db.String, nullable = False)
    email = db.Column(db.String) 
    public_id = db.Column(db.String, nullable = False)
    budget_items = db.relationship('BudgetItem', backref = 'user', lazy = False)
    is_logged_in = db.Column(db.Boolean)


class BudgetItem(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    cost = db.Column(db.Integer) 
    name = db.Column(db.String)
    date = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    category = db.Column(db.String, default = 'Other')
    key = db.Column(db.String, nullable = False, unique = True)

    categories = [
        'subscriptions',
        'food',
        'housing',
        'entertainment',
        'medical',
        'other'
    ]

class RefreshToken(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_public_id = db.Column(db.String, nullable = False, unique = True)
    is_valid = db.Column(db.Boolean, default = True)
    expiration_date = db.Column(db.DateTime)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)

    categories = [
        'subscriptions',
        'food',
        'housing',
        'entertainment',
        'medical',
        'other'
    ]

class BudgetItemCategory(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    budget_item_id = db.Column(db.Integer, db.ForeignKey('budget_item.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))

db.create_all()



