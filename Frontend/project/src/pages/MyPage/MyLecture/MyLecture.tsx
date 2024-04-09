import styles from "./MyLecture.module.css";
import { MouseEvent, useState } from "react";
import WatchingVideoSlide from "../../../components/Video/WatchingVideoSlide";
import WatchedVideoSlide from "../../../components/Video/WatchedVideoSlide";
import BookMarkedVideoSlide from "../../../components/Video/BookMarkedVideoSlide";
import Watching from "./Watching";
import { useNavigate } from "react-router-dom";
import Watched from "./Watched";
import BookMarked from "./BookMarked";

type section = "watching" | "watched" | "bookmarked" | null;

export default function MyLecture() {
  const navigate = useNavigate();
  const [slideIdx, setSlideIdx] = useState(0);
  const [viewAll, setViewAll] = useState<section>(null);

  const handleClickAll =
    (section: section) => (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setViewAll(section);
      // navigate(`${section}`);
    };

  return (
    <div className={`${styles.container}`}>
      {viewAll === null && (
        <>
          <div className={`${styles.content}`}>
            <div className={`${styles.text}`}>
              <div className={`${styles.title}`}>시청중인 강의</div>
              <div
                className={`${styles.all}`}
                onClick={handleClickAll("watching")}
              >
                모두보기
              </div>
            </div>
            <div className={`${styles.videoList}`}>
              <WatchingVideoSlide />
            </div>
          </div>
          <div className={`${styles.content}`}>
            <div className={`${styles.text}`}>
              <div className={`${styles.title}`}>시청완료 강의</div>
              <div
                className={`${styles.all}`}
                onClick={handleClickAll("watched")}
              >
                모두보기
              </div>
            </div>
            <div className={`${styles.videoList}`}>
              <WatchedVideoSlide />
            </div>
          </div>
          <div className={`${styles.content}`}>
            <div className={`${styles.text}`}>
              <div className={`${styles.title}`}>북마크한 강의</div>
              <div
                className={`${styles.all}`}
                onClick={handleClickAll("bookmarked")}
              >
                모두보기
              </div>
            </div>
            <div className={`${styles.videoList}`}>
              <BookMarkedVideoSlide />
            </div>
          </div>
        </>
      )}
      {viewAll === "watching" && (
        <div>
          <Watching />
        </div>
      )}
      {viewAll === "watched" && (
        <div>
          <Watched />
        </div>
      )}
      {viewAll === "bookmarked" && (
        <div>
          <BookMarked />
        </div>
      )}
    </div>
  );
}
