from fastapi import FastAPI
import uvicorn
import py_eureka_client.eureka_client as eureka_client
from contextlib import asynccontextmanager


@asynccontextmanager
async def start_load(init: FastAPI):
    await eureka_client.init_async(eureka_server="j10b107.p.ssafy.io:8761",
                                   app_name="python-service",
                                   instance_ip_network="172.84.0.0/24",
                                   instance_port=8778
                                   )
    yield


app = FastAPI(lifespan=start_load)


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
def say_hello(name: str):
    return {"message": f"Hello {name}"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8778)
