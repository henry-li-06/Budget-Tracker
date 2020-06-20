from api import app, db, bcrypt
from .models import User, Expense, RefreshToken

from flask import make_response, request
from functools import wraps
from uuid import uuid4
import jwt
from datetime import datetime, timedelta

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        access_token = request.cookies.get('x-access-token')
        if(access_token):
            try:
                data = jwt.decode(access_token. app.config['SECRET_KEY'])
                current_user = User.query.filter_by(public_id = data['public_id'])
            except:
                return { 'message' : 'Access token is invalid!' }, 401
        else:
            return { 'message' : 'Access token is missing!' }, 401
        
        return f(current_user, *args, **kwargs)
    return decorated

# *** ENDPOINTS ***

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
        user = User.query.filter_by(username = username).first()

        if(user and bcrypt.check_password_hash(user.password, auth.password)):

            access_token = jwt.encode({
                'public_id' : user.public_id,
                'exp' : datetime.utcnow() + timedelta(minutes = 30)
            }, app.config['SECRET_KEY'])

            refresh_token = jwt.encode({
                'public_id' : user.public_id,
                'exp' : datetime.utcnow() + timedelta(weeks = 2)
            }, app.config['REFRESH_SECRET_KEY'])

            res = make_response({ 'message' : 'User successfully logged in!' })
            res.set_cookie('x-access-token', value = access_token.decode('UTF-8'), httponly = True, samesite = \
                None, expires = datetime.utcnow() + timedelta(minutes = 30))
            res.set_cookie('x-refresh-token', value = refresh_token.decode('UTF-8'), httponly = True, samesite = \
                None, expires = datetime.utcnow() + timdelta(weeks = 2), path = '/user/login/refresh')

            db_refresh_token = RefreshToken.query.filter_by(user_public_id = user.public_id).first()
            if(db_refresh_token):
                db_refresh_token.is_valid = True
                db_refresh_token.expiration_date = datetime.utcnow() + timedelta(weeks = 2)
                db.session.commit()
            else:
                try:
                    db_refresh_token = RefreshToken(user_public_id = user.public_id, expiration_date = datetime.utcnow() \
                        + timedelta(weeks = 2))
                    db.session.add(db_refresh_token)
                    db.session.commit()
                except:
                    return { 'message' : 'There was an issue logging in!' }, 401

            return res
    
    return { 'message' : 'Invalid username or password!' }, 401


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


@app.route('/user/login/refresh', methods = ['GET'])
def get_new_access_token():
    refresh_token = request.cookies.get('x-refresh-token')
    if(refresh_token):
        try:
            data = jwt.decode(refresh_token, app.config['REFRESH_SECRET_KEY'])
            user_public_id = data['public_id']
            db_refresh_token = RefreshToken.query.filter_by(user_public_id = user_public_id).first()

            if(db_refresh_token and db_refresh_token.is_valid and db_refresh_token.expiration_date > datetime.utcnow()):
                new_access_token = jwt.encode({
                    'public_id' : user_public_id,
                    'exp' : datetime.utcnow() + timedelta(minutes = 30)
                }, app.config['SECRET_KEY'])
                res = make_response({ 'message' : 'New access token granted!' })
                res.set_cookie('x-access-token', value = new_access_token.decode('UTF-8'), httponly = True, expires = \
                    datetime.utcnow() + timedelta(minutes = 30), samesite = None)
                return res, 200
        except:
            pass

        return { 'message' : 'Invalid refresh token!' }, 401

    return { 'message' : 'Refresh token not found!' }, 401


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = app.config['APP_URL']
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Origin, Accept'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, DELETE'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


        