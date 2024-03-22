from fastapi import FastAPI, HTTPException
from typing import Dict
from res import translate  # res.py 모듈에서 translate 함수를 가져옴
import uvicorn
# Pydantic 모델을 사용하면, 요청 바디의 구조를 명확하게 정의할 수 있고,
# 데이터 검증과 문서 자동 생성의 이점을 얻을 수 있
from pydantic import BaseModel


app = FastAPI()

# Pydantic 모델 정의
class TranslationRequest(BaseModel):
    text: str

# 경로 연산 함수
@app.post("/python/translate/")
async def translate_text(request: TranslationRequest):
    # translate 함수를 호출하여 텍스트 번역
    try:
        translated_texts = translate(request.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    # 번역된 텍스트 반환
    return {"translated_text": translated_texts}


if __name__ == "__main__":
    
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
