from fastapi import FastAPI, HTTPException,APIRouter
from pydantic import BaseModel
from typing import List, Optional
import spacy
import random
import os
from google.cloud import translate_v2 as translate

# # 서비스 계정 키 파일 경로 설정
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./app/domain/script_voice/voice_api/api_key/gothic-jigsaw-405113-ce587ad642ae.json"

test_router = APIRouter()

# SpaCy의 영어 모델 로드
nlp = spacy.load("en_core_web_sm")

class Sentence(BaseModel):
    text: str

class Question(BaseModel):
    sentence: str
    translated_sentence: Optional[str] = None  # 번역된 문장을 위한 필드 추가
    answer: Optional[str] = None


def create_fill_in_the_blank(sentence):
    doc = nlp(sentence)
    blank_candidates = [token.text for token in doc if token.pos_ in ["NOUN", "VERB", "ADV", "ADJ"]]
    
    if blank_candidates:
        blank_target = random.choice(blank_candidates)
        modified_sentence = sentence.replace(blank_target, "____", 1)
        return modified_sentence, blank_target
    else:
        return sentence, ""

@test_router.post("/python/generate-questions/", response_model=List[Question])
def generate_questions(sentences: List[Sentence]):
    selected_sentences = [sentence.text for sentence in sentences]
    questions = []
    for sentence in selected_sentences:
        trans_sen = translate_text(sentence)  # 번역 함수가 비동기일 경우 await 사용
        question_text, answer = create_fill_in_the_blank(sentence)
        question = Question(sentence=question_text, translated_sentence=trans_sen, answer=answer)  # 번역된 문장 포함
        questions.append(question)
        if len(questions) >= 5:
            break
    return questions


@test_router.post("/python/score-quiz/")
def score_quiz(questions: List[Question]):
    score = 0
    for question in questions:
        if question.answer.lower() == create_fill_in_the_blank(question.sentence)[1].lower():
            score += 1
    return {"score": score, "total": len(questions)}


def translate_text(text):
    # Google Cloud Translation 클라이언트 인스턴스화
    translate_client = translate.Client()

    try:
        # 텍스트 번역 요청
        result = translate_client.translate(
            text,
            target_language="ko"
        )
    except Exception as e:
        # 오류 처리
        raise HTTPException(status_code=500, detail=str(e))

    # 결과 반환
    return result['translatedText']