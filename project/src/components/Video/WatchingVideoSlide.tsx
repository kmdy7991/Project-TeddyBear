import { MyPagePrevArrow, MyPageNextArrow } from "../Slider/Arrow";
import Slider from "react-slick";
import { dummyThumbnails } from "../../pages/Main/VideoList/VideoDummy";
import "./WatchingVideoSlide.css";
import { useState } from "react";
export default function WatchingVideoSlide() {
  const [slideIdx, setSlideIdx] = useState(0);
  let myPageSlider = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 500,
    nextArrow: <MyPageNextArrow />,
    prevArrow: <MyPagePrevArrow />,
  };

  return (
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
  );
}
