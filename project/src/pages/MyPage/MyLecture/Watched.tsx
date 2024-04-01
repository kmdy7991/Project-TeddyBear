import "./Watching.css";
import { dummyThumbnails } from "../../Main/VideoList/VideoDummy";
import next from "../../../assets/nextarrow.png";
import prev from "../../../assets/prevarrow.png";
import { MouseEvent, useState } from "react";
import BookMarked from "./BookMarked";
import Watching from "./Watching";
import { CSSTransition } from "react-transition-group";

export default function Watched() {
  const [isWatched, setIsWatched] = useState(true);
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);
  function handleClickNext(e: MouseEvent<HTMLButtonElement>) {
    setIsWatched(false);
    setIsNext(true);
  }

  function handleClickPrev(e: MouseEvent<HTMLButtonElement>) {
    setIsWatched(false);
    setIsPrev(true);
  }

  if (!isWatched && isNext) {
    return <BookMarked />;
  }

  if (!isWatched && isPrev) {
    return <Watching />;
  }

  return (
    <CSSTransition in={isWatched} timeout={300} classNames="fade" unmountOnExit>
      <div className="myContainer">
        <div className="myContent">
          <div className="bnt">
            {isWatched && <div className="myTitle">시청완료 강의</div>}
            <div className="myBtn">
              <button onClick={handleClickPrev}>
                <img className="myBtnImg" src={prev} />
              </button>
              <button onClick={handleClickNext}>
                <img className="myBtnImg" src={next} />
              </button>
            </div>
          </div>
          <div className="myVideoList">
            {dummyThumbnails.map((data, index) => (
              <div className="myVideo" key={index}>
                <div className="myVidImg">
                  <img src={data.videoThumbnail} />
                </div>
                <div className="myText">
                  zzz
                  <div className="myVidTitle">{data.videoTitle}</div>
                  <div className="myDescription">{data.videoDiscription}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
