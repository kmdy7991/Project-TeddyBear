from fastapi import FastAPI
import uvicorn
import py_eureka_client.eureka_client as eureka_client
from contextlib import asynccontextmanager


@asynccontextmanager
async def eureka_client(app: FastAPI):
    await eureka_client.init_async(eureka_server="discovery",
                                   app_name="python-service",
                                   instance_port=8770
                                   )
    yield


app = FastAPI(lifespan=eureka_client)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8770)
