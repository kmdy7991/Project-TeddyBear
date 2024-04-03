import "./Watching.css";
import next from "../../../assets/nextarrow.png";
import prev from "../../../assets/prevarrow.png";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { MouseEvent, useEffect, useState } from "react";
import Watched from "./Watched";
import { VideoResultProps } from "../../Main/VideoList/Video";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../../store/loading";
import { RootState } from "../../../store";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router-dom";
import { getWatchingVideoList } from "../../../components/Video/MyLectureAPI";

export default function Watching() {
  //   const navigate = useNavigate();
  const [isWatching, setIsWatching] = useState(true);
  const [watchingList, setWatchingList] = useState<VideoResultProps[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: RootState) => state.loading["WATCHING-LIST"]
  );

  function handleClickNext(e: MouseEvent<HTMLButtonElement>) {
    setIsWatching(false);
  }

  const userId = useSelector((state: RootState) => state.user.userId);

  useEffect(() => {
    const fetchWatchingList = async () => {
      dispatch(loadingActions.startLoading("WATCHING-LIST"));
      try {
        const watchedList = await getWatchingVideoList(userId);
        console.log("시청중인 영상 조회 성공", watchedList);
        setWatchingList(watchedList);
      } catch (error) {
        console.error("시청중인 영상 조회 실패", error);
      } finally {
        dispatch(loadingActions.finishLoading("WATCHING-LIST"));
      }
    };
    fetchWatchingList();
  }, []);

  if (!isWatching) {
    return <Watched />;
  }

  return (
    <TransitionGroup>
      <CSSTransition
        key={isWatching ? "Watching" : "Watched"}
        timeout={300}
        classNames="fade"
      >
        <div className="myContainer">
          {loading && <Loading />}
          <div className="myContent">
            <div className="bnt">
              {isWatching && <div className="myTitle">시청중인 강의</div>}
              <div className="myBtn">
                <button onClick={handleClickNext}>
                  <img className="myBtnImg" src={next} />
                </button>
              </div>
            </div>

            {isWatching ? (
              <>
                {watchingList && watchingList.length > 0 ? (
                  <div className="myVideoList">
                    {watchingList.map((data, index) => (
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
                          <div className="myDescription">
                            {data.videoDiscription}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-content-mypage">
                    시청중인 영상이 없습니다.
                  </div>
                )}
              </>
            ) : (
              <Watched />
            )}
          </div>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
