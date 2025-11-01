"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, jsonify
from api.models import db, User
from api.utils import generate_sitemap, APIException, validate_email
from flask_cors import CORS
from flask_jwt_extended import create_access_token
import os
from base64 import b64encode
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route("/health-check", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy"}), 200


@api.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")
    last_name = data.get("last_name")

    if not email or not password or not name or not last_name:
        return jsonify({"error": "Missing fields"}), 400
    
    if not validate_email(email):
        return jsonify({"error": "Invalid email"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    salt = b64encode(os.urandom(32)).decode('utf-8')
    password = generate_password_hash(f"{password}{salt}")

    new_user = User(
        email=email,
        password=password,
        name=name,
        last_name=last_name,
        is_active=True,
        salt=salt
    )
    db.session.add(new_user)
    try:
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": "Failed to register user", "Error": f"{error.args}"}), 500
