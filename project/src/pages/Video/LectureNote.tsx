import "react-quill/dist/quill.snow.css";
import styles from "./LectureNote.module.css";
import Editor from "../../components/Note/Editor";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

// Editor 컴포넌트의 prop 타입 정의 수정
export interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}
export default function LectureNote() {
  const contentInput = useRef();
  const [content, setContent] = useState("");
  // LectureNote 컴포넌트 내부에서 handleSubmit 수정
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(content);
  }

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.quill}`}>
        <form onSubmit={handleSubmit}>
          <Editor value={content} onChange={setContent} />
          <button className={`${styles.submit}`} type="submit">
            저장
          </button>
        </form>
      </div>
    </div>
  );
}
