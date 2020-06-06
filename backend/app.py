#This will be the main Flask point for the backend.
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
from violence import handleViolenceVideo, handleViolenceImage
import boto3

app = Flask(__name__)
CORS(app)

@app.route("/post", methods=["POST"])
def postPicture():
    if 'file' not in request.files:
        return jsonify({ "error": "No file specified" })
    media = request.files['file']
    print(media.content_type)
    #check for violence
    if 'video' in media.content_type:
        if handleViolenceVideo(media, request.form['name']):
            uploadToOcean(media, request.form['name'])
    elif 'image' in media.content_type:
        content = media.read()
        if handleViolenceImage(content, request.form['name']):
            uploadToOcean(media, request.form['name'])
    return "yeet lmfao"
    
def uploadToOcean(file, name):
    print("Eric do ur shit")