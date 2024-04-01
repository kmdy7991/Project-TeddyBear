from google.cloud import speech
import io
import os

# 환경 변수에 서비스 계정 키 파일 경로 설정
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./api_key/gothic-jigsaw-405113-ce587ad642ae.json"

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

# 실행 예제
# stt("./audio/audio.wav")
