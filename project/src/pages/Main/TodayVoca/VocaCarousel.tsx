import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../../../components/Slider/Arrow";
import "./VocaCarousel.css";
import SampleVoca from "./SampleVoca";
export default function VocaCarousel() {
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
                <h3>{data.word}</h3>
              </div>
              <div className="back">
                <h3 className="back-3">
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
    </div>
  );
}
