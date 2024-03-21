from transformers import Trainer, TrainingArguments

training_args = TrainingArguments(
  output_dir='./results',          
  num_train_epochs=1,              
  per_device_train_batch_size=4,  
  per_device_eval_batch_size=4,   
  warmup_steps=500,                
  weight_decay=0.01,               
  logging_dir='./logs',            
)

trainer = Trainer(
  model=model,
  args=training_args,
  train_dataset=dataset['train'],
  eval_dataset=dataset['test']
)
