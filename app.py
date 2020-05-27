import os
from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask.ext.bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user


app = Flask(__name__)
#bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = os.urandom(16) 
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)

# *** Classes for Database Tables ***
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    username = db.Column(db.String(15), nullable = False, unique = True)
    password = db.Column(db.String, nullable = False)
    email = db.Column(db.String) #! probably should check if this is a valid email

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


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# *** Following methods handle page routes ***
@app.route('/')
def index():
    return render_template('index.html')

# @app.route('/', methods = ["POST"])
def add_user():
    """
    Method for adding a new user
    """
    # TODO: add the name of the form inputs
    if(request.method == 'POST'):
        username = request.form[____]
        password = bcrypt.generate_password_hash(request.form[____])
        name = request.form[____]
        email = request.form[_____]
        if(# Username doesn't exist): # TODO
            new_user = User(name = name, email = email, username = username, password = password)
            try:
                db.session.add(new_user)
                db.session.commit()
                return redirect() # TODO
            catch:
                return redirect() # TODO
    else:
        return redirect() # TODO


    # probably should check a lot of stuff in the frontend 
    # i think you're supposed to check in both places though
    pass

# TODO
# not really sure about this app route decorator
# @app.route('/<string:username>', methods = ["POST"])
def login(): # need to get username and password from HTML form 
    """
    Action for logging user in
    """
    if(request.method == 'POST'):
        username = request.form[____] # TODO: Add form input name
        passworld = request.form[___] # TODO: Add form input name
        user = Todo.query.filter_by(username=username)
        if(user != None):
            if(bcrypt.check_password_hash(user.password, password)):
                login_user(user)
                return redirect() # TODO
            else:
                return redirect() # TODO
    return redirect() # TODO

# @app.route('', method = ["POST"])
# @login_required
def logout():
    logout_user()
    return redirect() # TODO 


if(__name__ == '__main__'):
    app.run(debug = True)
