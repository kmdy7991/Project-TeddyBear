import styles from "./IsBookMark.module.css";
import bmtrue from "../../assets/material-symbols_bookmark.png";
import bmfalse from "../../assets/bookmark.png";
import axios from "axios";
import { useEffect, useState } from "react";

interface BookmarkProp {
  videoId?: number;
}

export default function IsBookMark({ videoId }: BookmarkProp) {
  const [isBookmark, setIsBookmark] = useState(false);
  const dummyUser = 2;

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (videoId) {
        // videoId가 존재할 때만 API 호출
        try {
          const response = await axios.get(
            `/video-service/bookmarkVideo/isExist`,
            {
              params: {
                userId: dummyUser,
                videoId: videoId,
              },
            }
          );
          console.log("북마크 조회 성공", response.data);
          setIsBookmark(response.data); // API 응답에 따라 북마크 상태 업데이트
        } catch (err) {
          console.error("북마크 조회 실패", err);
          setIsBookmark(false); // 오류 발생 시 북마크 상태를 false로 설정
        }
      }
    };
    checkBookmarkStatus();
  }, [videoId]); // videoId가 변경될 때마다 함수를 다시 호출
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
    <div className={styles.container} onClick={handleToggleBookmark}>
      {isBookmark === null ? (
        <div>Loading...</div> // 로딩 상태 표시
      ) : (
        <img src={isBookmark ? bmtrue : bmfalse} alt="Bookmark" />
      )}
    </div>
  );
}
