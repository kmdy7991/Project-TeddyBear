import "./Watching.css";
import { dummyThumbnails } from "../../Main/VideoList/VideoDummy";
import next from "../../../assets/nextarrow.png";
import prev from "../../../assets/prevarrow.png";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { MouseEvent, useState } from "react";
import Watched from "./Watched";

export default function Watching() {
  //   const navigate = useNavigate();
  const [isWatching, setIsWatching] = useState(true);

  function handleClickNext(e: MouseEvent<HTMLButtonElement>) {
    // navigate("watched");
    setIsWatching(false);
  }

  if (!isWatching) {
    return <Watched />;
  }

  return (
    <TransitionGroup>
      <CSSTransition
        key={isWatching ? "Watching" : "Watched"}
        timeout={300}
        classNames="fade"
      >
        <div className="myContainer">
          <div className="myContent">
            <div className="bnt">
              {isWatching && <div className="myTitle">시청중인 강의</div>}
              <div className="myBtn">
                <button onClick={handleClickNext}>
                  <img className="myBtnImg" src={next} />
                </button>
              </div>
            </div>
            {isWatching ? (
              <div className="myVideoList">
                {dummyThumbnails.map((data, index) => (
                  <div className="myVideo" key={index}>
                    <div className="myVidImg">
                      <img src={data.videoThumbnail} />
                    </div>
                    <div className="myText">
                      <div className="myVidTitle">{data.videoTime}</div>
                      <div className="myDescription">
                        {data.videoDescription}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Watched />
            )}
          </div>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
