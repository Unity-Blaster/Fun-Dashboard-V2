from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
# from flask_socketio import SocketIO, emit
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Hii ;P'
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

class Clients(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	content = db.Column(db.String(64), nullable=False)
	deleted = db.Column(db.Integer, default=0)
	date_created = db.Column(db.DateTime, default=datetime.utcnow)
	
	def __repr__(self):
		return '<Client %r>' % self.id


@app.route('/')
def index():
	return render_template('index.html')


if __name__ == '__main__':
	app.run()

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)