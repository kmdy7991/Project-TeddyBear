import React, { Component, MouseEvent, useEffect, useState } from "react";
import Slider from "react-slick";
import {
  NextArrow,
  VideoNextArrow,
  VideoPrevArrow,
} from "../../../components/Slider/Arrow";
import "./VideoList.css";
import VideoPreview from "./VideoPreview";
import { VideoResultProps } from "./Video";
import {
  getBookMarkedVideoList,
  getTastedVideoList,
} from "../../../components/Video/MyLectureAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import axios from "axios";
import { loadingActions } from "../../../store/loading";
import Loading from "../../../components/Loading";

function VideoList() {
  const [bmHoverIndex, setbmHoverIndex] = useState<number>(0); // 북마크 호버 인덱스
  const [tasteHoverIndex, setTasteHoverIndex] = useState<number>(0); // 취향저격 호버 인덱스
  const [bmList, setBmList] = useState<VideoResultProps[]>([]);
  type VideoIdObj = {
    videoId: string;
  };
  const [tasteList, setTasteList] = useState<VideoIdObj[]>([]);
  const [tasteVideoDetail, setTasteVideoDetail] = useState<VideoResultProps[]>(
    []
  );
  const navigate = useNavigate();
  const userNickName = useSelector((state: RootState) => state.user.userId);
  const userId = useSelector((state: RootState) => state.user.userId);
  const accessToken = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: RootState) => state.loading["TASTE-LIST"]
  );
  useEffect(() => {
    const fetchBookMarkList = async () => {
      try {
        const bookmarkedVideos = await getBookMarkedVideoList(userId);
        setBmList(bookmarkedVideos);
      } catch (error) {
        console.error("북마크 영상 조회 실패:", error);
      }
    };
    fetchBookMarkList();
  }, []);

  useEffect(() => {
    const fetchTasteList = async () => {
      try {
        dispatch(loadingActions.startLoading("TASTE-LIST"));
        const tastedVideos = await getTastedVideoList(userId);
        setTasteList(tastedVideos);
        console.log("맞춤형 영상 VideoId 조회 성공:", tasteList);
      } catch (error) {
        console.error("맞춤형 영상 VideoId 조회 실패", error);
      } finally {
        dispatch(loadingActions.finishLoading("TASTE-LIST"));
      }
    };
    fetchTasteList();
  }, [dispatch]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        // Promise.all을 사용하여 모든 비디오 상세 정보를 병렬로 조회

        const details = await Promise.all(
          tasteList.map(
            (videoIdObj) =>
              axios
                .get(`/api/video-service/videoDetail/${videoIdObj.videoId}`, {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                  },
                })
                .then((response) => response.data) // axios 응답에서 데이터 추출
          )
        );
        setTasteVideoDetail(details); // 상태 업데이트 시 .data를 사용하지 않고 여기서 직접 처리
        console.log("비디오 상세 정보 조회", details);
      } catch (error) {
        console.error("비디오 상세 정보 조회 실패", error);
      }
    };

    if (tasteList && tasteList.length > 0) {
      fetchVideoDetails();
    }
  }, [tasteList, dispatch]); // accessToken도 의존성 배열에 추가

  const sliderSettings = (slidesToShow: number) => {
    return {
      dots: true,
      infinite: false,
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
        <div className="vid-title">
          <span>북마크한 영상</span>
        </div>
        <div>
          {bmList && bmList.length > 0 ? (
            <Slider {...sliderSettings(Math.min(5, bmList.length))}>
              {bmList.map((video, index) => (
                <div
                  className="videoContainer"
                  key={index}
                  onMouseEnter={() => setbmHoverIndex(index)}
                  onMouseLeave={() => setbmHoverIndex(-1)}
                  style={{ position: "relative", transition: "all 0.3s" }}
                  onClick={() => navigate(`/video/${video.id}`)}
                >
                  <img src={video.videoThumbnail} alt="비디오 썸네일" />
                  {/* {bmHoverIndex === index && (
                    <div className="thumbnail" style={{ transition: "0.5s" }}>
                      <VideoPreview
                        video={video}
                        index={index}
                        hoverIndex={bmHoverIndex}
                      />
                    </div>
                  )} */}
                </div>
              ))}
            </Slider>
          ) : (
            <div className="no-content">북마크한 영상이 없습니다.</div>
          )}
        </div>
      </div>
      <div className="주제">
        <div className="vid-title">
          <span>{userNickName}</span>님의 취향저격 컨텐츠
        </div>
        {loading ? (
          <div>Loading...여러분의 추천 영상을 불러오고 있어요</div>
        ) : (
          <div>
            {tasteVideoDetail && tasteVideoDetail.length > 0 ? (
              <Slider {...sliderSettings(5)}>
                {tasteVideoDetail.map((data, index) => (
                  <div
                    // className="slick-slide v-container y-carousel "

                    className="videoContainer"
                    key={index}
                    onMouseEnter={() => setTasteHoverIndex(index)}
                    onMouseLeave={() => setTasteHoverIndex(-1)}
                    style={{ position: "relative", transition: "all 0.3s" }}
                    onClick={() => navigate(`/video/${data.id}`)}
                  >
                    <img src={data.videoThumbnail}></img>
                    {/* {tasteHoverIndex === index && (
                  <div className="thumbnail" style={{ transition: "0.5s" }}>
                    <VideoPreview
                      video={data}
                      index={index}
                      hoverIndex={tasteHoverIndex}
                    />
                  </div>
                )} */}
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="no-content">추천할 영상이 없습니다.</div>
            )}
          </div>
        )}
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
