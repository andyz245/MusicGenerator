import json
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
##app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/upload', methods=['POST', 'OPTIONS'])
#@cross_origin()
def upload_recording():
    print(request.method)
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_prelight_response()
    new_recordings = []
    with open('recordings.ogg', 'r') as f:
        data = f.write(request.data)

@app.route('/')
@cross_origin()
def get_recording():
    with open('/recordings', 'r') as f:
        data = f.read()
        records = json.loads(data)
        return jsonify(records)
'''
@app.route('/')
def download_recording():'''

def _build_cors_prelight_response():
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    print(response)
    return response

app.run()

