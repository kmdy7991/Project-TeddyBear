import React from "react";
import "./Arrow.css";
import left from "../../assets/pageleft.png";
import right from "../../assets/pageright.png";
import whiteP from "../../assets/whiteprev.png";
import whiteN from "../../assets/whitenext.png";
interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function NextArrow({ onClick }: ArrowProps) {
  return (
    <div className="slick-next" onClick={onClick}>
      누르면 넘어감
    </div>
  );
}

export function PrevArrow({ onClick }: ArrowProps) {
  return (
    <div className="slick-prev" onClick={onClick}>
      누르면 이전으로
    </div>
  );
}

export function VideoNextArrow({ onClick }: ArrowProps) {
  return (
    <span className="slick-vid-next" onClick={onClick}>
      누르면 넘어감
    </span>
  );
}

export function VideoPrevArrow({ onClick }: ArrowProps) {
  return (
    <span className="slick-vid-prev" onClick={onClick}>
      누르면 이전
    </span>
  );
}

export function MyPagePrevArrow({ onClick }: ArrowProps) {
  return (
    <span className="arr-prev" onClick={onClick}>
      누르면 이전
    </span>
  );
}

export function MyPageNextArrow({ onClick }: ArrowProps) {
  return (
    <span className="arr-next" onClick={onClick}>
      누르면 다음
    </span>
  );
}

export function PagePrevArrow({ onClick }: ArrowProps) {
  return (
    <span className="page-prev" onClick={onClick}>
      <img src={left} alt="왼" />
    </span>
  );
}

export function PageNextArrow({ onClick }: ArrowProps) {
  return (
    <span className="page-next" onClick={onClick}>
      <img src={right} alt="오" />
    </span>
  );
}

export function CatePrevArrow({ onClick }: ArrowProps) {
  return (
    <span className="cate-prev" onClick={onClick}>
      <img src={whiteP} alt="왼" />
    </span>
  );
}

export function CateNextArrow({ onClick }: ArrowProps) {
  return (
    <span className="cate-next" onClick={onClick}>
      <img src={whiteN} alt="오" />
    </span>
  );
}
