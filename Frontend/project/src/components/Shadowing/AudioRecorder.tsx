import React, { useEffect, useState } from "react";
import { ShadowingProps } from "../../pages/Video/VideoDetail";
import play from "../../assets/play.png";
import stop from "../../assets/stop.png";
import "./AudioRecorder.css";
// App 컴포넌트 정의
const AudioComponent = ({ selectedLine }: ShadowingProps) => {
  // 오디오 스트림, MediaRecorder 인스턴스, 녹음 상태, 오디오 소스, 분석기, 오디오 URL, 버튼 활성화 상태를 저장하기 위한 상태 변수
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [onRec, setOnRec] = useState<boolean>(true);
  const [source, setSource] = useState<MediaStreamAudioSourceNode | null>(null);
  const [analyser, setAnalyser] = useState<ScriptProcessorNode | null>(null);
  const [audioUrl, setAudioUrl] = useState<Blob | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);

  const [text, setText] = useState("");

  useEffect(() => {
    setText(selectedLine ?? "");
  }, [selectedLine]);

  // 녹음을 시작하는 함수
  const onRecAudio = () => {
    setDisabled(true); // 버튼을 비활성화하여 추가 녹음을 방지

    const audioCtx = new window.AudioContext(); // 오디오 컨텍스트 생성
    const analyser = audioCtx.createScriptProcessor(0, 1, 1); // 스크립트 프로세서 노드 생성
    setAnalyser(analyser); // 분석기 상태 업데이트

    // 스트림으로부터 소리를 생성하는 함수
    function makeSound(stream: MediaStream) {
      const source = audioCtx.createMediaStreamSource(stream); // 오디오 소스 생성
      setSource(source); // 오디오 소스 상태 업데이트
      source.connect(analyser); // 오디오 소스를 분석기에 연결
      analyser.connect(audioCtx.destination); // 분석기를 오디오 컨텍스트의 목적지에 연결
    }

    // 사용자의 오디오 입력(마이크 등)을 가져옴
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream); // MediaRecorder 인스턴스 생성
      mediaRecorder.start(); // 녹음 시작
      setStream(stream); // 스트림 상태 업데이트
      setMedia(mediaRecorder); // MediaRecorder 상태 업데이트
      makeSound(stream); // 오디오 처리 함수 호출

      // 오디오 데이터 처리 이벤트 핸들러
      analyser.onaudioprocess = function (e: any) {
        if (e.playbackTime > 180) {
          // 녹음 시간이 180초를 초과하면
          stream.getAudioTracks().forEach((track) => {
            track.stop(); // 오디오 트랙 중지
          });
          mediaRecorder.stop(); // 녹음 중지
          analyser.disconnect(); // 분석기 연결 해제
          source?.disconnect(); // 오디오 소스 연결 해제

          mediaRecorder.ondataavailable = function (e: BlobEvent) {
            setAudioUrl(e.data); // 오디오 URL 상태 업데이트
            setOnRec(true); // 녹음 상태를 true로 설정하여 녹음 중지 상태로 전환
          };
        } else {
          setOnRec(false); // 그렇지 않으면 녹음 상태를 false로 설정하여 녹음 중임을 나타냄
        }
      };
    });
  };

  // 녹음을 중지하는 함수
  const offRecAudio = () => {
    if (media) {
      media.ondataavailable = function (e: BlobEvent) {
        setAudioUrl(e.data); // 오디오 URL 상태 업데이트
        setOnRec(true); // 녹음 상태를 true로 설정하여 녹음 중지 상태로 전환
      };
    }

    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.stop(); // 모든 오디오 트랙 중지
      });
    }

    media?.stop(); // MediaRecorder 중지
    analyser?.disconnect(); // 분석기 연결 해제
    source?.disconnect(); // 오디오 소스 연결 해제

    if (audioUrl) {
      URL.createObjectURL(audioUrl); // 오디오 URL로부터 오디오 재생 가능한 URL 생성 (현재 사용되지 않음)
    }

    // 오디오 데이터를 파일로 변환
    const sound = new File([audioUrl as Blob], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });

    setDisabled(false); // 버튼 활성화
    console.log(sound); // 생성된 파일 로그 출력
  };

  // 오디오 재생 함수
  // 오디오 재생 함수와 POST 요청을 함께 수행
  const playAndUpload = () => {
    if (audioUrl) {
      const audio = new Audio(URL.createObjectURL(audioUrl)); // 오디오 URL로부터 오디오 객체 생성
      audio.loop = false; // 반복 재생 비활성화
      audio.volume = 1; // 볼륨 설정 (최대)
      audio.play(); // 오디오 재생

      // 재생과 동시에 서버에 오디오 파일 업로드
      uploadAudioFile();
    }
  };
  // 서버에 오디오 파일 업로드 함수
  const uploadAudioFile = async () => {
    if (audioUrl) {
      const formData = new FormData(); // FormData 인스턴스 생성
      formData.append("file", audioUrl, "audio.wav"); // 오디오 파일 FormData에 추가
      console.log(audioUrl);
      try {
        const response = await fetch("/python/upload", {
          // 서버에 POST 요청
          method: "POST",
          body: formData,
        });
        // FormData의 key 확인
        console.log(formData.get("file"));

        if (!response.ok) {
          // 요청 실패 시
          throw new Error("서버로부터 응답을 받는데 실패했습니다.");
        }

        const data = await response.json(); // 서버 응답 처리
        console.log(data); // 서버로부터 받은 데이터 로그 출력
      } catch (error) {
        console.error("오디오 파일 업로드 중 오류 발생:", error); // 오류 로그 출력
      }
    }
  };

  // 컴포넌트 렌더링: 녹음 시작/중지, 재생, 발음 평가 버튼
  return (
    <>
      <button onClick={onRec ? onRecAudio : offRecAudio} className="rec">
        {onRec ? "녹음 시작" : "녹음 중지"}
      </button>
      <button onClick={playAndUpload} disabled={!audioUrl} className="play">
        재생
      </button>
    </>
  );
};

export default AudioComponent;
