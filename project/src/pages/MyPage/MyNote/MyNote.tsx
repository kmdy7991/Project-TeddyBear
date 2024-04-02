import { useEffect, useState } from "react";
import styles from "./MyNote.module.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface noteProp {
  id?: number;
  note?: string;
  noteDate?: string;
}

export default function MyNote() {
  const userId = useSelector((state: RootState) => state.user.userId);
  console.log(userId);
  const [notes, setNotes] = useState<noteProp[]>([]);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchNoteList = async () => {
      try {
        const response = await axios.get(`/api/video-service/notes/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log("노트 리스트 조회 성공", response.data);
        setNotes(response.data);
      } catch (error) {
        console.error("노트 리스트 조회 실패", error);
      }
    };
    fetchNoteList();
  }, [userId]);
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.tdtext}`}>
        <div className={`${styles.title}`}>내 강의노트</div>
        <div className={`${styles.detail}`}>
          강의를 들으며 기록한 내용을 확인해보세요.
        </div>
      </div>
      <div className={`${styles.noteList}`}>
        {notes.map((data, index) => (
          <div className={`${styles.note}`} key={index}>
            <div className={`${styles.text}`}>
              <div className={`${styles.vidTitle}`}>{data.id}</div>
              <div className={`${styles.noteContent}`}>{data.note}</div>
            </div>
            <div className={`${styles.created}`}>{data.noteDate}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
