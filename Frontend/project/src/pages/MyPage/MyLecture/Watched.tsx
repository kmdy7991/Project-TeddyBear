import "./Watching.css";
import next from "../../../assets/nextarrow.png";
import prev from "../../../assets/prevarrow.png";
import { MouseEvent, useEffect, useState } from "react";
import BookMarked from "./BookMarked";
import Watching from "./Watching";
import { CSSTransition } from "react-transition-group";
import { VideoResultProps } from "../../Main/VideoList/Video";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { loadingActions } from "../../../store/loading";
import axios from "axios";
import Loading from "../../../components/Loading";
import { getWatchedVideoList } from "../../../components/Video/MyLectureAPI";

export default function Watched() {
  const [isWatched, setIsWatched] = useState(true);
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);

  const [watchedList, setWatchedList] = useState<VideoResultProps[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: RootState) => state.loading["WATCHED-LIST"]
  );

  const userId = useSelector((state: RootState) => state.user.userId);

  useEffect(() => {
    const fetchWatchedList = async () => {
      dispatch(loadingActions.startLoading("WATCHED-LIST"));
      try {
        const watched = await getWatchedVideoList(userId);
        console.log("시청완료 영상 조회 성공");
        setWatchedList(watched);
      } catch (error) {
        console.log("시청완료 영상 조회 실패", error);
      } finally {
        dispatch(loadingActions.finishLoading("WATCHED-LIST"));
      }
    };
    fetchWatchedList();
  }, []);

  function handleClickNext(e: MouseEvent<HTMLButtonElement>) {
    setIsWatched(false);
    setIsNext(true);
  }

  function handleClickPrev(e: MouseEvent<HTMLButtonElement>) {
    setIsWatched(false);
    setIsPrev(true);
  }

  if (!isWatched && isNext) {
    return <BookMarked />;
  }

  if (!isWatched && isPrev) {
    return <Watching />;
  }

  return (
    <CSSTransition in={isWatched} timeout={300} classNames="fade" unmountOnExit>
      <div className="myContainer">
        {loading && <Loading />}
        <div className="myContent">
          <div className="bnt">
            {isWatched && <div className="myTitle">시청완료 강의</div>}
            <div className="myBtn">
              <button onClick={handleClickPrev}>
                <img className="myBtnImg" src={prev} />
              </button>
              <button onClick={handleClickNext}>
                <img className="myBtnImg" src={next} />
              </button>
            </div>
          </div>
          {watchedList && watchedList.length > 0 ? (
            <div className="myVideoList">
              {watchedList.map((data, index) => (
                <div
                  className="myVideo"
                  key={index}
                  onClick={() => navigate(`/video/${data.id}`)}
                >
                  <div className="myVidImg">
                    <img src={data.videoThumbnail} />
                  </div>
                  <div className="myText">
                    <div className="myVidTitle">{data.videoTitle}</div>
                    <div className="myDescription">{data.videoDiscription}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-content-mypage">시청완료된 영상이 없습니다.</div>
          )}
        </div>
      </div>
    </CSSTransition>
  );
}
