#This will be the main Flask point for the backend.
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/post", methods=["POST"])
def postPicture():
    print(request.form)
    return "Yeet lmfao"