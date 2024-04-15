// React와 ReactNode, FC 타입을 import합니다.
import React, { ReactNode, FC, useEffect } from "react";
// 별도로 분리한 CSS 파일을 import합니다.
import styles from "./TestModal.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ModalProps 인터페이스 정의: isOpen, onClose, children 프로퍼티를 포함합니다.
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  videoId?: number; // videoId 프로퍼티 추가
  userId?: number; // userId 프로퍼티 추가
  expCount?: number;
}

// Modal 컴포넌트: isOpen이 false면 null을 반환하고, true면 모달을 렌더링합니다.
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  userId,
  videoId,
  expCount,
}) => {
  const navigate = useNavigate();
  console.log(expCount);
  const accessToken = localStorage.getItem("access_token");

  const handleSubmit = async () => {
    try {
      if (userId && videoId) {
        const response = await axios.put(
          `/api/video-service/watch`,
          {
            videoWatched: true,
            userId: userId,
            videoId: videoId,
          },
          {
            headers: {
              // headers를 여기에 포함시킵니다.
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("시청완료 영상 완", response.data);
        window.alert("영상 시청이 완료되었습니다.");
      }
    } catch (error) {
      console.error("시청완료 실패", error);
    }
    navigate("/");
  };
  if (!isOpen) return null;

  return (
    <div className={styles.modalbackground}>
      <div className={styles.modalbox}>
        {children}
        <button onClick={handleSubmit} className={styles.button}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
