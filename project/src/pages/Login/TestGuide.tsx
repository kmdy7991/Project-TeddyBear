import React from 'react';
import styles from './TestGuide.module.css';
import { useNavigate } from 'react-router-dom'; 

const Testguide: React.FC = () => {

  const navigate = useNavigate(); 


  const handleSubmit =() => {
    navigate('/cefrtest')
  }

  return (
    <>
      <div className={styles.fullbox}>
        <h1 className={styles.leveltext}>Level Test</h1>
        <div className={styles.guidebox}>
          <h1 className={styles.guidetext}>안내</h1>
          <div className={styles.center}>
            <h3>1. 가능한 5분 이내 푸는 것이 좋으며, 아무리 길어도 10분은 넘지 않도록 합니다.</h3>
            <h3>2. 모르는 문제는 과감히 넘어가거나 "정확히 모름"으로 체크하세요.</h3>
            <h3>3. 절대 답을 찍어서는 안됩니다. 확신이 없다면 체크하지 마세요.</h3>
          </div>
          <button onClick={handleSubmit} className={styles.button}>
            시작
          </button>
        </div>
      </div>
    </>
  );
}

export default Testguide;
