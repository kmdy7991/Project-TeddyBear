from fastapi import FastAPI, File, UploadFile,HTTPException
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
  
import subprocess
import shutil
import os

# # 서비스 계정 키 파일 경로 설정
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./app/domain/script_voice/voice_api/api_key/gothic-jigsaw-405113-ce587ad642ae.json"

@voice_router.post("/python/upload/")
def create_upload_file(file: UploadFile = File(...)):
    # 파일을 서버에 임시 저장
    temp_file_path = f"./app/domain/script_voice/voice_api/audio/{file.filename}"
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    recognized_text = stt(temp_file_path)
    
    print(recognized_text)
    
    return recognized_text

class TextToSpeechRequest(BaseModel):
    text: str

@voice_router.post("/python/text-to-speech")
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

from pydantic import BaseModel
from google.cloud import translate_v2 as translate

# Pydantic 모델 정의
class TranslationRequest(BaseModel):
    text: str
    target_language: str = "ko"

@voice_router.post("/python/trans/")
def translate_text(request: TranslationRequest):
    # Google Cloud Translation 클라이언트 인스턴스화
    translate_client = translate.Client()

    try:
        # 텍스트 번역 요청
        result = translate_client.translate(
            request.text,
            target_language=request.target_language
        )
    except Exception as e:
        # 오류 처리
        raise HTTPException(status_code=500, detail=str(e))

    # 결과 반환
    return {"original": result['input'], "translated": result['translatedText']}
