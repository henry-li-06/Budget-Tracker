from flask import Flask, render_template

app = Flask(__name__, template_folder = "Templates")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/mdg')
def mdg():
    return render_template('mdg.html')


if(__name__ == '__main__'):
    app.run(debug = True)
