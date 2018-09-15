from google.cloud import speech_v1p1beta1 as speech


class SpeakerDiarization:
    def __init__(self):
        self.headers = None
        self.url = None


    def speechDiarization(self, audioName):
        audio_file = open(os.path.join(os.path.dirname(__file__), audioName), "rb")
        audio = speech.types.RecognitionAudio(content=audio_file)

        config = speech.types.RecognitionConfig(
            encoding=speech.enums.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=16000,
            language_code='en-US',
            enable_speaker_diarization=True,
            diarization_speaker_count=2)

        print('Waiting for operation to complete...')
        response = client.recognize(config, audio)
