import styles from "./IsBookMark.module.css";
import bmtrue from "../../assets/material-symbols_bookmark.png";
import bmfalse from "../../assets/bookmark.png";
import axios from "axios";
import { useState } from "react";

interface BookmarkProp {
  videoId?: number;
}

export default function IsBookMark({ videoId }: BookmarkProp) {
  const [isBookmark, setIsBookmark] = useState(false);
  const dummyUser = 1;
  const handleToggleBookmark = async () => {
    try {
      // 토글 위해 현재 상태랑 반대 값 설정
      const newBookMark = !isBookmark;
      setIsBookmark(newBookMark);

      // 북마크 상태에 따라서 북마크 추가/삭제 api 호출 ㄱㄱ
      if (newBookMark) {
        const response = await axios.post(`/video-service/bookmarkVideo`, {
          userId: dummyUser,
          videoId: videoId,
        });

        console.log("북마크 추가 성공", response.data);
      } else {
        // 삭제 api
        const res = await axios.delete(`/video-service/bookmarkVideo`, {
          data: {
            userId: dummyUser,
            videoId: videoId,
          },
        });
        console.log("북마크 삭제 성공", res.data);
      }
    } catch (error) {
      console.error("북마크 실패", error);
    }
  };

  return (
    <div className={`${styles.container}`} onClick={handleToggleBookmark}>
      <img src={isBookmark ? bmtrue : bmfalse} />
    </div>
  );
}
