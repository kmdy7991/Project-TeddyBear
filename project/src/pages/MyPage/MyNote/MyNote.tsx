import styles from "./MyNote.module.css";
import dummy from "./NoteDummy.json";
export default function MyNote() {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.tdtext}`}>
        <div className={`${styles.title}`}>내 강의노트</div>
        <div className={`${styles.detail}`}>
          강의를 들으며 기록한 내용을 확인해보세요.
        </div>
      </div>
      <div className={`${styles.noteList}`}>
        {dummy.map((data, index) => (
          <div className={`${styles.note}`} key={index}>
            <div className={`${styles.text}`}>
              <div className={`${styles.vidTitle}`}>{data.title}</div>
              <div className={`${styles.noteContent}`}>{data.content}</div>
            </div>
            <div className={`${styles.created}`}>{data.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
