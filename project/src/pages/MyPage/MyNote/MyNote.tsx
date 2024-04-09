import { MouseEvent, useEffect, useState } from "react";
import styles from "./MyNote.module.css";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface noteProp {
  id: number;
  note?: string;
  noteDate?: string;
  videoId?: number;
  videoTitle?: string;
}

export default function MyNote() {
  const userId = useSelector((state: RootState) => state.user.userId);
  console.log(userId);
  const navigate = useNavigate();
  const [notes, setNotes] = useState<noteProp[]>([]);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    // 노트 리스트 조회
    const fetchNoteList = async () => {
      try {
        const response = await axios.get(`/api/video-service/notes/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        // 노트 상세 정보 조회
        const notesWithDetails = await Promise.all(
          response.data.map(async (note: noteProp) => {
            const detailResponse = await axios.get(
              `/api/video-service/note/${note.id}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
            return detailResponse.data;
          })
        );
        setNotes(notesWithDetails);
        console.log("노트 상세 조회:", notes);
      } catch (error) {
        console.error("노트 리스트 조회 실패", error);
      }
    };

    fetchNoteList();
  }, [userId, accessToken]);

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
          <div
            className={`${styles.note}`}
            key={index}
            onClick={() => navigate(`/video/${data.videoId}`)}
          >
            <div className={`${styles.text}`}>
              <div className={`${styles.vidTitle}`}>{data.videoTitle}</div>
              <div
                className={`${styles.noteContent}`}
                dangerouslySetInnerHTML={{ __html: data.note || "" }} // note가 null이거나 undefined 일 수 있으니, 또는 연산자(||)로 빈 문자열을 기본값으로 제공합니다.
              />
            </div>
            <div className={`${styles.created}`}>{data.noteDate}</div>
            <div className={`${styles.created}`}>{data.noteDate}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
