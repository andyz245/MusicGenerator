import json
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
##app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/upload', methods=['POST'])
def upload_recording():
    print(request.files) 
    new_recordings = []
    with open('/recordings/recordings.ogg', 'wb') as f:
        data = f.write(request.data)
    return 'Hello'

@app.route('/')
@cross_origin()
def get_recording():
    with open('/recordings', 'r') as f:
        data = f.read()
        records = json.loads(data)
        return jsonify(records)
'''
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
  '''


if __name__ == '__main__':
    app.run()

