import { useNavigate, useParams } from "react-router-dom";
import Categories from "./Category";
import styles from "./CategoryVideoList.module.css";
import Nav from "../Nav/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user";
import { RootState } from "../../store";
import { loadingActions } from "../../store/loading";
import { VideoResultProps } from "../../pages/Main/VideoList/Video";
import Loading from "../Loading";
import { CateNextArrow, CatePrevArrow } from "../Slider/Arrow";
import Slider from "react-slick";
export default function CategoryVideoList() {
  let { categoryName } = useParams<{ categoryName?: string }>();
  const [videoIdList, setVideoIdList] = useState([]);
  const [videoList, setVideoList] = useState<VideoResultProps[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(
    (state: RootState) => state.loading["CATEGORY-LIST"]
  );

  // 각 카테고리 색상 정보를 담는 타입 정의
  interface ColorInfo {
    startColor: string;
    middleColor: string;
    endColor: string;
  }

  // 수정된 CategoryColors 인터페이스
  interface CategoryColors {
    [category: string]: ColorInfo;
    사회: ColorInfo;
    정치: ColorInfo;
    경제: ColorInfo;
    생활문화: ColorInfo;
    IT과학: ColorInfo;
    스포츠: ColorInfo;
    세계: ColorInfo;
  }

  const categoryColors: CategoryColors = {
    사회: {
      startColor: "#FF99CF",
      middleColor: "#9D5D88",
      endColor: "#402544",
    },
    정치: {
      startColor: "#3392FF",
      middleColor: "#3A589C",
      endColor: "#402544",
    },
    경제: {
      startColor: "#D67BE5",
      middleColor: "#8C5095",
      endColor: "#402544",
    },
    생활문화: {
      startColor: "#00C299",
      middleColor: "#20736E",
      endColor: "#402544",
    },
    IT과학: {
      startColor: "#FFD155",
      middleColor: "#A07C4D",
      endColor: "#402544",
    },
    스포츠: {
      startColor: "#02AF70",
      middleColor: "#226759",
      endColor: "#402544",
    },
    세계: {
      startColor: "#FDC699",
      middleColor: "#9D746E",
      endColor: "#402544",
    },
  };

  const gradientStyle = categoryName
    ? {
        background: `linear-gradient(${
          categoryColors[categoryName]?.startColor || "#FFFFFF"
        }, ${categoryColors[categoryName]?.middleColor}, ${
          categoryColors[categoryName]?.endColor
        })`,
      }
    : { background: "#FFFFFF" }; // 색상 코드에 대한 올바른 처리

  // 검색 결과 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]); // 페이지 번호 상태 추가
  // 각 페이지 당 비디오 10개씩
  const videosPerPage = 10;

  // 페이지네이션을 위한 슬라이더
  let scriptSlider = {
    dots: false,
    infinite: false,
    slidesToShow: 10,
    slidesToScroll: 10,
    speed: 500,
    nextArrow: <CateNextArrow />,
    prevArrow: <CatePrevArrow />,
  };

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videoList
    ? videoList.slice(indexOfFirstVideo, indexOfLastVideo)
    : [];

  useEffect(() => {
    const fetchVideoDetailsInBatches = async (videos: string[]) => {
      const batchSize = 20; // 한 번에 처리할 요청의 수
      let detailedVideos = [];

      for (let i = 0; i < videos.length; i += batchSize) {
        const batch = videos.slice(i, i + batchSize);
        // axios.get 요청을 병렬로 처리하되, 실패한 요청은 걸러냅니다.
        const responses = await Promise.allSettled(
          batch.map((video: string) =>
            axios
              .get(`/api/video-service/videoDetail/${video}`)
              .catch((error) => null)
          )
        );
        // 성공한 요청의 결과만 추출합니다.
        detailedVideos.push(
          ...responses
            .filter(
              (result) => result.status === "fulfilled" && result.value !== null
            )
            .map((result: any) => result.value.data)
        );
      }

      return detailedVideos;
    };

    const fetchVideoList = async () => {
      try {
        dispatch(loadingActions.startLoading("CATEGORY-LIST"));
        const response = await axios.get(
          `/api/category-service/category/${categoryName}`
        );
        const videos = response.data;
        const detailedVideos = await fetchVideoDetailsInBatches(videos);
        setVideoList(detailedVideos);
      } catch (error) {
        console.error("카테고리 비디오 리스트 조회 실패", error);
      } finally {
        dispatch(loadingActions.finishLoading("CATEGORY-LIST"));
      }
    };

    fetchVideoList();
  }, [categoryName, dispatch]);

  useEffect(() => {
    // 검색 결과가 변경될 때 페이지 번호 업데이트
    if (videoList) {
      const pageCount = Math.ceil(videoList.length / videosPerPage);
      const newPageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
      setPageNumbers(newPageNumbers);
    }
  }, [videoList, videosPerPage]);

  // 카테고리 데이터를 사용한 렌더링 로직
  return (
    <>
      {loading && <Loading />}
      <div className={`${styles.container}`} style={gradientStyle}>
        <Nav />
        <div className={`${styles.category}`}>{categoryName}</div>
        <div className={`${styles.videolist}`}>
          {currentVideos?.map((video) => (
            <div
              className={`${styles.video}`}
              onClick={() => navigate(`/video/${video.id}`)}
            >
              <div className={`${styles.videoImg}`}>
                <img src={video.videoThumbnail} alt="썸네일 이미지" />
              </div>
              <div className={`${styles.text}`}>
                <div className={`${styles.dh}`}>
                  <div
                    className={`${styles.dif}`}
                    style={{
                      backgroundColor: categoryName
                        ? categoryColors[categoryName]?.startColor || "#FFFFFF"
                        : "#FFFFFF",
                    }}
                  >
                    {video.videoGrade}
                  </div>
                </div>
                <div className={`${styles.title}`}>{video.videoTitle}</div>
                <div className={`${styles.description}`}>
                  {video.videoDiscription}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.paginate}`}>
          <Slider {...scriptSlider}>
            {pageNumbers.map((number) => (
              <div key={number} className={styles.pageIdx}>
                <button onClick={() => setCurrentPage(number)}>{number}</button>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
