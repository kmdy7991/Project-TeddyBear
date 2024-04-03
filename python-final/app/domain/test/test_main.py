from fastapi import FastAPI, HTTPException,APIRouter
from pydantic import BaseModel
from typing import List, Optional
import spacy
import random

test_router = APIRouter()

# SpaCy의 영어 모델 로드
nlp = spacy.load("en_core_web_sm")

class Sentence(BaseModel):
    text: str

class Question(BaseModel):
    sentence: str
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
async def generate_questions(sentences: List[Sentence]):
    selected_sentences = [sentence.text for sentence in sentences]
    questions = []
    for sentence in selected_sentences:
        # 문장을 공백을 기준으로 나누어 단어 리스트를 생성합니다.
        words = sentence.split()
        # 단어 수가 1개 이상이고, 생성된 질문 수가 5개 미만인 경우에만 질문을 생성합니다.
        if len(words) > 1 and len(questions) < 5:
            question_text, answer = create_fill_in_the_blank(sentence)
            question = Question(sentence=question_text, answer=answer)
            questions.append(question)
        # 이미 5개의 질문을 생성했다면 반복을 종료합니다.
        if len(questions) >= 5:
            break
    return questions

@test_router.post("/python/score-quiz/")
async def score_quiz(questions: List[Question]):
    score = 0
    for question in questions:
        if question.answer.lower() == create_fill_in_the_blank(question.sentence)[1].lower():
            score += 1
    return {"score": score, "total": len(questions)}
