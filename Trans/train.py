from transformers import Seq2SeqTrainer
import numpy as np


# # compute_metrics 함수 정의
# def compute_metrics(eval_preds):
#     preds, labels = eval_preds
#     if isinstance(preds, tuple):
#         preds = preds[0]
#     decoded_preds = tokenizer.batch_decode(preds, skip_special_tokens=True)
#     labels = np.where(labels != -100, labels, tokenizer.pad_token_id)
#     decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)
#     decoded_preds = [pred.strip() for pred in decoded_preds]
#     decoded_labels = [[label.strip()] for label in decoded_labels]
#     result = metric.compute(predictions=decoded_preds, references=decoded_labels)
#     result = {"bleu": result["score"]}
#     return result

# # 학습 설정
# training_args = Seq2SeqTrainingArguments(
#     output_dir="chkpt",
#     learning_rate=0.0005,
#     weight_decay=0.01,
#     per_device_train_batch_size=64,
#     per_device_eval_batch_size=128,
#     num_train_epochs=1,
#     save_steps=500,
#     save_total_limit=2,
#     evaluation_strategy="epoch",
#     logging_strategy="no",
#     predict_with_generate=True,
#     fp16=False,
#     gradient_accumulation_steps=2,
#     report_to="none" # Wandb 로그 끄기
# }

# # Trainer 초기화
# trainer = Seq2SeqTrainer(
#     model,
#     training_args,
#     train_dataset=tokenized_datasets["train"],
#     eval_dataset=tokenized_datasets["valid"],
#     data_collator=data_collator,
#     tokenizer=tokenizer,
#     compute_metrics=compute_metrics,
# )

# # 학습 시작
# trainer.train()

# # 학습 결과 저장
# trainer.save_model("./results")
