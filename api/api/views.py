from api import app, db, bcrypt
from .models import User, Expense

from flask import make_response, request
from functools import wraps
from uuid import uuid4
import jwt
from datetime import datetime, timedelta

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if('x-access-token' in request.headers):
            token = request.headers['x-access-token']

            try:
                data = jwt.decode(token, app.config['SECRET_KEY'])
                current_user = User.query.filter_by(public_id = data['public_id'])
            except:
                return { 'message' : 'Token is invalid!' }
        else:
            return { 'message' : 'Token is missing!' }
        return f(current_user, *args, **kwargs)

    return decorated

@app.route('/user/new', methods = ['POST'])
def new_user():
    data = request.get_json()

    first_name = data['first_name']
    last_name = data['last_name']
    username = data['username']
    password = data['password']
    email = data['email']
    
    if(True): # TODO: Check for valid login information
        hashed_password = bcrypt.generate_hashed_password(password)
        new_user = User(first_name = first_name, last_name = last_name, username = username, \
            password = hashed_password, email = email, public_id = str(uuid4()))
        try:
            db.session.add(new_user)
            db.session.commit()
            return { 'message' : 'New user created!' }, 201
        except:
            pass
    
    return { 'message' : 'There was an issue creating a new user!' }


@app.route('/user/login', methods = ['POST'])
def login():
    auth = request.authorization

    if(auth and auth.username and auth.password):
        user = User.query.filter_by(username = auth.username).first()
        
        if(user and bcrypt.check_password_hash(user.password, auth.password)):
            token = jwt.encode({
                'public_id' : user.public_id,
                'exp' : datetime.utcnow() + timedelta(minutes = 30)
            }, app.config['SECRET_KEY'])
            return { 'token' : token.decode('UTF-8') }, 200

        return { 'message' : 'Unable to verify credentials!' }
    
    return { 'message' : 'Invalid username and password!' }


@app.route('/user/expenses/all', methods = ['GET'])
@token_required
def get_all_expenses(current_user):
    expense_list = Expense.query.filter_by(user_id = current_user.id).all()
    expenses = []

    for expense in expense_list:
        expense_info = {
            'description' : expense.description,
            'price' : expense.price,
            'date' : expense.date, #! have to make sure this is a datetime
            'user_id' : expense.user_id
        }
        expenses.append(expense_info)
    return { 'expenses' : expenses }


@app.route('/user/expenses/new', methods = ['POST'])
@token_required
def new_expense(current_user):
    data = request.get_json()

    price = data['price']
    description = data['description']
    date = data['date']
    user_id = current_user.id

    try:
        new_expense = Expense(price = price, description = description, date = date, \
            user_id = user_id)
        db.session.add(new_expense)
        db.session.commit()
        return { 'message' : 'New expense created!' }, 200
    except:
        return { 'message' : 'There was an issue creating a new expense!' }
        


