import { PreviewVideoProps } from "./Video";
import styles from "./VideoPreview.module.css";
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
  return (
    <div className={isHovered ? `${modal5th()} ${styles.hovered}` : modal5th()}>
      <div className={`${styles.videoPrImg}`}>
        <img src={video.videoThumbnail} alt="썸네일 이미지" />
      </div>
      <div className={`${styles.title}`}>{video.videoTitle}</div>
      <div className={`${styles.des}`}>{video.videoDiscription}</div>
    </div>
  );
}

export default VideoPreview;
