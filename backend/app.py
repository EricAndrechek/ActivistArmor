#This will be the main Flask point for the backend.
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
from violence import handleViolence
import boto3

app = Flask(__name__)
CORS(app)

@app.route("/post", methods=["POST"])
def postPicture():
    if 'file' not in request.files:
        return jsonify({ "error": "No file specified" })
    media = request.files['file']
    #check for violence
    print(handleViolence(media, request.form['location']))
    return "yeet lmfao"
    