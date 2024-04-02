import { MyPagePrevArrow, MyPageNextArrow } from "../Slider/Arrow";
import Slider from "react-slick";
import { dummyThumbnails } from "../../pages/Main/VideoList/VideoDummy";
import "./WatchingVideoSlide.css";
import { useEffect, useState } from "react";
import { VideoResultProps } from "../../pages/Main/VideoList/Video";
import { getWatchingVideoList } from "./MyLectureAPI";
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

  useEffect(() => {
    const fetchedWatchingList = async () => {
      const userId = 2;
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
      {watchingSlideList.length > 0 ? (
        <Slider {...myPageSlider}>
          {dummyThumbnails.map((data, index) => (
            <div
              className="thumb"
              key={index}
              onMouseEnter={() => setSlideIdx(index)}
              onMouseLeave={() => setSlideIdx(-1)}
              style={{ position: "relative", transition: "all 0.3s" }}
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
