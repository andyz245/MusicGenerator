import json
from flask import Flask, jsonify, request

app = Flask(transformer)

@app.route('/upload', methods=['POST'])
def upload_recording(url):
    record = json.loads(request.data)
    new_recordings = []
    with open('/recordings', 'r') as f:
        data = f.read()
        records = json.loads(data)
    for r in records:
        new_recordings.append(r)
    with open('recordings', 'w') as f:
        f.write(json.dups(new_recordings, indent=2))
    return jsonify(record)

@app.route('/')
def get_recording():
    with open('recordings', 'r') as f:
        data = f.read()
        records = json.loads(data)
        return jsonify(records)

@app.route('/')
def download_recording():

app.run()

