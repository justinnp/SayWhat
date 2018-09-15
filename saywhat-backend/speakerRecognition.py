import http.client, urllib.request, urllib.parse, urllib.error, base64, os, json, time, subprocess
from pydub import AudioSegment

class SpeakerRecognition:

    def __init__(self):
        self.headers = {
            # Request headers
            'Ocp-Apim-Subscription-Key': 'a748195c68944ce888152720c092d5d9',
        }
        self.params = urllib.parse.urlencode({})
        self.url = 'westus.api.cognitive.microsoft.com'
        conn = http.client.HTTPSConnection('westus.api.cognitive.microsoft.com')

    def getIdentification(self, operationId):

        try:
            conn = http.client.HTTPSConnection(self.url)
            conn.request("GET", "/spid/v1.0/operations/"+operationId, "{body}", self.headers)
            response = conn.getresponse()
            json_obj = json.loads(response.read().decode('utf-8'))
            # print(json_obj)
            if (json_obj['status'] == 'succeeded'):
                return json_obj['processingResult']['identifiedProfileId']
            else:
                raise Exception
            conn.close()
        except Exception as e:
            print("[Errno {0}] {1}".format(e.errno, e.strerror))

    def identify(self, audioName, profiles, shortAudio=False):
        self.headers['Content-Type'] = 'application/octet-stream'
        params = urllib.parse.urlencode({
            # Request parameters
            'shortAudio': str(shortAudio),
        })

        string = ""
        for profile in profiles:
            string += profile+","

        string = string[:-1]
        body = self.toMono(audioName)

        try:
            conn = http.client.HTTPSConnection(self.url)
            conn.request("POST", "/spid/v1.0/identify?identificationProfileIds="+string+"&%s" % params,
            body, self.headers)
            response = conn.getresponse()
            conn.close()
            return response.getheader('Operation-Location').split("/").pop()
        except Exception as e:
            print("[Errno {0}] {1}".format(e.errno, e.strerror))

    def getAllProfile(self):
        result = []
        try:
            conn = http.client.HTTPSConnection(self.url)
            conn.request("GET", "/spid/v1.0/identificationProfiles?%s" % self.params, "{body}", self.headers)
            response = conn.getresponse()
            json_obj = json.loads(response.read().decode('utf-8'))
            # print(json_obj)
            conn.close()

            for profile in json_obj:
                result.append(profile["identificationProfileId"])

            return result

        except Exception as e:
            print("[Errno {0}] {1}".format(e.errno, e.strerror))

    def CreateProfile(self):
        self.headers['Content-Type'] = 'application/json'

        try:
            conn = http.client.HTTPSConnection(self.url)
            conn.request("POST", "/spid/v1.0/identificationProfiles?%s" % self.params, "{'locale':'en-us'}", self.headers)
            response = conn.getresponse()
            json_obj = json.loads(response.read().decode('utf-8'))
            print(json_obj)
            conn.close()
            return json_obj["identificationProfileId"]
        except Exception as e:
            print("[Errno {0}] {1}".format(e.errno, e.strerror))

    def Enroll(self, profileId, audioName, shortAudio=False):
        self.headers['Content-Type'] = 'multipart/form-data'
        params = urllib.parse.urlencode({
            # Request parameters
            'shortAudio': str(shortAudio),
        })

        body = self.toMono(audioName)
        try:
            conn = http.client.HTTPSConnection(self.url)
            conn.request("POST", "/spid/v1.0/identificationProfiles/"+profileId+"/enroll?%s" % params, body  , self.headers)
            response = conn.getresponse()
            print(response.status, response.reason)
            conn.close()
        except Exception as e:
            print("[Errno {0}] {1}".format(e.errno, e.strerror))

    def DeleteEnrollment(self, profileId):
        try:
            conn = http.client.HTTPSConnection(self.url)
            conn.request("DELETE", "/spid/v1.0/identificationProfiles/"+profileId+"?%s" % self.params, "{body}", self.headers)
            response = conn.getresponse()
            data = response.read()
            print(data)
            conn.close()
        except Exception as e:
            print("[Errno {0}] {1}".format(e.errno, e.strerror))


    def toMono(self, audioName):
        sound = AudioSegment.from_file(audioName, format="wav")

        if (sound.channels > 1):
            sound = sound.split_to_mono()[0]
        if (sound.frame_rate != 16000):
            sound = sound.set_frame_rate(16000)
        if (sound.frame_width != 2):
            sound = sound.set_sample_width(2)

        # more complex export
        file_handle = sound.export(audioName, format="wav")
        return open(os.path.join(os.path.dirname(__file__), audioName), "rb")

    def toWAV(self, audioName, outputName):
        command = "ffmpeg -y -i ./"+audioName+" -vn -acodec pcm_s16le -ac 2 -ar 16000 -vn "+outputName
        subprocess.call(command, shell=True)


sr = SpeakerRecognition()
# sr.toWAV("test.webm", "NavonOther.wav")
# sr.Enroll("bd3ea57b-e546-4c81-a64d-3e64b2dd4120", "Navon.wav")
# time.sleep(5)
# print(sr.getAllProfile())
processId = sr.identify("Navon_Justin.wav", sr.getAllProfile(), True)
time.sleep(5)
print(sr.getIdentification(processId))
# sr.DeleteEnrollment(sr.CreateProfile())
