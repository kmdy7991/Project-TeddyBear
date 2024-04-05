import { MyPagePrevArrow, MyPageNextArrow } from "../Slider/Arrow";
import Slider from "react-slick";
import { dummyThumbnails } from "../../pages/Main/VideoList/VideoDummy";
import "./WatchingVideoSlide.css";
import { useEffect, useState } from "react";
import { VideoResultProps } from "../../pages/Main/VideoList/Video";
import { getWatchingVideoList } from "./MyLectureAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
export default function WatchingVideoSlide() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [watchingSlideList, setWatchingSlideList] = useState<
    VideoResultProps[]
  >([]);
  let myPageSlider = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <MyPageNextArrow />,
    prevArrow: <MyPagePrevArrow />,
  };
  const navigate = useNavigate();

  const userId = useSelector((state: RootState) => state.user.userId);

  useEffect(() => {
    const fetchedWatchingList = async () => {
      try {
        const watchingList = await getWatchingVideoList(userId);
        console.log("시청중인 영상 조회 성공", watchingList);
        setWatchingSlideList(watchingList);
      } catch (error) {
        console.error("시청중인 영상 조회 실패", error);
      }
    };
    fetchedWatchingList();
  }, []);

  return (
    <>
      {watchingSlideList && watchingSlideList.length > 0 ? (
        <Slider {...myPageSlider}>
          {watchingSlideList.map((data, index) => (
            <div
              className="thumb"
              key={index}
              onMouseEnter={() => setSlideIdx(index)}
              onMouseLeave={() => setSlideIdx(-1)}
              style={{ position: "relative", transition: "all 0.3s" }}
              onClick={() => navigate(`/video/${data.id}`)}
            >
              <img src={data.videoThumbnail}></img>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="no-content">시청중인 영상이 없습니다.</div>
      )}
    </>
  );
}
