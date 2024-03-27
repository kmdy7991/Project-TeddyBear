// React와 ReactNode, FC 타입을 import합니다.
import React, { ReactNode, FC } from 'react';
// 별도로 분리한 CSS 파일을 import합니다.
import styles from './TestModal.module.css'
import { useNavigate } from 'react-router-dom';

// ModalProps 인터페이스 정의: isOpen, onClose, children 프로퍼티를 포함합니다.
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Modal 컴포넌트: isOpen이 false면 null을 반환하고, true면 모달을 렌더링합니다.
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/')
  }
  if (!isOpen) return null;

  return (
    <div className={styles.modalbackground}>
      <div className={styles.modalbox}>
        {children}
        <button onClick={handleSubmit} className={styles.button}>확인</button>

      </div>
    </div>
  );
};

export default Modal;
