from google.cloud import texttospeech
import os

# 서비스 계정 키 파일 경로 설정
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "path/to/your/service-account-file.json"

# 클라이언트 생성
client = texttospeech.TextToSpeechClient()

# 텍스트 입력 설정
synthesis_input = texttospeech.SynthesisInput(text="Hello, welcome to Google Cloud Text-to-Speech.")

# 음성 설정
voice = texttospeech.VoiceSelectionParams(
    language_code="en-US",  # 영어 설정
    ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL  # 음성 성별
)

# 오디오 출력 설정
audio_config = texttospeech.AudioConfig(
    audio_encoding=texttospeech.AudioEncoding.MP3  # MP3 형식으로 출력
)

# TTS 요청 및 응답
response = client.synthesize_speech(
    input=synthesis_input,
    voice=voice,
    audio_config=audio_config
)

# 응답으로 받은 오디오를 파일로 저장
with open("output.mp3", "wb") as out:
    out.write(response.audio_content)
    print("Audio file has been saved as 'output.mp3'.")
