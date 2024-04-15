import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store"; // 경로는 프로젝트 설정에 따라 달라질 수 있습니다.
import TestScore from "./TestScore";
import Modal from "../../components/Test/TestModal";
import Nav from "../../components/Nav/Nav";
import styles from "./Test.module.css";
import { loadingActions } from "../../store/loading";
import Loading from "../../components/Loading";

interface ScriptData {
  id: number;
  content: string;
  videoId: string;
}

interface Quiz {
  sentence: string;
  answer: string;
  translated_sentence: string;
}

const Test = () => {
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const { videoId } = useParams<{ videoId: string }>(); // URL에서 videoId 추출

  const query = useQuery();
  const videoStringId = useParams().videoStringId; // `useParams`를 사용하여 경로 파라미터 접근
  const id = query.get("id"); // 쿼리 파라미터 중 'id' 값을 추출
  const videoIdNumber = id ? parseInt(id, 10) : 0;
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [translateList, setTranslateList] = useState([]);
  const [answer, setAnswer] = useState("");

  console.log(videoId);
  // 리덕스 스토어에서 userId 가져오기
  const userId = useSelector((state: RootState) => state.user.userId);
  const accessToken = localStorage.getItem("access_token");
  const loading = useSelector(
    (state: RootState) => state.loading["LECTURE-TEST"]
  );
  const dispatch = useDispatch();
  useEffect(() => {
    // 비디오 ID를 사용해 해당 스크립트 데이터를 API로부터 받아오는 함수
    const fetchScriptData = async () => {
      dispatch(loadingActions.startLoading("LECTURE-TEST"));
      try {
        const response = await axios.get(
          `/api/script-service/script/${videoId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const scriptData: ScriptData[] = response.data;
        const transcripts = scriptData.map((script) => script.content);
        console.log(transcripts);
        const requestBody = transcripts.map((transcript) => ({
          text: transcript,
        }));
        const requestBodyKor = transcripts.map((transcript) => ({
          text: transcript,
          target_language: "ko",
        }));

        const generateQuiz = await axios.post(
          `/python/generate-questions/`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setQuizList(generateQuiz.data);
        setTranslateList(generateQuiz.data.translated_sentence);
        console.log(quizList);
        console.log(translateList);
      } catch (error) {
        console.error("스크립트 데이터 로드 실패", error);
      } finally {
        dispatch(loadingActions.finishLoading("LECTURE-TEST"));
      }
    };

    if (videoId) {
      fetchScriptData();
    }
  }, [videoId]);

  useEffect(() => {
    console.log(quizList);
    console.log(translateList);
  }, [quizList, translateList]);

  const handleAnswerSubmission = () => {
    // 사용자가 답을 아직 제출하지 않았을 경우
    if (!isAnswerChecked) {
      // 정답 확인
      if (
        answer.trim().toLowerCase() ===
        quizList[currentQuizIndex].answer.toLowerCase()
      ) {
        setCorrectAnswersCount(correctAnswersCount + 1); // 정답 수 증가
      }
      setIsAnswerChecked(true); // 답 확인 상태로 변경
    } else {
      // 다음 문제로 넘어가거나 모든 문제를 풀었을 때 처리
      if (currentQuizIndex < quizList.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1); // 다음 문제로 인덱스 증가
        setAnswer(""); // 사용자 답 초기화
        setIsAnswerChecked(false); // 답 확인 상태 초기화
      } else {
        setModalOpen(true); // 모든 문제를 풀었으므로 모달 표시
      }
    }
  };

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <Nav />
      <div className={styles.testContainer}>
        <div>
          <h1>문제 {currentQuizIndex + 1}</h1>
        </div>
        {/* <div className={styles.scrbox}>
        <h1>번역본</h1>
      </div> */}
        <div className={styles.quebox}>
          <h1>{quizList[currentQuizIndex]?.sentence}</h1>
          <div className={styles.kor}>
            {quizList[currentQuizIndex]?.translated_sentence}
          </div>
          <div className={styles.check}>
            {isAnswerChecked && (
              <h1>정답은 "{quizList[currentQuizIndex]?.answer}"입니다.</h1>
            )}
          </div>
          <div className={`${styles.inputbtn}`}>
            {!isAnswerChecked && (
              <input
                className={styles.ansbox}
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="빈칸에 들어갈 단어를 입력하세요"
              />
            )}
            <div className={`${styles.buttondiv}`}>
              <button
                className={styles.button}
                onClick={handleAnswerSubmission}
              >
                {isAnswerChecked ? "다음 문제" : "제출"}
              </button>{" "}
              {/* 모듈 CSS 클래스를 적용합니다. */}
            </div>
          </div>
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          videoId={videoIdNumber} // videoId를 숫자로 변환하여 전달
          userId={userId}
          expCount={correctAnswersCount * 2}
        >
          <p>총점: {correctAnswersCount * 10}점</p>
          <TestScore
            correctAnswers={correctAnswersCount * 10}
            userId={userId}
            onClose={() => setModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Test;
