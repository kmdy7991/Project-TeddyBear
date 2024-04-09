from datasets import load_dataset
import pandas as pd
import os

# 엑셀 파일 로드
xlsx_path = 'Trans/excel/6_문어체_지자체웹사이트.xlsx'
df = pd.read_excel(xlsx_path, usecols=['원문', '번역문'])

# 필요한 컬럼 이름으로 데이터프레임의 컬럼 이름 변경
df = df.rename(columns={'번역문': 'en', '원문': 'ko'})

# 데이터프레임을 나눌 크기 설정
num_train = 1200000  # 예시 크기, 실제 데이터 크기에 맞게 조정 필요
num_valid = 90000
num_test = 10000

# 설정된 크기만큼 데이터프레임을 자른다.
df_train = df.iloc[:num_train]
df_valid = df.iloc[num_train:num_train+num_valid]
df_test = df.iloc[-num_test:]

# 함수 정의: TSV 파일에 데이터 이어 붙이기
def append_to_tsv(dataframe, filename):
    # 파일이 이미 존재하는지 확인
    if os.path.exists(filename):
        # 파일이 존재하면, 헤더 없이 데이터를 추가
        dataframe.to_csv(filename, mode='a', sep='\t', index=False, header=False)
    else:
        # 파일이 존재하지 않으면, 새 파일을 생성하고 헤더 포함하여 데이터를 쓴다
        dataframe.to_csv(filename, mode='w', sep='\t', index=False, header=True)

# 각 데이터셋을 파일에 이어 붙인다
append_to_tsv(df_train, "train.tsv")
append_to_tsv(df_valid, "valid.tsv")
append_to_tsv(df_test, "test.tsv")

# datasets 라이브러리를 사용하여 TSV 파일을 Dataset 객체로 로드
data_files = {"train": "train.tsv", "valid": "valid.tsv", "test": "test.tsv"}
dataset = load_dataset("csv", data_files=data_files, delimiter="\t")
