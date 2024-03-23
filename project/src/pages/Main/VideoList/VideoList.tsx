import React, { Component, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  VideoNextArrow,
  VideoPrevArrow,
} from "../../../components/Slider/Arrow";
import "./VideoList.css";
import { dummyThumbnails } from "./VideoDummy";
import VideoPreview from "./VideoPreview";

function VideoList() {
  const [hoverIndex, setHoverIndex] = useState<number>(0);
  let sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 500,
    nextArrow: <VideoNextArrow />,
    prevArrow: <VideoPrevArrow />,
    appendDots: (dots: any) => (
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom",
  };

  return (
    <div>
      <div className="taste">
        <div className="vid-title">
          <span>서또카늘</span>님의 취향저격 컨텐츠
        </div>
        <div>
          <Slider {...sliderSettings}>
            {dummyThumbnails.map((data, index) => (
              <div
                className="slick-slide v-container y-carousel"
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(-1)}
                style={{ position: "relative", transition: "all 0.3s" }}
              >
                <img src={data.imageUrl}></img>
                {hoverIndex === index && (
                  <div className="thumbnail" style={{ transition: "0.5s" }}>
                    <VideoPreview video={data} index={index} />
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="vid-title">
        <span>10대 남성</span>이 좋아하는 컨텐츠
      </div>
      <div>
        <Slider {...sliderSettings}>
          {dummyThumbnails.map((data, index) => (
            <div
              className="slick-slide v-container y-carousel"
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
              style={{ position: "relative", transition: "all 0.3s" }}
            >
              <img src={data.imageUrl}></img>
              {hoverIndex === index && (
                <div className="thumbnail" style={{ transition: "0.5s" }}>
                  <VideoPreview video={data} index={index} />
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default VideoList;
