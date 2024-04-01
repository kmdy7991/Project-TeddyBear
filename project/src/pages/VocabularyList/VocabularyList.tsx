
import React, { useState } from "react";
import Nav from "../../components/Nav/Nav";
import MyVocabulary from "./MyVocabulary";
import ClassVocabulary from "./ClassVocabulary";
import styles from './Vocabulary.module.css'; 


function VocabularyList() {
  const [activeTab, setActiveTab] = useState<"myvoca" | "classvoca">("classvoca");

  return (
    <div>
      <div>
        <Nav />        
      </div>

      <div className={styles.tabs}>
        {/* 탭 버튼 */}
        <button
          className={activeTab === "classvoca" ? styles.active : ''}
          onClick={() => setActiveTab("classvoca")}
        >
          클래스별
        </button>
        <button
          className={activeTab === "myvoca" ? styles.active : ''}
          onClick={() => setActiveTab("myvoca")}
        >
          북마크
        </button>
      </div>
      <div style={{ marginTop: "6rem" }}>
        {/* 조건부 렌더링으로 탭에 맞는 컴포넌트를 표시합니다 */}
        {activeTab === "classvoca" && <ClassVocabulary />}
        {activeTab === "myvoca" && <MyVocabulary />}
      </div>
    </div>
  );
}

export default VocabularyList;
