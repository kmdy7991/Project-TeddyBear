from fastapi.responses import JSONResponse
from urllib3.exceptions import ReadTimeoutError
import shutil
import urllib3
import json
import base64

# app = FastAPI()  # FastAPI 애플리케이션 인스턴스 생성

# 발음 평가를 위한 함수
def proCorrect(script, audioFilePath):
    openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation" # 영어
   
    accessKey = "b609e027-dd10-4050-8f5d-6a9b27675a82"
    audioFilePath = audioFilePath
    languageCode = "english"
    script = "I'll make a reservation for a shuttle bus at two in the afternoon"
    
    file = open(audioFilePath, "rb")
    audioContents = base64.b64encode(file.read()).decode("utf8")
    
    # print(audioContents)
    
    file.close()
    
    requestJson = {   
        "argument": {
            "language_code": languageCode,
            "script": script,
            "audio": audioContents 
        }
    }
    
    http = urllib3.PoolManager()
    response = http.request(
        "POST",
        openApiURL,
        headers={"Content-Type": "application/json; charset=UTF-8","Authorization": accessKey},
        body=json.dumps(requestJson)
    )
    
    # 디코딩된 데이터를 JSON으로 파싱
    data = json.loads(str(response.data,"utf-8"))
    
    
    recog_text = data['return_object']['score']
    
    print(recog_text)

def voiceRecognition(audioFilePath):
    openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Recognition"
    accessKey = "b609e027-dd10-4050-8f5d-6a9b27675a82"
    audioFilePath = audioFilePath
    languageCode = "english"
    
    file = open(audioFilePath, "rb")
    audioContents = base64.b64encode(file.read()).decode("utf8")
    file.close()
    
    requestJson = {    
        "argument": {
            "language_code": languageCode,
            "audio": audioContents
        }
    }
    
    http = urllib3.PoolManager()
    response = http.request(
        "POST",
        openApiURL,
        headers={"Content-Type": "application/json; charset=UTF-8","Authorization": accessKey},
        body=json.dumps(requestJson)
    )
    
    # 디코딩된 데이터를 JSON으로 파싱
    data = json.loads(str(response.data,"utf-8"))

    # 'recognized' 값을 추출
    recognized_text = data['return_object']['recognized']
    
    print(recognized_text)
    
    return recognized_text

# audio_file_path =  "./voice-api/audio/p_sample.pcm"
# text = "I can also read and write Korean"

# proCorrect(text, audio_file_path)
# voiceRecognition(audio_file_path)