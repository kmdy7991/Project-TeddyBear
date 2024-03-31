import "react-quill/dist/quill.snow.css";
import styles from "./LectureNote.module.css";
import Editor from "../../components/Note/Editor";
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";

// Editor 컴포넌트의 prop 타입 정의 수정
export interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export interface LectureNoteProp {
  userId: number;
  videoId: number;
}
export default function LectureNote({ userId, videoId }: LectureNoteProp) {
  const contentInput = useRef();
  const [content, setContent] = useState("");
  // 저장된 내용있는지 추적
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    // 강의 노트 조회
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `/video-service/note/${userId}/${videoId}`
        );
        // 노트 내용이 있으면 상태 업데이트
        if (response.data.note) {
          setContent(response.data.note);
          setIsContentLoaded(true); // 저장된 내용이 있음
        } else {
          return <div>필기하신 내용이 없습니다.</div>;
        }
        setContent(response.data.note);
        console.log("노트 조회 성공", response.data);
      } catch (error) {
        console.error("노트 조회 실패", error);
      }
    };

    fetchNote();
  }, [userId, videoId, isContentLoaded]);
  async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const res = await axios.post(`/video-service/note`, {
        userId: userId,
        videoId: videoId,
        note: content,
      });

      console.log("필기 노트 작성 성공", res.data);
    } catch (err) {
      console.error("필기 노트 작성 실패", err);
    }
  }

  async function handleEdit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const res = await axios.put(`/video-service/note/${userId}/${videoId}`, {
        updatedNote: content,
      });

      console.log("필기 노트 수정 성공", res.data);
      setIsContentLoaded(true); // 저장 후에는 내용이 있으므로 true로 설정
    } catch (err) {
      console.error("필기 노트 수정 실패", err);
    }
  }

  async function handleDelete(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `/video-service/note/${userId}/${videoId}`
      );
      console.log("필기 노트 삭제", res.data);
      setContent("");
      setIsContentLoaded(false); // 삭제 후에는 내용 없으니 false로 설정
    } catch (error) {
      console.error("필기 노트 삭제 실패", error);
    }
  }

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.quill}`}>
        <form>
          <Editor value={content} onChange={setContent} />
          {isContentLoaded ? (
            <div className={styles.btn}>
              <button
                className={styles.submit}
                type="button"
                onClick={handleEdit}
              >
                수정
              </button>
              <button
                className={styles.delete}
                type="button"
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          ) : (
            <div className={styles.btn}>
              <button
                className={styles.submit}
                type="button"
                onClick={handleSubmit}
              >
                저장
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
