import json

# JSON 파일 경로
file_path = 'videolink.json'

# JSON 파일 읽기
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# 비디오 링크 리스트 생성
video_links = [f"https://www.youtube.com/watch?v={item['contentDetails']['videoId']}" for item in data['items']]

# 텍스트 파일에 비디오 링크 리스트 저장
with open('video_link_list.txt', 'w', encoding='utf-8') as file:
    for link in video_links:
        file.write(f'"{link}",\n')

print("비디오 링크 리스트를 성공적으로 파일에 저장했습니다.")


# video 채널 리스트에서 가져온 아이템 json 넣으면 됩니다. 
