from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask.ext.bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(15), nullable = False)
    password = db.Column(db.String, nullable = False)

    def __repr__(self):
        return '<User %r>' % self.username

# Can change the name of this table 
# add more columns based on what we need to track
class Expense(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    price = db.Column() # A column that tracks the price
    category = db.Column() # The type of the expense
    # payment_frequency = db.Column()
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))

    def __repr__(self):
        pass


@app.route('/')
def index():
    return render_template('index.html')

# @app.route('/', methods = ["POST"])
def add_user():
    """
    Method for adding a new user
    """
    # probably should check a lot of stuff in the frontend 
    # i think you're supposed to check in both places though
    pass

# TODO
# not really sure about this app route decorator
# @app.route('/<string:username>', methods = ["POST"])
def login(): # need to get username and password from HTML form 
    """
    Method for logining in user
    """

    # find the record in Users table that matches the username
        # if the record is empty then display an error
    # check that the password matches the hashed password 
        # if matches redirect to dashboard
        # else redirect to login page again 
    
    # redirects user to their dashboard page
    # redirect('') 
    pass
    


if(__name__ == '__main__'):
    app.run(debug = True)
