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

model_dir = "./app/domain/translate/results"
tokenizer = AutoTokenizer.from_pretrained(model_dir)
model = AutoModelForSeq2SeqLM.from_pretrained(model_dir)
max_token_length = 64


def translate(text) : 
    input_text = [ text
        # "fuck you, man. you are flicky ratchet"
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

    # 문자열 리스트를 하나의 문자열로 합치기
    combined_text = ' '.join(decoded_texts)  # 빈 공간을 구분자로 사용하여 합침

    # 합쳐진 문자열 반환
    return combined_text