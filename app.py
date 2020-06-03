import os
from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from datetime import timedelta


app = Flask(__name__)

bcrypt = Bcrypt(app)
app.config['SECRET_KEY'] = os.urandom(16) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

login_manager = LoginManager()
login_manager.init_app(app)
app.config['REMEMBER_COOKIE_DURATION'] = timedelta(minutes = 60)

# *** Classes for Database Tables ***
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    # name = db.Column(db.String, nullable = False)
    username = db.Column(db.String(15), nullable = False, unique = True)
    password = db.Column(db.String, nullable = False)
    # email = db.Column(db.String) #! probably should check if this is a valid email
    expenses = db.relationship('Expense', backref = 'user', lazy = False)

    def __repr__(self):
        return '<User %r>' % self.username


# Can change the name of this table 
# add more columns based on what we need to track
class Expense(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    price = db.Column(db.Integer) # A column that tracks the price
    description = db.Column(db.String)
    date = db.Column(db.DateTime, nullable = False)
    # category = db.Column() # The type of the expense
    # payment_frequency = db.Column()
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        pass


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# *** Following methods handle page routes ***
@app.route('/', methods = ['POST', 'GET'])
def index():
    if(request.method == 'POST'):
        if(request.form['request_type'] == 'create_account'):
            username = request.form['username']
            password = request.form['password']
            if(username != '' and password != ''):
                new_user = User(username = username, password = bcrypt.generate_password_hash(password))
                try:
                    db.session.add(new_user)
                    db.session.commit()
                    return redirect('/')
                except: 
                    return '<h1>This was an issue</h1>'
            else:
                return redirect('/')
        elif(request.form['request_type'] == 'login'):
            username = request.form['username']
            password = request.form['password']
            user = User.query.filter_by(username = username).first()
            hashed_password = user.password
            if(bcrypt.check_password_hash(hashed_password, password)):
                login_user(user, remember = True)
                return redirect('/')

    elif(current_user.is_authenticated):
        user_id = current_user.id
        user_expenses = Expense.query.filter_by(user_id = user_id).all()
        return render_template('index.html', expenses = user_expenses)
    else:
        users = User.query.all()
        if(users == []):
            return render_template('index.html')
        else:
            return render_template('index.html', users = users)

@app.route('/logout', methods = ['POST'])
@login_required
def logout():
    logout_user()
    return redirect('/')


if(__name__ == '__main__'):
     app.run(debug = True)
