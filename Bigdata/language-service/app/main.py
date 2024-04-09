import uvicorn
import py_eureka_client.eureka_client as eureka_client

from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.router.category_route import category_router
from app.router.recommend_route import recommend_router


@asynccontextmanager
async def start_load(init: FastAPI):
    await eureka_client.init_async(eureka_server="j10b107.p.ssafy.io:8761",
                                   app_name="language-service",
                                   instance_ip_network="172.84.0.0/24",
                                   instance_port=8778
                                   )
    yield


app = FastAPI(lifespan=start_load)

app.include_router(category_router)
app.include_router(recommend_router)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8778)
