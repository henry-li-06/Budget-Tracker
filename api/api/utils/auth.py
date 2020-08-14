import jwt
from datetime import datetime, timedelta
from functools import wraps
from api import app, db
from api.models import RefreshToken, User
from flask import request


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        access_token = request.cookies.get('x-access-token')
        if(access_token):
            user_public_id = verify_access_token(access_token)
            if(user_public_id):
                current_user = User.query.filter_by(public_id = user_public_id).first()
                if(not current_user.is_logged_in) :
                    return { 'message' : 'User is logged out!' }, 401
            else:
                return { 'message' : 'Access token is invalid!' }, 401
        else:
            return { 'message' : 'Access token is missing!' }, 401

        return f(current_user, *args, **kwargs)

    return decorated
    

def refresh_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        refresh_token = request.cookies.get('x-refresh-token')
        if(refresh_token):
            user_public_id = verify_refresh_token(refresh_token)
            if(user_public_id):
                current_user = User.query.filter_by(public_id = user_public_id).first()
            else:
                return { 
                    'message' : 'Some message',
                    'isLoggedIn' : False
                }, 401 # FIXME
        else:
            return {
                'message' : 'Some message',
                'isLoggedIn' : False
            }, 401 # FIXME
        
        return f(current_user, *args, **kwargs)
    
    return decorated


def generate_access_token(user_public_id):
    access_token = jwt.encode({
        'public_id' : user_public_id,
        'exp' : datetime.utcnow() + timedelta(minutes = app.config['ACCESS_TOKEN_DURATION'])
    }, app.config['SECRET_KEY'])

    return access_token.decode('UTF-8')


def generate_refresh_token(user_public_id):
    refresh_token = jwt.encode({
        'public_id' : user_public_id,
        'exp' : datetime.utcnow() + timedelta(weeks = app.config['REFRESH_TOKEN_DURATION'])
    }, app.config['REFRESH_SECRET_KEY'])

    refresh_token_db = RefreshToken.query.filter_by(user_public_id = user_public_id).first()

    if(refresh_token_db):
        refresh_token_db.expiration_date = datetime.utcnow() + timedelta(weeks = 2)
        refresh_token_db.is_valid = True
        db.session.commit()
    else:
        try:
            new_refresh_token = RefreshToken(user_public_id = user_public_id, expiration_date = \
                datetime.utcnow() + timedelta(weeks = app.config['REFRESH_TOKEN_DURATION']))
            db.session.add(new_refresh_token)
            db.session.commit()
        except:
            return None

    return refresh_token.decode('UTF-8')


def verify_access_token(token):
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'])
        return data['public_id']
    except:
        return None


def verify_refresh_token(token):
    try:
        data = jwt.decode(token, app.config['REFRESH_SECRET_KEY'])
        user_public_id = data['public_id']
        db_refresh_token = RefreshToken.query.filter_by(user_public_id = user_public_id).first()

        if(db_refresh_token and db_refresh_token.is_valid and \
            db_refresh_token.expiration_date > datetime.utcnow()):
            return user_public_id
    except:
        pass
    return None
