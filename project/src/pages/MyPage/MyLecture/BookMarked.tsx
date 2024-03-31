import "./Watching.css";
import { dummyThumbnails } from "../../Main/VideoList/VideoDummy";
import { MouseEvent, useEffect, useState } from "react";
import prev from "../../../assets/prevarrow.png";
import Watched from "./Watched";
import { VideoResultProps } from "../../Main/VideoList/Video";
import { getBookMarkedVideoList } from "../../../components/Video/BookmarkList";
export default function BookMarked() {
  const [isBookMarked, setIsBookMarked] = useState(true);
  const [bookmarkList, setBookmarkList] = useState<VideoResultProps[]>([]);

  useEffect(() => {
    const fetchBookMarkList = async () => {
      const userId = 1;
      try {
        const bookmarkedVideos = await getBookMarkedVideoList(userId);
        setBookmarkList(bookmarkedVideos);
      } catch (error) {
        console.error("북마크 영상 조회 실패:", error);
      }
    };
    fetchBookMarkList();
  }, []);

  function handleClickPrev(e: MouseEvent<HTMLButtonElement>) {
    setIsBookMarked(false);
  }

  if (!isBookMarked) {
    return <Watched />;
  }
  return (
    <div className="myContainer">
      <div className="myContent">
        <div className="bnt">
          {isBookMarked && <div className="myTitle">북마크한 강의</div>}
          <div className="myBtn">
            <button onClick={handleClickPrev}>
              <img className="myBtnImg" src={prev} />
            </button>
          </div>
        </div>
        <div className="myVideoList">
          {bookmarkList.map((data, index) => (
            <div className="myVideo" key={index}>
              <div className="myVidImg">
                <img className="myBtnImg" src={data.videoThumbnail} />
              </div>
              <div className="myText">
                <div className="myVidTitle">{data.videoTitle}</div>
                <div className="myDescription">{data.videoDiscription}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
