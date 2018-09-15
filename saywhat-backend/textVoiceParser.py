from speakerRecognition import SpeakerRecognition

class TextVoiceParser:

    def __init__(self, dialogues, audioName):
        self.personDialogue = {}
        self.mapFinal = {}
        for dialogue in dialogues:
            self.personDialogue[dialogue[0].speaker_tag] = dialogue

    def recognizeSpeakers(self):
        for  speaker_tag in personDialogue:
            splitAudio(speaker_tag)

    def splitAudio(self, number):
        audio = AudioSegment.from_file(self.audioName, format="wav")
        personAudio = []

        # How much seconds should I add per word at the end? Adding a second for now
        for dialogue in self.personDialogue[number]:
            if (len(personAudio) >= 30):
                break
            personAudio += audio[self.gitMilli(dialogue.start), self.gitMilli(dialogue.start)+1000]

        file_handle = personAudio.export(str(number)+audioName, format="wav")
        self.recognition(str(number)+audioName, number)

    def recognition(self, personVoice, number):
        sr = SpeakerRecognition()
        operationid = sr.identify(personVoice)
        sleep(5)
        self.mapFinal[number] = sr.getIdentification(operationid)

    # Needs to be implemented
    def gitMilli(self, nanoSeconds):
        return nanoSeconds//1000000
