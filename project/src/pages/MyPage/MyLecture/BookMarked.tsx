import "./Watching.css";
import { dummyThumbnails } from "../../Main/VideoList/VideoDummy";
import { MouseEvent, useState } from "react";
import prev from "../../../assets/prevarrow.png";
import Watched from "./Watched";

export default function BookMarked() {
  const [isBookMarked, setIsBookMarked] = useState(true);

  function handleClickPrev(e: MouseEvent<HTMLButtonElement>) {
    setIsBookMarked(false);
  }

  if (!isBookMarked) {
    return <Watched />;
  }
  return (
    <div className="myContainer">
      <div className="myContent">
        <div className="bnt">
          {isBookMarked && <div className="myTitle">북마크한 강의</div>}
          <div className="myBtn">
            <button onClick={handleClickPrev}>
              <img className="myBtnImg" src={prev} />
            </button>
          </div>
        </div>
        <div className="myVideoList">
          {dummyThumbnails.map((data, index) => (
            <div className="myVideo" key={index}>
              <div className="myVidImg">
                <img className="myBtnImg" src={data.imageUrl} />
              </div>
              <div className="myText">
                <div className="myVidTitle">{data.title}</div>
                <div className="myDescription">{data.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
