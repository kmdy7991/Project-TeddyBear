import Nav from "../../components/Nav/Nav";
import styles from "./VideoDetail.module.css";
import mic from "../../assets/voice.png";
import note from "../../assets/note.png";
import word from "../../assets/word.png";
import YouTube from "react-youtube";
import { MouseEvent, useEffect, useState } from "react";
import Slider from "react-slick";
import { PagePrevArrow, PageNextArrow } from "../../components/Slider/Arrow";
import Shadowing from "./Shadowing";
import Word from "./Word";
import LectureNote from "./LectureNote";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { VideoResultProps } from "../Main/VideoList/Video";
import IsBookMark from "../../components/Video/IsBookMark";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { loadingActions } from "../../store/loading";
import Loading from "../../components/Loading";
import dotted from "../../assets/dotted.png";
import { Root } from "react-dom/client";
type tab = "mic" | "note" | "word";

export interface ShadowingProps {
  selectedLine: string | null;
}

export interface ScriptProps {
  id?: number | null;
  content?: string | null;
  videoId?: string | null;
}

export default function VideoDetail() {
  // ----페이지네이션을 위한 요소들---
  // 현재 페이지 번호 추적
  const [currentPage, setCurrentPage] = useState(1);
  const [scriptIdx, setScriptIdx] = useState(0);
  const [selectedScriptIdx, setSelectedScriptIdx] = useState<number | null>(
    null
  );

  // 비디오id에 해당하는 스크립트 불러오기
  const [videoScript, setVideoScript] = useState<ScriptProps[]>([]);
  // 각 탭 버튼 클릭 활성화를 위한 useState(default는 쉐도잉 버튼으로)
  const [activeTab, setActiveTab] = useState<tab>("mic");
  // pathvariable로 videoId를 받는당
  const { videoId } = useParams();
  console.log(videoId);
  // videoId에 해당하는 videoData 받기
  const [videoData, setVideoData] = useState<VideoResultProps | null>(null);

  // 설명란 더보기 버튼을 위한 상태변경
  const [showFullDescription, setShowFullDescription] = useState(false);
  // 더보기 버튼 클릭 핸들러
  const handleClickFullDes = (e: MouseEvent<HTMLButtonElement>) => {
    setShowFullDescription(!showFullDescription);
  };

  const dispatch = useDispatch();
  const videoLoading = useSelector(
    (state: RootState) => state.loading["VIDEO"]
  );
  const scriptLoading = useSelector(
    (state: RootState) => state.loading["SCRIPT"]
  );
  // 유저 아이디 꺼내오기
  const userId = useSelector((state: RootState) => state.user.userId);

  const [watching, setWatching] = useState();

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("token");
  const [videoStringId, setVideoStringId] = useState("");

  useEffect(() => {
    // getVideoDetail
    const fetchVideoData = async () => {
      try {
        dispatch(loadingActions.startLoading("VIDEO"));
        const response = await axios.get(
          `/api/video-service/video/${videoId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setVideoData(response.data); // 서버 응답을 videoData 상태에 저장
        console.log(response.data);
        setVideoStringId(response.data.videoId);
      } catch (error) {
        console.error("비디오 상세 조회 실패:", error);
      } finally {
        dispatch(loadingActions.finishLoading("VIDEO"));
      }
    };
    if (videoId) {
      fetchVideoData();
    }
  }, [videoId]);

  // getScript
  useEffect(() => {
    const fetchScript = async () => {
      if (videoData && videoData.videoId) {
        try {
          dispatch(loadingActions.startLoading("SCRIPT"));
          console.log(videoData.videoId);
          const response = await axios.get(
            `/api/script-service/script/${videoData.videoId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          setVideoScript(response.data);
        } catch (error) {
          console.error("스크립트 상세 조회 실패:", error);
        } finally {
          dispatch(loadingActions.finishLoading("SCRIPT"));
        }
      }
    };

    if (videoData) {
      fetchScript();
    }
  }, [videoData]);

  // 페이지네이션을 위한 슬라이더
  let scriptSlider = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 500,
    nextArrow: <PageNextArrow />,
    prevArrow: <PagePrevArrow />,
  };
  // 각 페이지 당 스크립트 25줄 넣는 게 적당한듯
  const itemsPerPage = 25;

  // 현재 페이지에 해당하는 스크립트 줄을 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // slice 메서드 활용해서 현재 페이지의 첫번째~마지막 줄 가져오기
  const currentItems = videoScript.slice(indexOfFirstItem, indexOfLastItem);

  // 전체 페이지 수 계산
  const pageCount = Math.ceil(videoScript.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }
  // 페이지 변경하는 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleClickTab = (tab: tab) => (e: MouseEvent<HTMLButtonElement>) => {
    console.log(tab);
    setActiveTab(tab);
  };

  const handleScriptClick = (index: number) => {
    setSelectedScriptIdx(index);
  };

  const handleWatch = async () => {
    try {
      console.log(userId, videoId);
      const response = await axios.post(
        `/api/video-service/watch`,
        {
          videoWatched: false,
          userId: userId, // 직접 참조
          videoId: videoData?.id, // 직접 참조
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("시청중인 영상 생성", response.data);
    } catch (error) {
      console.error("시청중인 영상 생성 실패", error);
    }
  };
  console.log(videoId);

  function renderComponent() {
    const selectedScriptLine =
      selectedScriptIdx !== null && videoScript[selectedScriptIdx]
        ? videoScript[selectedScriptIdx].content // 문자열을 가져옵니다.
        : null; // `selectedScriptIdx`가 `null`이거나 `content`가 `undefined`인 경우 `null`을 반환합니다.
    switch (activeTab) {
      case "mic":
        return <Shadowing selectedLine={selectedScriptLine || null} />;
      case "note":
        if (videoData && videoData.id !== undefined) {
          // videoData가 존재하고, videoData.id가 undefined가 아니라면
          return <LectureNote userId={userId} videoId={videoData.id} />; // videoId를 number로 전달합니다.
        } else {
          return null;
        }
      default:
        return <Shadowing selectedLine={selectedScriptLine || null} />;
    }
  }

  return (
    <div className={`${styles.container}`}>
      <Nav />
      <div className={`${styles.main}`} onClick={handleWatch}>
        {videoLoading && scriptLoading && <Loading />}
        <div className={`${styles.youtube}`}>
          <div className={`${styles.vidWrapper}`}>
            <YouTube
              videoId={videoData?.videoId}
              opts={{
                width: "100%",
                height: "550",
                playerVars: {
                  autoplay: 1, //자동재생 O
                  rel: 0, //관련 동영상 표시하지 않음
                  modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                },
              }}
            ></YouTube>
          </div>
          <div className={`${styles.videoText}`}>
            <div className={`${styles.tb}`}>
              <div className={`${styles.videoTitle}`}>
                {videoData?.videoTitle}
              </div>
              <div className={`${styles.testBtn} ${styles.tooltip}`}>
                {/* App.tsx에서 학습완료페이지/:비디오번호로 동적 수정해야함 */}
                <button
                  onClick={() =>
                    // videoData?.id를 쿼리 파라미터로 전달
                    navigate(`/test/${videoStringId}?id=${videoData?.id}`)
                  }
                >
                  <img src={dotted} alt="학습중" />
                </button>
                <span className={`${styles.tooltipText}`}>
                  학습을 완료했다면, 테스트를 해보세요!
                </span>
              </div>
              <div className={`${styles.bookmark}`}>
                <IsBookMark videoId={videoData?.id} />
              </div>
            </div>
            {/* {videoData((data, index) => (
              <div className={`${styles.hashList}`}>
                {data.hashtags.map((hash, index) => (
                  <div className={`${styles.hashTag}`} key={index}>
                    {" "}
                    {hash}{" "}
                  </div>
                ))}
              </div>
            ))} */}
            <div className={`${styles.descriptionWrapper}`}>
              <span className={`${styles.description}`}>
                {showFullDescription
                  ? videoData?.videoDiscription
                  : videoData?.videoDiscription?.substring(0, 300)}
              </span>
              {/* 더보기 버튼 */}
              {videoData?.videoDiscription &&
                videoData?.videoDiscription?.length > 30 && (
                  <span className={styles.moreButtonWrap}>
                    {"···"}
                    <button
                      className={styles.moreButton}
                      onClick={handleClickFullDes}
                    >
                      {showFullDescription ? "닫기" : "더보기"}
                    </button>
                  </span>
                )}
            </div>
          </div>
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={activeTab}
              addEndListener={(node, done) =>
                node.addEventListener("transitionend", done, false)
              }
              classNames="fade"
              timeout={300}
            >
              <div className={`${styles.content}`}>{renderComponent()}</div>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div className={`${styles.tabscript}`}>
          <div className={`${styles.tab}`}>
            <div>
              <button
                className={`${styles.tabButton}`}
                onClick={handleClickTab("mic")}
              >
                <img src={mic} alt="녹음" />
              </button>
            </div>
            <div>
              <button
                className={`${styles.tabButton}`}
                onClick={handleClickTab("note")}
              >
                <img src={note} alt="강의노트" />
              </button>
            </div>
          </div>
          <div className={`${styles.script}`}>
            <div className={`${styles.scriptContainer}`}>
              <div className={`${styles.scriptContainer}`}>
                {currentItems.map((script, localIndex) => {
                  const globalIndex =
                    (currentPage - 1) * itemsPerPage + localIndex;
                  return (
                    <p
                      className={`${styles.scriptL}`}
                      key={globalIndex}
                      onClick={() => handleScriptClick(globalIndex)}
                    >
                      <span
                        className={`${styles.scriptLine} ${
                          selectedScriptIdx === globalIndex
                            ? styles.highlight
                            : ""
                        }`}
                      >
                        {script.content} {/* 여기서 content 속성을 렌더링 */}
                      </span>
                    </p>
                  );
                })}
              </div>
            </div>
            <div className={`${styles.pagination}`}>
              <Slider {...scriptSlider}>
                {pageNumbers.map((number, index) => (
                  <div
                    key={index}
                    className="pageIdx"
                    onMouseEnter={() => setScriptIdx(index)}
                    onMouseLeave={() => setScriptIdx(-1)}
                    style={{ position: "relative", transition: "all 0.3s" }}
                  >
                    <button
                      key={number} // key를 button 태그에 적용합니다.
                      onClick={() => paginate(number)}
                      onMouseEnter={() => setScriptIdx(number - 1)} // 인덱스 조정
                      onMouseLeave={() => setScriptIdx(-1)}
                      style={{ position: "relative", transition: "all 0.3s" }}
                    >
                      {number}
                    </button>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
