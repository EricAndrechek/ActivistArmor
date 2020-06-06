#This will be the main Flask point for the backend.
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import boto3

app = Flask(__name__)
CORS(app)

@app.route("/post", methods=["POST"])
def postPicture():
    if 'file' not in request.files:
        return jsonify({ "error": "No file specified" })
    media = request.files['file']
    #boto3 stuff
    s3 = boto3.resource('s3')
    bucket = s3.Bucket('protest-files')
    #datetime
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    #upload file
    bucket.upload_fileobj(media, request.form['location'])
    return "Yeet lmfao"