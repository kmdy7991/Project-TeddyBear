import { useEffect, useState } from "react";
import { MyPageNextArrow, MyPagePrevArrow } from "../Slider/Arrow";
import Slider from "react-slick";
import { dummyThumbnails } from "../../pages/Main/VideoList/VideoDummy";
import "./WatchingVideoSlide.css";
import { getBookMarkedVideoList } from "./MyLectureAPI";
import { VideoResultProps } from "../../pages/Main/VideoList/Video";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

// 북마크 비디오 슬라이드 (마이페이지)
export default function BookMarkedVideoSlide() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [bookmarkList, setBookmarkList] = useState<VideoResultProps[]>([]);

  const navigate = useNavigate();

  const userId = useSelector((state: RootState) => state.user.userId);
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
    const fetchBookMarkList = async () => {
      try {
        const bookmarkedVideos = await getBookMarkedVideoList(userId);
        setBookmarkList(bookmarkedVideos);
      } catch (error) {
        console.error("북마크 영상 조회 실패:", error);
      }
    };
    fetchBookMarkList();
  }, []);

  return (
    <>
      {bookmarkList && bookmarkList.length > 0 ? (
        <Slider {...myPageSlider}>
          {bookmarkList.map((data, index) => (
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
        <div className="no-content">북마크한 영상이 없습니다.</div>
      )}
    </>
  );
}
