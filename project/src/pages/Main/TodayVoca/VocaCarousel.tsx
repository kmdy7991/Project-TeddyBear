import React, { Component, MouseEvent, useCallback, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../../../components/Slider/Arrow";
import "./VocaCarousel.css";
import SampleVoca from "./SampleVoca";
import VocaModal from "./VocaModal";
import { VideoThumbnail } from "../VideoList/Video";

export interface VocaData {
  word: string;
  partOfSpeech: string;
  meaning: string;
  videos?: VideoThumbnail[];
}
// 모달 떠있을 때 스크롤 막는 hook
export function useBodyScrollLock() {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.removeProperty("overflow");
  }, []);

  return { lockScroll, unlockScroll };
}
export default function VocaCarousel() {
  const [openVocaModal, setOpenVocaModal] = useState(false);
  const [selectedVoca, setSelectedVoca] = useState<VocaData | null>(null);
  const { lockScroll, unlockScroll } = useBodyScrollLock();
  // OpenModal 타입 지정
  function handleOpenModal(e: MouseEvent<HTMLDivElement>, data: VocaData) {
    setSelectedVoca(data);
    lockScroll();
    setOpenVocaModal(true);
  }

  // 모달을 닫는 함수
  function handleCloseModal() {
    unlockScroll();
    setOpenVocaModal(false);
  }

  let sliderSettings = {
    className: "center",
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div>
      <Slider {...sliderSettings}>
        {SampleVoca.map((data, index) => (
          <div className="slick-slide container flip" key={index}>
            <div className="card">
              <div className="front">
                <h3 className="card-h3">{data.word}</h3>
              </div>
              <div className="back">
                <h3
                  className="back-3 card-h3"
                  onClick={(e) => handleOpenModal(e, data)}
                >
                  <p className="back-w">{data.word}</p>
                  <div>
                    <p className="back-p">({data.partOfSpeech})</p>
                    <p className="back-m">{data.meaning}</p>
                  </div>
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {openVocaModal && selectedVoca && (
        <VocaModal
          onClose={handleCloseModal}
          data={selectedVoca}
          isOpen={openVocaModal}
        />
      )}
    </div>
  );
}
