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
        question_text, answer = create_fill_in_the_blank(sentence)
        question = Question(sentence=question_text, answer=answer)
        questions.append(question)
    return questions

@test_router.post("/python/score-quiz/")
async def score_quiz(questions: List[Question]):
    score = 0
    for question in questions:
        if question.answer.lower() == create_fill_in_the_blank(question.sentence)[1].lower():
            score += 1
    return {"score": score, "total": len(questions)}
