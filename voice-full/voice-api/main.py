from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import shutil
import urllib3
import json
import base64
import subprocess
import os
from func import proCorrect, voiceRecognition

app = FastAPI()  # FastAPI 애플리케이션 인스턴스 생성


@app.post("/upload/")
async def create_upload_file(file: UploadFile = File(...), text: str = File(...)):
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
    
    recognized_text = f"{text}"
    
    print(recognized_text)

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
        
        return JSONResponse(content={
            "message": "성공~",
            "recognized_text": recognized_text,
            "pronunciation_score": pronunciation_score
        }, status_code=200)
    
    except Exception as e:
        return JSONResponse(content={"error": "펑"}, status_code=500)
