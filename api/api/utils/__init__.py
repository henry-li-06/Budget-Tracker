from functools import wraps
from flask import request
from api.models import User
import re

def validate_new_user(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        data = request.get_json()
        first_name = data['first_name']
        last_name = data['last_name']
        username = data['username']
        password = data['password']
        email = data['email']

        if(first_name == '' or last_name == ''):
            return { 'message' : 'First name and last names fields cannot be empty!'}

        user = User.query.filter_by(username = username).first()
        if(user):
            return { 
                'message' : 'Username already exists!',
                'invalidUsername' : True
            }

        email_regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        if(not re.fullmatch(email_regex, email)):
            return { 'message' : 'Invalid email address!' }

        password_regex = r'[A-Za-z0-9@#$%^&+=]{8,}'
        if(not re.match(password_regex, password)):
            return { 'message' : 'Password does not meet requirements!' }

        return f(data, *args, **kwargs)
    return decorator

