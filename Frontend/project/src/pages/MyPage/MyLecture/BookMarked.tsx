import "./Watching.css";
import { MouseEvent, useEffect, useState } from "react";
import prev from "../../../assets/prevarrow.png";
import Watched from "./Watched";
import { VideoResultProps } from "../../Main/VideoList/Video";
import { getBookMarkedVideoList } from "../../../components/Video/MyLectureAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { loadingActions } from "../../../store/loading";
import Loading from "../../../components/Loading";
export default function BookMarked() {
  const [isBookMarked, setIsBookMarked] = useState(true);
  const [bookmarkList, setBookmarkList] = useState<VideoResultProps[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: RootState) => state.loading["BOOKMARK-LIST"]
  );

  const userId = useSelector((state: RootState) => state.user.userId);

  useEffect(() => {
    const fetchBookMarkList = async () => {
      dispatch(loadingActions.startLoading("BOOKMARK-LIST"));
      try {
        const bookmarkedVideos = await getBookMarkedVideoList(userId);
        setBookmarkList(bookmarkedVideos);
        console.log("북마크 영상 조회 성공", bookmarkedVideos);
      } catch (error) {
        console.error("북마크 영상 조회 실패:", error);
      } finally {
        dispatch(loadingActions.finishLoading("BOOKMARK-LIST"));
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
      {loading && <Loading />}
      <div className="myContent">
        <div className="bnt">
          {isBookMarked && <div className="myTitle">북마크한 강의</div>}
          <div className="myBtn">
            <button onClick={handleClickPrev}>
              <img className="myBtnImg" src={prev} />
            </button>
          </div>
        </div>
        {bookmarkList && bookmarkList.length > 0 ? (
          <div className="myVideoList">
            {bookmarkList.map((data, index) => (
              <div
                className="myVideo"
                key={index}
                onClick={() => navigate(`/video/${data.id}`)}
              >
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
        ) : (
          <div className="no-content-mypage">북마크한 영상이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
