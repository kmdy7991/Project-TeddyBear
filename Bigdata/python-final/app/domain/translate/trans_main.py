from fastapi import FastAPI, HTTPException
from typing import Dict
from app.domain.translate.res import translate  # res.py 모듈에서 translate 함수를 가져옴
import uvicorn
# Pydantic 모델을 사용하면, 요청 바디의 구조를 명확하게 정의할 수 있고,
# 데이터 검증과 문서 자동 생성의 이점을 얻을 수 있
from pydantic import BaseModel
from fastapi import APIRouter
trans_router = APIRouter()

# Pydantic 모델 정의
class TranslationRequest(BaseModel):
    text: str

# 경로 연산 함수
@trans_router.post("/python/translate/")
def translate_text(request: TranslationRequest):
    # translate 함수를 호출하여 텍스트 번역
    try:
        translated_texts = translate(request.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    # 번역된 텍스트 반환
    return {"translated_text": translated_texts}





# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from typing import Dict
# import py_eureka_client.eureka_client as eureka
# import uvicorn
# from contextlib import asynccontextmanager
# from res import translate

# app = FastAPI()

# # Pydantic 모델 정의
# class TranslationRequest(BaseModel):
#     text: str

# # Eureka 서버에 애플리케이션을 등록하고 관리하는 비동기 컨텍스트 매니저
# @asynccontextmanager
# async def eureka_context(app: FastAPI):
#     await eureka.init_async(
#         eureka_server="http://localhost:8671/eureka",
#         app_name="python-service",
#         instance_ip="localhost",
#         instance_port=8000
#     )
#     yield

# # FastAPI 앱의 생명주기 이벤트를 사용하여 Eureka 서버와의 연동을 관리
# app.add_event_handler("startup", eureka_context(app).__aenter__)
# app.add_event_handler("shutdown", eureka_context(app).__aexit__)

# # 번역 API 경로 연산
# @app.post("/python/translate/")
# async def translate_text(request: TranslationRequest):
#     try:
#         translated_texts = translate(request.text)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
#     return {"translated_text": translated_texts}

# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
