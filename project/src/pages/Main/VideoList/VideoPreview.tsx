import { PreviewVideoProps } from "./Video";
import styles from "./VideoPreview.module.css";
import ReactDOM from "react-dom";
function VideoPreview({
  video,
  index,
  hoverIndex,
}: PreviewVideoProps & { index: number }) {
  const isHovered = index === hoverIndex; // 현재 인덱스가 호버된 인덱스인지 확인
  const modal5th = (): string => {
    if ((index + 1) % 5 === 0) {
      return `${styles.videoPreviewModal} ${styles.specialClass}`;
    } else if (index % 5 === 0) {
      return `${styles.videoPreviewModal} ${styles.leftSpecial}`;
    } else {
      return styles.videoPreviewModal;
    }
  };
  // 포털을 사용하여 VideoPreview를 document.body에 직접 렌더링합니다.
  // 이렇게 하면, VideoPreview가 Slider의 overflow: hidden에 영향을 받지 않습니다.
  return ReactDOM.createPortal(
    <div className={isHovered ? `${modal5th()} ${styles.hovered}` : modal5th()}>
      <div className={`${styles.videoPrImg}`}>
        <img src={video.videoThumbnail} alt="썸네일 이미지" />
      </div>
      <div className={`${styles.title}`}>{video.videoTitle}</div>
      <div className={`${styles.des}`}>{video.videoDiscription}</div>
    </div>,
    document.body // 포털의 대상이 될 DOM 노드
  );
}

export default VideoPreview;
