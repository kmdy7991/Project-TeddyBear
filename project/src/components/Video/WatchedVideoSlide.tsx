import { useState } from "react";
import { MyPageNextArrow, MyPagePrevArrow } from "../Slider/Arrow";
import Slider from "react-slick";
import { dummyThumbnails } from "../../pages/Main/VideoList/VideoDummy";
import "./WatchingVideoSlide.css";
export default function WatchedVideoSlide() {
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
          <img src={data.imageUrl}></img>
        </div>
      ))}
    </Slider>
  );
}
