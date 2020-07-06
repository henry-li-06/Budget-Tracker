from api import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    username = db.Column(db.String(15), nullable = False, unique = True)
    password = db.Column(db.String, nullable = False)
    email = db.Column(db.String) 
    public_id = db.Column(db.String, nullable = False)
    budget_items = db.relationship('BudgetItem', backref = 'user', lazy = False)


class BudgetItem(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    price = db.Column(db.Integer) # A column that tracks the price
    title = db.Column(db.String)
    date = db.Column(db.DateTime, nullable = False)
    # category = db.Column() # The type of the expense
    # payment_frequency = db.Column()
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    category = db.Column(db.String, default = 'Other')

    categories = [
        'Subscriptions and Recurring Expenses',
        'Food and Dining',
        'Housing and Utilities',
        'Entertainment and Recreation',
        'Medical and Healthcare',
        'Other'
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
        'Subscriptions and Recurring Expenses',
        'Food and Dining',
        'Housing and Utilities',
        'Entertainment and Recreation',
        'Medical and Healthcare',
        'Other'
    ]

class BudgetItemCategory(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    budget_item_id = db.Column(db.Integer, db.ForeignKey('budget_item.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))



