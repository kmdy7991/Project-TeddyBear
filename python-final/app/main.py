from fastapi import FastAPI
import uvicorn
from app.domain.script_voice.voice_api.voice_main import voice_router
from app.domain.translate.trans_main import trans_router
import py_eureka_client.eureka_client as eureka_client
from contextlib import asynccontextmanager


@asynccontextmanager
async def start_load(init: FastAPI):
    await eureka_client.init_async(eureka_server="j10b107.p.ssafy.io:8761",
                                   app_name="python-service2",
                                   instance_ip_network="172.84.0.0/24",
                                   instance_port=8779
                                   )
    yield


app = FastAPI(lifespan=start_load)

# API Router를 등록합니다.
app.include_router(voice_router)
app.include_router(trans_router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8779)
