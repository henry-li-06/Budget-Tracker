import os

SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False
# SECRET_KEY = os.urandom(16)
# REFRESH_SECRET_KEY = os.urandom(16)
SECRET_KEY = 'asdfjkl;' #* USE FOR TESTING
REFRESH_SECRET_KEY = 'dood' #* USE FOR TESTING
# CORS_HEADERS = 'Content-Type'
APP_URL = 'http://127.0.0.1:3000'