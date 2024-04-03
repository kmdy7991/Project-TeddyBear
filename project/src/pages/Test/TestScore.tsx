import React, { useState, useEffect } from "react";
import styles from '../Login/CefrScore.module.css';
import axios from "axios";

interface TestScoreProps {
    correctAnswers: number;
    userId: number;
    onClose: () => void;
}

const TestScore: React.FC<TestScoreProps> = ({ correctAnswers, userId, onClose }) => {
    const [score, setScore] = useState<number>(0);
    const [userName, setUserName] = useState<string>('');

    // 사용자 정보를 가져오는 useEffect
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/user-service/user/${userId}`);
                setUserName(response.data.nickname); // 닉네임을 state에 저장
            } catch (error) {
                console.error('유저 정보를 불러오는데 실패했습니다.', error);
            }
        };

        fetchUser();
    }, [userId]);

    // 정답 수를 기반으로 점수를 계산하는 useEffect
    useEffect(() => {
        const newScore = correctAnswers * 10;
        setScore(newScore);
        // 여기서는 어떤 값을 반환하지 않아야 합니다.
    }, [correctAnswers]);

    return (
        <div className={styles.box}>
            <div className={styles.boxinbox}>
                <h1 className={styles.inboxtext}>{score}</h1>
            </div>
            <h1 className={styles.text}>학습 테스트 결과</h1>
            <h1 className={styles.text}>{userName}님의 점수는 {score}점입니다!</h1>
        </div>
    );
}

export default TestScore;
