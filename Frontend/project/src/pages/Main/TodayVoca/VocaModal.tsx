import { VocaData } from "./VocaCarousel";
import styles from "./VocaModal.module.css";
import bookmark from "../../../assets/bookmark.png";
import { useEffect, useState } from "react";

interface VocaModalProps {
  onClose: () => void; // onClose prop 타입 정의
  data: VocaData;
  isOpen: boolean;
}
export default function VocaModal({ onClose, data, isOpen }: VocaModalProps) {
  const modalClass = isOpen ? `${styles.modalEnter}` : `${styles.modalExit}`;
  // 모달 박스 내부 클릭시 이벤트 버블링 방지
  // 모달 박스 바깥 쪽 클릭시에만 모달 닫히게
  const handleModalBoxClick = (e: any) => {
    e.stopPropagation();
  };

  // 트랜지션 효과가 있는 모달을 만들거임
  // 현재 트랜지션 효과를 보여주고 있는 중
  const [animate, setAnimate] = useState(false);
  // 컴포넌트 사라지는 시점 지연을 위한 값
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    setVisible(isOpen);

    // open이 true -> false (모달 닫음)
    if (visible && !isOpen) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 200);
    }
    return () => {
      setVisible(false);
    };
  }, [visible, isOpen]);

  // return (
  // <div className={`${styles.background}`} onClick={onClose}>
  //   <div
  //     className={`${styles.modalBox} ${modalClass}`}
  //     onClick={handleModalBoxClick}
  //   >
  //     <div className={`${styles.vocaCard}`}>
  //       <img className={`${styles.bookmark}`} src={bookmark} />
  //       <div className={`${styles.word}`}>{data}</div>
  //       <div>
  //         <div className={`${styles.part}`}>({data.partOfSpeech})</div>
  //         <div className={`${styles.mean}`}>{data.meaning}</div>
  //       </div>
  //     </div>
  //     <div className={`${styles.todayVideo}`}>
  //       <div className={`${styles.title}`}>이 단어가 들어간 영상</div>
  //       {data.videos?.map((video) => (
  //         <div key={video.id} className={`${styles.video}`}>
  //           <div className={`${styles.videoI}`}>
  //             <img
  //               src={video.imageUrl}
  //               alt={video.title}
  //               className={styles.videoImage}
  //             />
  //           </div>
  //           <div className={`${styles.videoDes}`}>
  //             <div className={`${styles.videoT}`}>{video.title}</div>
  //             <div className={`${styles.videoD}`}>{video.description}</div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // </div>
  // );
}
