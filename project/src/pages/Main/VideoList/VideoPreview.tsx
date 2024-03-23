import { PreviewVideoProps } from "./Video";
import styles from "./VideoPreview.module.css";
function VideoPreview({ video, index }: PreviewVideoProps & { index: number }) {
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
    <div className={modal5th()}>
      <div className={`${styles.videoPrImg}`}>
        <img src={video.imageUrl} alt="썸네일 이미지" />
      </div>
      <div className={`${styles.title}`}>{video.title}</div>
      <div className={`${styles.des}`}>{video.description}</div>
    </div>
  );
}

export default VideoPreview;
