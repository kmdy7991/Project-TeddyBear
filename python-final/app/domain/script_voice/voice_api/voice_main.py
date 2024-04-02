from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import urllib3
import json
import base64
from google.cloud import texttospeech
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from fastapi import APIRouter

voice_router = APIRouter()

# 발음 평가를 위한 함수
def proCorrect(myScript, audioFilePath):
    print(111)
    openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation" # 영어
   
    accessKey = "b609e027-dd10-4050-8f5d-6a9b27675a82"
    audioFilePath = audioFilePath
    languageCode = "english"
    script = myScript
    
    file = open(audioFilePath, "rb")
    audioContents = base64.b64encode(file.read()).decode("utf8")
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

# 음성 인식을 위한 함수
def voiceRecognition(audioFilePath):
    print(111)
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
                                     

    # HTTP 요청 전송
    http = urllib3.PoolManager()
    response = http.request("POST", openApiURL, headers={"Content-Type": "application/json; charset=UTF-8"}, body=json.dumps(requestJson))
    
    # 응답 처리
    result = json.loads(response.data.decode('utf-8'))
    if response.status == 200 and 'return_object' in result:
        recognized_text = result['return_object'].get('recognized', '').strip()
        return recognized_text
    return ""

    
import subprocess
from fastapi import FastAPI, File, UploadFile, HTTPException
import subprocess
import shutil
import os

@voice_router.post("/python/upload/")
def create_upload_file(file: UploadFile = File(...)):
    # 파일을 서버에 임시 저장
    temp_file_path = f"./audio/{file.filename}"
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # 변환된 파일의 경로를 정의
    output_file_path = f"./audio/{os.path.splitext(file.filename)[0]}.pcm"  # 확장자를 .wav로 수정

    # ffmpeg를 사용하여 오디오 파일을 PCM 형식으로 변환
    command = [
        'ffmpeg',
        '-i', temp_file_path,  # 입력 파일
        '-f', 's16le',  # PCM s16le 포맷
        '-acodec', 'pcm_s16le',  # 코덱: PCM s16le
        '-ar', '16000',  # 샘플 레이트: 16000Hz
        '-ac', '1',  # 오디오 채널: 1 (모노)
        output_file_path  # 출력 파일
    ]

    # ffmpeg 명령 실행
    result = subprocess.run(command, capture_output=True, text=True)
    
    recognized_text = stt(result)

    # 변환 성공 여부 확인
    if result.returncode != 0:
        # 변환 실패 시 에러 반환
        return HTTPException(status_code=500, detail="악 변환 실패")
    
     # 여기부터 음성 인식과 발음 평가를 수행합니다.     
    try:
        # recognized_text = voiceRecognition(output_file_path)
        if not recognized_text:
            raise HTTPException(status_code=500, detail="악 발음 실패")
        
        pronunciation_score = proCorrect(recognized_text, output_file_path)
        if pronunciation_score == -1:
            raise HTTPException(status_code=500, detail="악 음성 인식 실패")
        
        print(recognized_text)
        print(pronunciation_score)
        
        return JSONResponse(content={
            "message": "성공~",
            "recognized_text": recognized_text,
        }, status_code=200)
    
    except Exception as e:
        return JSONResponse(content={"error": "펑"}, status_code=500)
    

# # 서비스 계정 키 파일 경로 설정
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./app/domain/script_voice/voice_api/api_key/gothic-jigsaw-405113-ce587ad642ae.json"

class TextToSpeechRequest(BaseModel):
    text: str

@voice_router.post("/python/text-to-speech/")
def text_to_speech(request: TextToSpeechRequest):
    text = request.text
    # 클라이언트 초기화
    client = texttospeech.TextToSpeechClient()

    # 텍스트 입력 설정
    synthesis_input = texttospeech.SynthesisInput(text=text)
    
    print(synthesis_input)

    # 음성 설정: 언어, 성별 등
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )

    # 오디오 설정: 오디오 포맷
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    # TTS 요청 및 응답
    response = client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config
    )

    # 음성 데이터 스트림을 응답으로 반환
    return StreamingResponse(content=iter([response.audio_content]), media_type="audio/mpeg")

from google.cloud import speech
import io

def stt(speech_file):

    client = speech.SpeechClient()

    # 음성 파일을 불러와서 인코딩
    with io.open(speech_file, "rb") as audio_file:
        content = audio_file.read()
    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=48000,
        language_code="en-US",  # 한국어 설정
    )

    # STT 요청 및 결과 처리
    response = client.recognize(config=config, audio=audio)

     # 변환된 텍스트를 저장할 리스트 생성
    transcripts = []

    # 결과를 리스트에 추가
    for result in response.results:
        transcripts.append(result.alternatives[0].transcript)
        
    print(transcripts)

    # 변환된 텍스트 리스트 반환
    return transcripts

# 실행 예제
# stt("./audio/audio.wav")
