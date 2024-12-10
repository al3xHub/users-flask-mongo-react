from json import dumps
from flask import Flask, jsonify, Response, request
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from bson import json_util, ObjectId

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://127.0.0.1/usersmongoflaskreact'
mongo = PyMongo(app)

CORS(app)

db = mongo.db.users

@app.errorhandler(404)
def not_found(error=None):
    response = jsonify({
        'message': 'Resource Not Found At: ' + request.url,
        'status': 404
    })
    response.status_code = 404
    return response

@app.route("/users")
def get_users():
    users = mongo.db.users.find()
    user_list = [
        {
            "id": str(user["_id"]),
            "username": user["username"],
            "email": user["email"],
            "role": user["role"],
            "status": user["status"],
        }
        for user in users
    ]
    return dumps(user_list), 200, {'Content-Type': 'application/json'}

@app.route("/createuser", methods= ['POST'])
def create_user():
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']
    role = request.json['role']
    status = request.json['status']
    
    if username and email and password:
        hashed_password = generate_password_hash(password)
        id = mongo.db.users.insert_one(
            {"username": username, "password": hashed_password, "email": email, "role": role, "status": status}
        )
        response = {
            "id": str(id.inserted_id),
            "username": username,
            "password": hashed_password,
            "email": email,
            "role": role,
            "status": status
        }
        return response
    else:
        return not_found()
    
@app.route("/users/<id>", methods= ['GET'])
def get_user(id):
    user = mongo.db.users.find_one({'_id': ObjectId(id)})
    response = json_util.dumps(user)
    return Response(response, mimetype="application/json")

@app.route("/users/<id>", methods= ['DELETE'])
def delete_user(id):
    try:
        # Verifica si el ID es válido
        if not ObjectId.is_valid(id):
            return jsonify({'error': 'Invalid ID format'}), 400
        
        result = mongo.db.users.delete_one({'_id': ObjectId(id)})
        if result.deleted_count == 0:
            return jsonify({'error': 'User not found'}), 404
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/users/<id>", methods=['PUT'])
def update_user(id):
    username = request.json['username']
    email = request.json['email']
    role = request.json['role']
    status = request.json['status']
    
    if username and email:
        mongo.db.users.update_one({'_id': ObjectId(id)}, {'$set': {
            'username' :username,
            'email': email,
            'role': role,
            'status': status
        }})
        response = jsonify({'message': 'User' + id + 'was updated succesfully'})
        return response

if __name__ == "__main__":
    app.run(debug=True)
    
