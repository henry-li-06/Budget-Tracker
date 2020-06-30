from api import app, db, bcrypt
from .models import User, Expense, RefreshToken
from api.utils.auth import *
from api.utils import validate_new_user

from flask import make_response, request
from uuid import uuid4
from datetime import datetime, timedelta

# *** ENDPOINTS ***

@app.route('/user/new', methods = ['POST'])
@validate_new_user
def new_user(data):

    first_name = data['first_name']
    last_name = data['last_name']
    username = data['username']
    password = data['password']
    email = data['email']
    
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(first_name = first_name, last_name = last_name, username = username, \
        password = hashed_password, email = email, public_id = str(uuid4()))
    try:
        db.session.add(new_user)
        db.session.commit()
        return { 'message' : 'New user created!' }, 201
     except:
        return { 'message' : 'There was an issue creating a new user!' }

    


@app.route('/user/login', methods = ['POST'])
def login():
    auth = request.authorization

    if(auth and auth.username and auth.password):
        user = User.query.filter_by(username = auth.username).first()

        if(user and bcrypt.check_password_hash(user.password, auth.password)):

            access_token = generate_access_token(user.public_id)
            refresh_token = generate_refresh_token(user.public_id)

            if(not refresh_token):
                return { 'message' : 'There was an issue loggin in!' }, 401

            res = make_response({ 'message' : 'User successfully logged in!' })
            res.set_cookie('x-access-token', value = access_token, httponly = True, samesite = \
                None, expires = datetime.utcnow() + timedelta(minutes = 30))
            res.set_cookie('x-refresh-token', value = refresh_token, httponly = True, samesite = \
                None, expires = datetime.utcnow() + timedelta(weeks = 2), path = '/user/login/refresh')

            return res, 200
    
    return { 'message' : 'Invalid username or password!' }, 401


@app.route('/user/expenses/all', methods = ['GET'])
@token_required
def get_all_expenses(current_user):
    # return { 'cookies' : str(request.cookies) }
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
    data = request.get_json(force = True)
    # return { 'request' : str(data)}

    price = int(data['price'])
    description = data['description']
    date = datetime.strptime(data['date'], '%Y-%m-%d')
    user_id = current_user.id

    try:
        new_expense = Expense(price = price, description = description, date = date, \
            user_id = user_id)
        db.session.add(new_expense)
        db.session.commit()
        return { 'message' : 'New expense created!' }, 200
    except:
        return { 'message' : 'There was an issue creating a new expense!' }


@app.route('/user/login/refresh', methods = ['GET'])
def get_new_access_token():
    refresh_token = request.cookeis.get('x-refresh-token')
    if(refresh_token):
        user_public_id = verify_refresh_token(refresh_token)
        if(user_public_id):
            
            new_access_token = generate_access_token(user_public_id)
            res = make_response({ 'message' : 'New access token granted!' })
            res.set_cookie('x-access-token', value = new_access_token, httponly = True, expires = \
                    datetime.utcnow() + timedelta(minutes = 30), samesite = None)
            return res, 200
        else:
            return { 'message' : 'Refresh token is invalid!' }, 401
    
    return { 'message' : 'No refresh token found!' }, 401


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = app.config['APP_URL']
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Origin, Accept'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, DELETE'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response
