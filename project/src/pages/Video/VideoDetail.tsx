import Nav from "../../components/Nav/Nav";
import styles from "./VideoDetail.module.css";
import mic from "../../assets/voice.png";
import note from "../../assets/note.png";
import word from "../../assets/word.png";
import YouTube from "react-youtube";
// import CategoryDummy from "../../components/Video/CategoryDummy";
import dummy from "./DummyVideoData.json";
import { MouseEvent, useEffect, useState } from "react";
import Slider from "react-slick";
import { PagePrevArrow, PageNextArrow } from "../../components/Slider/Arrow";
import Shadowing from "./Shadowing";
import Word from "./Word";
import LectureNote from "./LectureNote";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useParams } from "react-router-dom";
import axios from "axios";
import { VideoResultProps } from "../Search/Search";
type tab = "mic" | "note" | "word";

export interface ShadowingProps {
  selectedLine: string | null;
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
  const [videoScript, setVideoScript] = useState([]);
  // 각 탭 버튼 클릭 활성화를 위한 useState(default는 쉐도잉 버튼으로)
  const [activeTab, setActiveTab] = useState<tab>("mic");
  // pathvariable로 videoId를 받는당
  const { videoId } = useParams();
  console.log(videoId);
  // videoId에 해당하는 videoData 받기
  const [videoData, setVideoData] = useState<VideoResultProps | null>(null);

  useEffect(() => {
    // get
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`/video-service/video/${videoId}`);
        setVideoData(response.data); // 서버 응답을 videoData 상태에 저장
        console.log(response.data);
      } catch (error) {
        console.error("비디오 상세 조회 실패:", error);
      }
    };
    if (videoId) {
      fetchVideoData();
    }
  }, [videoId]);

  // useEffect(() => {
  //   if (videoData && videoData.videoScripts) {
  //     // videoData에서 비디오 스크립트 데이터를 추출하여 videoScripts 상태에 저장
  //     setVideoScripts(videoData.videoScripts);
  //   }
  // }, [videoData]); // videoData가 변경될 때마다 실행

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
  const currentItems = dummy.video_transcript.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // 전체 페이지 수 계산
  const pageCount = Math.ceil(dummy.video_transcript.length / itemsPerPage);
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

  function renderComponent() {
    const selectedScriptLine =
      selectedScriptIdx !== null
        ? dummy.video_transcript[selectedScriptIdx]
        : null;
    switch (activeTab) {
      case "mic":
        return <Shadowing selectedLine={selectedScriptLine} />;
      case "word":
        return <Word />;
      case "note":
        return <LectureNote />;

      default:
        return <Shadowing selectedLine={selectedScriptLine} />;
    }
  }

  return (
    <div className={`${styles.container}`}>
      <Nav />
      <div className={`${styles.main}`}>
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
            <div className={`${styles.videoTitle}`}>
              {videoData?.videoTitle}
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
            <div>
              <button
                className={`${styles.tabButton}`}
                onClick={handleClickTab("word")}
              >
                <img src={word} alt="단어장" />
              </button>
            </div>
          </div>
          <div className={`${styles.script}`}>
            <div className={`${styles.scriptContainer}`}>
              <div className={`${styles.scriptContainer}`}>
                {currentItems.map((line, localIndex) => {
                  // 현재 페이지의 첫 번째 항목의 전역 인덱스를 계산
                  const globalIndex =
                    (currentPage - 1) * itemsPerPage + localIndex;
                  return (
                    <p
                      className={`${styles.scriptL}`}
                      key={globalIndex} // 키는 전역 인덱스를 사용
                      onClick={() => handleScriptClick(globalIndex)} // 마우스 오버 시 전역 인덱스를 사용
                      // onMouseLeave={handleScriptLeave}
                    >
                      <span
                        className={`${styles.scriptLine} ${
                          selectedScriptIdx === globalIndex
                            ? styles.highlight
                            : ""
                        }`}
                      >
                        {line}
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
                    className="pageIdx"
                    onMouseEnter={() => setScriptIdx(index)}
                    onMouseLeave={() => setScriptIdx(-1)}
                    style={{ position: "relative", transition: "all 0.3s" }}
                  >
                    <button key={number} onClick={() => paginate(number)}>
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
