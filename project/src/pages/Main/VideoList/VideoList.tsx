import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import {
  NextArrow,
  VideoNextArrow,
  VideoPrevArrow,
} from "../../../components/Slider/Arrow";
import "./VideoList.css";
import { dummyThumbnails } from "./VideoDummy";
import VideoPreview from "./VideoPreview";
import { VideoResultProps } from "./Video";
import { getBookMarkedVideoList } from "../../../components/Video/BookmarkList";

function VideoList() {
  const [bmHoverIndex, setbmHoverIndex] = useState<number>(0); // 북마크 호버 인덱스
  const [tasteHoverIndex, setTasteHoverIndex] = useState<number>(0); // 취향저격 호버 인덱스
  const [bmList, setBmList] = useState<VideoResultProps[]>([]);

  useEffect(() => {
    const fetchBookMarkList = async () => {
      const userId = 1;
      try {
        const bookmarkedVideos = await getBookMarkedVideoList(userId);
        setBmList(bookmarkedVideos);
      } catch (error) {
        console.error("북마크 영상 조회 실패:", error);
      }
    };
    fetchBookMarkList();
  }, []);

  const sliderSettings = (slidesToShow: number) => {
    return {
      dots: true,
      infinite: true,
      slidesToShow: slidesToShow,
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
  };

  return (
    <div className="vcontainer">
      <div className="주제">
        <div className="vid-title">북마크한 영상</div>
        <div>
          <Slider {...sliderSettings(Math.min(5, bmList.length))}>
            {bmList.map((video, index) => (
              <div
                key={index}
                className="videoContainer"
                onMouseEnter={() => setbmHoverIndex(index)}
                onMouseLeave={() => setbmHoverIndex(-1)}
                style={{ position: "relative", transition: "all 0.3s" }}
              >
                <img src={video.videoThumbnail} alt="비디오 썸네일" />
                {bmHoverIndex === index && (
                  <div className="thumbnail" style={{ transition: "0.5s" }}>
                    <VideoPreview
                      video={video}
                      index={index}
                      hoverIndex={bmHoverIndex}
                    />
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="주제">
        <div className="vid-title">
          <span>서또카늘</span>님의 취향저격 컨텐츠
        </div>
        <div>
          <Slider {...sliderSettings(5)}>
            {dummyThumbnails.map((data, index) => (
              <div
                className="slick-slide v-container y-carousel"
                key={index}
                onMouseEnter={() => setTasteHoverIndex(index)}
                onMouseLeave={() => setTasteHoverIndex(-1)}
                style={{ position: "relative", transition: "all 0.3s" }}
              >
                <img src={data.videoThumbnail}></img>
                {tasteHoverIndex === index && (
                  <div className="thumbnail" style={{ transition: "0.5s" }}>
                    <VideoPreview
                      video={data}
                      index={index}
                      hoverIndex={tasteHoverIndex}
                    />
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* <div className="vid-title">
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
      </div> */}
    </div>
  );
}

export default VideoList;
