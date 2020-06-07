#This will be the main Flask point for the backend.
from flask import Flask, jsonify, request
from flask_cors import CORS
import glue
import os
import uuid
from werkzeug.utils import secure_filename
import mongo

app = Flask(__name__)
CORS(app)

@app.route("/post", methods=["POST"])
def postPicture():
    if 'file' not in request.files:
        return jsonify({ "error": "No file specified" })
    location = request.form.get('location')
    media = request.files['file']
    ending = secure_filename(media.filename).split('.')[1]
    filename = "{}.{}".format(str(uuid.uuid4()), ending)
    fullname = os.path.join(os.path.join(os.getcwd(), 'content'), filename)
    media.save(fullname)
    glue.lf(filename, location)
    return "Content receive"

@app.route("/api/<id>")
def api(id):
    if id == "feed":
        return jsonify(str(mongo.feed()))
    elif id == "map":
        return jsonify(str(mongo.map()))


if __name__ == '__main__':
    app.run(debug = True)
