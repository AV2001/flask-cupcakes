from flask import Flask, jsonify
from models import db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['secret_key'] = 'secret'

db.init_app(app)


@app.route('/api/cupcakes')
def get_cupcakes():
    '''Returns all cupcakes.'''
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)
