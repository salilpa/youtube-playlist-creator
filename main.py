from flask import Flask, render_template
from flask_bootstrap import Bootstrap


app = Flask(__name__)
Bootstrap(app)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/station/<string:name>')
def station_details(name):
    return render_template("index.html")