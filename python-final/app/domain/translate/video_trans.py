import json
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from nltk.tokenize import sent_tokenize

# 모델 및 토크나이저 초기화
model_dir = "./results"
tokenizer = AutoTokenizer.from_pretrained(model_dir)
model = AutoModelForSeq2SeqLM.from_pretrained(model_dir)
max_token_length = 64

def translate(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=max_token_length)
    outputs = model.generate(**inputs, max_length=max_token_length, num_beams=5)
    decoded_texts = [tokenizer.decode(output, skip_special_tokens=True) for output in outputs]
    return decoded_texts[0]

def translate_and_save(input_file_path, output_file_path):
    with open(input_file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    translated_data = []

    for video in data:
        # video_description을 문장으로 분할하고 번역
        description_sentences = sent_tokenize(video["video_description"])
        translated_description_sentences = [translate(sentence) for sentence in description_sentences]
        translated_description = " ".join(translated_description_sentences)
        
        # video_transcript를 문장으로 분할하고 번역
        transcript_sentences = sent_tokenize(video["video_transcript"])
        translated_transcript_sentences = [translate(sentence) for sentence in transcript_sentences]
        translated_transcript = " ".join(translated_transcript_sentences)

        translated_video = {
            "video_seq": video["video_seq"],
            "video_description": translated_description,
            "video_transcript": translated_transcript
        }
        translated_data.append(translated_video)

    with open(output_file_path, 'w', encoding='utf-8') as file:
        json.dump(translated_data, file, indent=4, ensure_ascii=False)

# 실행
input_file_path = './test.json'  # 입력 JSON 파일 경로
output_file_path = './result.json'  # 출력 JSON 파일 경로

translate_and_save(input_file_path, output_file_path)
