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
class Expense(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    
    # add more columns based on what we need to track

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
    pass


if(__name__ == '__main__'):
    app.run(debug = True)
