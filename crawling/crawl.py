import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import chromedriver_autoinstaller
import json
from selenium.common.exceptions import NoSuchElementException
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound
from win10toast import ToastNotifier
from youtube_transcript_api._errors import TranscriptsDisabled

chromedriver_autoinstaller.install()

chrome_options = Options()
chrome_options.add_argument("headless")  # headless 모드로 설정


video_seq = 436

video_links = [

]

def extract_video_id(video_link):
    # 정규 표현식을 사용하여 비디오 ID 추출
    match = video_link.split("v=")[1]
    if match:
        return match
    return None

def generate_thumbnail_url(video_id):
    # 비디오 ID를 사용하여 썸네일 이미지의 URL 생성
    thumbnail_url = f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg"
    return thumbnail_url

# 이전에 저장된 데이터 불러오기
try:
    with open('craw\.json', 'r', encoding='utf8') as f:
        data = json.load(f)
except FileNotFoundError:
    data = []

for link in video_links:
    
    driver = webdriver.Chrome(options=chrome_options)

    driver.get(link)
    time.sleep(1)
    
    video_id = extract_video_id(link)
    thumbnail = generate_thumbnail_url(video_id)

    video_title = driver.find_element(By.CSS_SELECTOR, "#title > h1 > yt-formatted-string").text

    # 등록 날짜
    time.sleep(2)
    playtime_selector = "#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > span:nth-child(2) > span.ytp-time-duration"
    playtime = driver.find_element(By.CSS_SELECTOR, playtime_selector).text

    try:
        minutes, seconds = map(int, playtime.split(':'))
        if minutes < 1:
            print("재생시간이 1분 미만입니다.")
            driver.quit()
            continue
    except ValueError:
        print(playtime + "잘못된 형식의 재생시간입니다.")
        driver.quit()
        continue

    
    # 설정 더보기 클릭
    time.sleep(2)
    setting_selector = "#buttons > ytd-topbar-menu-button-renderer"
    setting_button = driver.find_element(By.CSS_SELECTOR, setting_selector)
    setting_button.click()
    time.sleep(1.5)
    
    # 언어 설정 클릭
    lang_selector = "#items > ytd-compact-link-renderer:nth-child(3)"
    lang_button = driver.find_element(By.CSS_SELECTOR, lang_selector)
    lang_button.click()
    
    # 언어 클릭
    time.sleep(1.5)
    en_selector = "#items > ytd-compact-link-renderer:nth-child(13)"
    en_button = driver.find_element(By.CSS_SELECTOR, en_selector)
    en_button.click()
    time.sleep(1.5)
    
    # 더보기 버튼 클릭
    show_more_selector = "#expand"  
    show_more_button = driver.find_element(By.CSS_SELECTOR, show_more_selector)
    show_more_button.click()
    time.sleep(1)

    # 영상 요약 받아오기
    discription_selector = "#description-inline-expander > yt-attributed-string > span > span"
    discription = driver.find_element(By.CSS_SELECTOR, discription_selector)
    time.sleep(1)
    
    try:
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id)
        except NoTranscriptFound:
            transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['en-GB'])
        timeline_removed_results = []
    
        # 스크립트 내용 추출
        for script_tab in transcript:
            timeline_removed_results.append(script_tab['text']+"\n")
        
        video_seq = video_seq+1
        
        # 데이터 추가
        video_data = {
            "video_seq": video_seq,
            "video_id": video_id,
            "video_url": link,
            "video_thumbnail": thumbnail,
            "video_title": video_title,
            "video_description": discription.text,
            "video_playtime": playtime,
            "video_transcript": timeline_removed_results
        }
        data.append(video_data)
        
    except TranscriptsDisabled:
        print("해당 비디오의 자막이 비활성화되어 있거나 자막이 없습니다. 건너뜁니다.")
    except NoSuchElementException:
        print("스크립트 표시 버튼이 없습니다. 건너뜁니다.")

    driver.quit()

# 데이터 저장
with open('crawl.json', 'w', encoding='utf8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
    
toaster = ToastNotifier()
toaster.show_toast("작업 완료", "파이썬 작업이 완료되었습니다.", duration=10)

input()
