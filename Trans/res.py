# 선학습 모델 사용하기 위한 클래스
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
# 데이터 콜레이터
from transformers import DataCollatorForSeq2Seq
# 학습에 필요한 클래스
from transformers import Seq2SeqTrainingArguments, Seq2SeqTrainer  
# 데이터 셋 로딩 함수 & 번역 결과 측정 함수 
from datasets import load_dataset, load_metric
import numpy as np
import torch
import multiprocessing
import pandas as pd
import evaluate
import os
from torch.utils.data import DataLoader

model_dir = "./results"
tokenizer = AutoTokenizer.from_pretrained(model_dir)
model = AutoModelForSeq2SeqLM.from_pretrained(model_dir)
max_token_length = 64


input_text = [
    # "fuck you, man. you are flicky ratchet"
    "The remaining staff will stay in the current space on the 3rd floor, and the division will continue to be called the advertising department."
]

inputs = tokenizer(input_text, return_tensors="pt", 
                   padding=True, max_length=max_token_length)



koreans = model.generate(
    **inputs,
    max_length=max_token_length,
    num_beams=5,
)

koreans.shape
[ 
    tokenizer.convert_tokens_to_string(
    tokenizer.convert_ids_to_tokens(korean)) for korean in koreans
]

decoded_texts = [
    tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(korean)) for korean in koreans
]

# 디코딩된 텍스트 출력
for text in decoded_texts:
    print(text)