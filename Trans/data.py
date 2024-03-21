from datasets import load_dataset
import pandas as pd

# 데이터셋 로드
en_ko  = load_dataset("bongsoo/news_talk_en_ko")

# 데이터셋 형식을 pandas DataFrame으로 변경
en_ko .set_format(type='pandas')
df = en_ko ["train"][:]

# 허깅페이스 데이터셋을 판다스 포맷으로 세팅
en_ko.set_format(type="pandas")

# 'train'키의 모든 행을 DataFrame df에 할당
df = en_ko["train"][:]

# 잘 담겼는지 확인한다.
df.head()

example_0 = list(df.columns)
example_0

example_0_df = pd.DataFrame({col: [value] for col, value in zip(('en', 'ko'), example_0)})

df.columns = ('en', 'ko')

en_ko_df = pd.concat([example_0_df, df],).reset_index(drop=True)
en_ko_df.head()

# 전처리된 데이터를 다시 datasets 형태로 변환
from datasets import Dataset

dataset = Dataset.from_pandas(en_ko_df)

dataset

# 각 데이터 셋의 샘플수를 정한다.
num_train = 1200000
num_valid = 90000
num_test = 10000

  
# 설정된 크기만큼 DataFrame을 자른다.
en_ko_df_train = en_ko_df.iloc[:num_train]
en_ko_df_valid = en_ko_df.iloc[num_train:num_train+num_valid]
en_ko_df_test = en_ko_df.iloc[-num_test:]

# tsv 파일로 저장
en_ko_df_train.to_csv("train.tsv", sep='\t', index=False)
en_ko_df_valid.to_csv("valid.tsv", sep='\t', index=False)
en_ko_df_test.to_csv("test.tsv", sep='\t', index=False)


data_files = {"train": "train.tsv", "valid": "valid.tsv", "test": "test.tsv"}
dataset =  load_dataset("csv", data_files=data_files, delimiter="\t")

# 데이터 확인
# print(dataset['train']['en'][:3], dataset['train']['ko'][:3])
