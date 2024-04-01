from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import urllib3
import json
import base64

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
    
    print("[responseCode] " + str(response.status))
    print("[responBody]")
    print(str(response.data,"utf-8"))

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
    
    print("[responseCode] " + str(response.status))
    print("[responBody]")
    print(str(response.data,"utf-8"))

# proCorrect(script, audio_file_path)
# voiceRecognition(audio_file_path)