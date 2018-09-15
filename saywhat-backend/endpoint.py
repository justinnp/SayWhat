from flask import request, Flask
from speakerRecognition import SpeakerRecognition
import os
app = Flask(__name__)

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
        time.sleep(5)
        print(sr.getIdentification(processId))
        return "good"
    return "bad"
