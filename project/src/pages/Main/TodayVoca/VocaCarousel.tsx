import React, {
  Component,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../../../components/Slider/Arrow";
import "./VocaCarousel.css";
import SampleVoca from "./SampleVoca";
// import VocaModal from "./VocaModal";
import { VideoResultProps } from "../VideoList/Video";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { loadingActions } from "../../../store/loading";
import Loading from "../../../components/Loading";

export interface VocaData {
  id: number;
  part: string;
  kor: string;
  eng: string;
  tier?: string;
}

export default function VocaCarousel() {
  const [openVocaModal, setOpenVocaModal] = useState(false);
  const [vocalist, setVocalist] = useState<VocaData[]>([]);
  const [selectedVoca, setSelectedVoca] = useState<VocaData | null>(null);
  const dispatch = useDispatch();

  // const tier = useSelector((state: RootState) => state.user.userTier);
  // 더미 티어
  const tier = "B2";

  const loading = useSelector(
    (state: RootState) => state.loading["TODAY-VOCA"]
  );

  useEffect(() => {
    const fetchTodayVoca = async () => {
      dispatch(loadingActions.startLoading("TODAY-VOCA"));
      try {
        const response = await axios.get(`/api/word-service/dailyWord/${tier}`);
        console.log("오늘의 영단어 조회 성공", response.data);
        setVocalist(response.data);
      } catch (error) {
        console.error("오늘의 영단어 조회 실패", error);
      } finally {
        dispatch(loadingActions.finishLoading("TODAY-VOCA"));
      }
    };
    fetchTodayVoca();
  }, [tier]);

  let sliderSettings = {
    className: "center",
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: "3rem",
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div>
      {loading && <Loading />}
      <Slider {...sliderSettings}>
        {vocalist.map((data, index) => (
          <div className="slick-slide container flip" key={index}>
            <div className="card">
              <div className="front">
                <h3 className="card-h3">{data.eng}</h3>
              </div>
              <div className="back">
                <h3
                  className="back-3 card-h3"
                  // onClick={(e) => handleOpenModal(e, data)}
                >
                  <p className="back-w">{data.eng}</p>
                  <div>
                    <p className="back-p">({data.part})</p>
                    <p className="back-m">{data.kor}</p>
                  </div>
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
