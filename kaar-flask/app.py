import os
import pandas as pd
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from pred import forecast

ALLOWED_EXTENSIONS = set(['csv'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './uploads'
CORS(app)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def send_message(message, data = None):

    if data:

        return jsonify({'message': message, 'data': data})

    return jsonify({'message': message})


@app.route('/', methods=['GET', 'POST'])
def upload_file():

    if request.method == 'POST':

        file = request.files['file']

        filename = secure_filename(file.filename)

        if file and allowed_file(filename):

            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            data = handle_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            return send_message('File uploaded successfully', data=data)

        return send_message('File not allowed')

    return send_message('Send a file')


def handle_csv(file_name):

    df = pd.read_csv(file_name)

    df.reset_index(inplace=True)

    df.fillna(0, inplace=True)

    df.to_csv(file_name, index=False)

    print(file_name)

    forecast_data = forecast(
        file_name= file_name,
        time_col_name='date',
        steps=10
        )

    return forecast_data


if __name__ == '__main__':
    app.run(debug=True)
