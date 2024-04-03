from pydantic import BaseModel


class video(BaseModel):
    videoId: str
    videoGrade: str
    script: str


class request_recommendInfo(BaseModel):
    concern: str
    videoDtoList: list[video]


class response_recommend(BaseModel):
    videoId: str
