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

data_files = {"train": "train2.tsv", "valid": "valid.tsv", "test": "test.tsv"}
dataset =  load_dataset("csv", data_files=data_files, delimiter="\t")

device = 'cuda' if torch.cuda.is_available() else 'cpu'
device

model_ckpt = "KETI-AIR/ke-t5-base"
max_token_length = 64

#  KE-T5 모델이 학습할때 함께 사용한 토크나이저
tokenizer = AutoTokenizer.from_pretrained(model_ckpt)

# tokenized_sample_en = tokenizer(dataset['train'][10]['en'], 
#                                 max_length=max_token_length, 
#                                 padding=True, truncation=True)

# tokenized_sample_ko = tokenizer(dataset['train'][10]['ko'], 
#                                 max_length=max_token_length, 
#                                 padding=True, truncation=True)

# df = pd.DataFrame(
#     [
#         tokenized_sample_en['input_ids'],
#         tokenizer.convert_ids_to_tokens(tokenized_sample_en['input_ids'])
#     ], index=('ids', 'tokens')
# )

# dataset 내의 문장을 토큰화 하기 위한 함수
def convert_examples_to_features(examples):
    model_inputs = tokenizer(examples['en'],
                             text_target=examples['ko'], 
                             max_length=max_token_length, truncation=True)
    
    return model_inputs



tokenized_datasets = dataset.map(convert_examples_to_features, 
                                 batched=True, 
                                 remove_columns=dataset["train"].column_names,
                                ) 

print(tokenized_datasets['train'][2])