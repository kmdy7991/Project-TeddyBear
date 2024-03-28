import React from "react";
import "./Arrow.css";
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
