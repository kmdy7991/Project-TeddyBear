import { useEffect, useState } from "react";
import { MyPageNextArrow, MyPagePrevArrow } from "../Slider/Arrow";
import Slider from "react-slick";
import "./WatchingVideoSlide.css";
import { VideoResultProps } from "../../pages/Main/VideoList/Video";
import { getWatchedVideoList } from "./MyLectureAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
export default function WatchedVideoSlide() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [watchedSlideList, setWatchedSlideList] = useState<VideoResultProps[]>(
    []
  );
  let myPageSlider = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <MyPageNextArrow />,
    prevArrow: <MyPagePrevArrow />,
  };

  const userId = useSelector((state: RootState) => state.user.userId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedWatchedList = async () => {
      try {
        const watchedList = await getWatchedVideoList(userId);
        console.log("시청완료 영상 조회 성공", watchedList);
        setWatchedSlideList(watchedList);
      } catch (error) {
        console.error("시청완료 영상 조회 실패", error);
      }
    };
    fetchedWatchedList();
  }, []);

  return (
    <>
      {watchedSlideList && watchedSlideList.length > 0 ? (
        <Slider {...myPageSlider}>
          {watchedSlideList.map((data, index) => (
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
        <div className="no-content">시청완료된 영상이 없습니다.</div>
      )}
    </>
  );
}
