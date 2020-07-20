from api import app, db, bcrypt
from .models import User, BudgetItem, RefreshToken # , Category
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
    public_id = str(uuid4())
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(first_name = first_name, last_name = last_name, username = username, \
        password = hashed_password, email = email, public_id = public_id)
    try:
        db.session.add(new_user)
        db.session.commit()

        access_token = generate_access_token(public_id)
        refresh_token = generate_refresh_token(public_id)

        res = make_response({ 'message' : 'New user created!' })
        res.set_cookie('x-access-token', value = access_token, httponly = True, samesite = \
            None, expires = datetime.utcnow() + timedelta(minutes = 30))
        res.set_cookie('x-refresh-token', value = refresh_token, httponly = True, samesite = \
            None, expires = datetime.utcnow() + timedelta(weeks = 2), path = '/user/login/refresh')
        return res, 201
    except:
        return { 'message' : 'There was an issue creating a new user!' }, 400

    
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


@app.route('/user/budget/all', methods = ['GET'])
@token_required
def get_all_budget_items(current_user):

    budget_item_list = BudgetItem.query.filter_by(user_id = current_user.id).all()
    budget_items = []

    for budget_item in budget_item_list:
        budget_item_info = {
            'name' : budget_item.name,
            'cost' : budget_item.cost,
            'key' : datetime.timestamp(budget_item.date), 
            'category' : budget_item.category,
            'id' : budget_item.id
        }
        budget_items.append(budget_item_info)

    return { 'budget_items' : budget_items }


@app.route('/user/budget/new', methods = ['POST'])
@token_required
def new_budget_item(current_user):
    data = request.get_json(force = True)

    cost = int(data['cost'])
    name = data['name']
    category = data['category'] 
    date = datetime.fromtimestamp(data['date'] / 1000)
    user_id = current_user.id

    if(not category in BudgetItem.categories):
        return { 'message' : 'Invalid category!' }

    try:
        new_budget_item = BudgetItem(cost = cost, name = name, category = category, \
            user_id = user_id, date = date)
        db.session.add(new_budget_item)
        db.session.commit()
        return { 'message' : 'New budget item created!' }, 201
    except:
        return { 'message' : 'There was an issue creating a new budget item!' }


@app.route('/user/budget/delete', methods = ['DELETE'])
@token_required
def delete_budget_item(current_user):
    data = request.get_json()

    date = int(float(data['key']))
    try:
        budget_item = Budget_Item.query.filter_by(date = datetime.fromtimestamp(date / 1000)).first()
        return { 'bruh' : 'bruh' }, 500
        if(budget_item):
            db.session.delete(budget_item)
            db.session.commit()
            return { 'message' : 'Successfully deleted budget item!' }, 200
    except:
        pass

    return { 'message' : 'There was an issue deleting the budget item' }, 400


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
