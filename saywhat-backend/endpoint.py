from flask import request, Flask
from time import sleep
from speakerRecognition import SpeakerRecognition
import os
#  Just in case if we get the CORs error in the client
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ["webm"]

@app.route('/register', methods=['POST',])
def register():
    data = dict(request.form)
    file = request.files.get('voice')
    if file.filename == '':
            flash('No selected file')
            return "bad"
    if file and allowed_file(file.filename):
        filename = file.filename
        file.save(os.path.join(os.path.dirname(__file__), filename))
        sr = SpeakerRecognition()
        name = filename.split(".")[0]
        sr.toWAV(filename, name + ".wav")
        sr.Enroll(sr.CreateProfile(), name + ".wav")
        sleep(5)
        return "good"
    return "bad"

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
