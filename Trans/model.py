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

os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"] = "3"

data_files = {"train": "train2.tsv", "valid": "valid.tsv", "test": "test.tsv"}
dataset =  load_dataset("csv", data_files=data_files, delimiter="\t")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
device


model_path = "./results"  # 저장된 모델의 경로
tokenizer = AutoTokenizer.from_pretrained(model_path)

max_token_length = 64

#  KE-T5 모델이 학습할때 함께 사용한 토크나이저

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

# 모델 로딩
model = AutoModelForSeq2SeqLM.from_pretrained(model_path).to(device)

# 테스트
# encoder_inputs = tokenizer(
#     ["Studies have been shown that owning a dog is good for you"], 
#     return_tensors="pt"
# )['input_ids'].to(device)

# decoder_targets = tokenizer(
#     ["개를 키우는 것이 건강에 좋다는 연구 결과가 있습니다."], 
#     return_tensors="pt"
# )['input_ids'].to(device)

# 오른쪽으로 한 칸 이동
# decoder_inputs = model._shift_right(decoder_targets)

# # forward pass
# outputs = model(input_ids=encoder_inputs, 
#                 decoder_input_ids=decoder_inputs, 
#                 labels=decoder_targets)


# 데이터 콜레이터
data_collator = DataCollatorForSeq2Seq(tokenizer, model=model)

# 각 항목아래 샘플들이 리스트 형태로 묶여 반환된다.
tokenized_datasets["train"][1:3]

# 콜레이터에 샘플을 넘길 때는 개별 샘플이 사전으로 묶이는 형태가 되어야 되므로 아래처럼 한번 가공
[tokenized_datasets["train"][i] for i in range(1, 3)]

# 콜레이터를 돌리면 알아서 패딩하고 쉬프트 시킨다.
batch = data_collator(
    [tokenized_datasets["train"][i] for i in range(1, 3)]
)



###
###
###
###

# 아래부터는 정확도에 대한 점수를 판별하는 부분입니다.

metric = evaluate.load("sacrebleu")

# predictions = [
#     "저는 딥러닝을 좋아해요.",
#     "딥러닝 프레임워크가 잘 개발되었기 때문에 요즘은 누군가의 도움 없이 기계번역 시스템을 구축할 수 있다."
# ]

# references = [
#     ["저는 딥러닝을 좋아해요.", "나는 딥러닝을 사랑해요."],
#     ["요즘은 딥러닝 프레임워크가 잘 발달되어 있기 때문에 누구의 도움 없이도 기계 번역 시스템을 구축할 수 있습니다.",
#      "최근에는 딥러닝 프레임워크가 잘 개발되어 있기 때문에 다른 사람의 도움 없이도 기계 번역 시스템을 개발할 수 있습니다."]
# ]

# # 유사도 분석 후 score 반환
# metric.compute(predictions=predictions, references=references)


###
###
### 트레이닝 및 결과 저장

# compute_metrics 함수 정의
def compute_metrics(eval_preds):
    preds, labels = eval_preds
    if isinstance(preds, tuple):
        preds = preds[0]
    decoded_preds = tokenizer.batch_decode(preds, skip_special_tokens=True)
    labels = np.where(labels != -100, labels, tokenizer.pad_token_id)
    decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)
    decoded_preds = [pred.strip() for pred in decoded_preds]
    decoded_labels = [[label.strip()] for label in decoded_labels]
    result = metric.compute(predictions=decoded_preds, references=decoded_labels)
    result = {"bleu": result["score"]}
    return result

# 학습 설정
training_args = Seq2SeqTrainingArguments(
    output_dir="chkpt2",
    learning_rate=0.0005,
    weight_decay=0.01,
    per_device_train_batch_size=64,
    per_device_eval_batch_size=128,
    num_train_epochs=1,
    save_steps=500,
    save_total_limit=2,
    evaluation_strategy="epoch",
    logging_strategy="no",
    predict_with_generate=True,
    fp16=False,
    gradient_accumulation_steps=2,
    report_to="none" # Wandb 로그 끄기
)

# Trainer 초기화
trainer = Seq2SeqTrainer(
    model,
    training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["valid"],
    data_collator=data_collator,
    tokenizer=tokenizer,
    compute_metrics=compute_metrics,
)

# 학습 시작
trainer.train()

# 학습 결과 저장
trainer.save_model("./results2")