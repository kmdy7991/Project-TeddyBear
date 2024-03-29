from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import shutil
import urllib3
import json
import base64
import subprocess
import os
from record import proCorrect, voiceRecognition
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import texttospeech
from fastapi.responses import StreamingResponse
from pydantic import BaseModel


app = FastAPI()  # FastAPI 애플리케이션 인스턴스 생성

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 실제 환경에서는 보다 안전한 설정을 사용하세요.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
def create_upload_file(file: UploadFile = File(...), text: str = File(...)):
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
    
    recog_text = f"{text}"
    
    print(recog_text)

    # 변환 성공 여부 확인
    if result.returncode != 0:
        # 변환 실패 시 에러 반환
        return HTTPException(status_code=500, detail="악 변환 실패")
    
     # 여기부터 음성 인식과 발음 평가를 수행합니다.     
    try:
        recognized_text = voiceRecognition(output_file_path)
        print(recognized_text)
        if not recognized_text:
            raise HTTPException(status_code=500, detail="악 발음 실패")
        
        pronunciation_score = proCorrect(recog_text, output_file_path)
        print(pronunciation_score)  
        # if pronunciation_score == -1:
        #     raise HTTPException(status_code=500, detail="악 음성 인식 실패")
        
        return JSONResponse(content={
            "message": "성공~",
            "recognized_text": recognized_text,
            "pronunciation_score": pronunciation_score
        }, status_code=200)
    
    except Exception as e:
        return JSONResponse(content={"error": "펑"}, status_code=500)

# 서비스 계정 키 파일 경로 설정
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./api_key/gothic-jigsaw-405113-ce587ad642ae.json"

class TextToSpeechRequest(BaseModel):
    text: str

@app.post("/text-to-speech/")
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
