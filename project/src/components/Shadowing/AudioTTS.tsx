import React, { useEffect, useState } from "react";
import { ShadowingProps } from "../../pages/Video/VideoDetail";
import styles from "./AudioTTS.module.css";
import speaker from "../../assets/listen.png";
const TextToSpeechComponent = ({ selectedLine }: ShadowingProps) => {
  const [text, setText] = useState("");

  // selectedLine prop이 변경될 때마다 text 상태를 업데이트
  useEffect(() => {
    setText(selectedLine ?? "");
  }, [selectedLine]);

  const handleSpeech = async () => {
    console.log(text);
    const response = await fetch("/python/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      new Audio(url).play();
    } else {
      console.error("Text-to-Speech conversion failed");
    }
  };

  return (
    <div className={`${styles.listenIcon}`}>
      {/* <input type="text" value={text} onChange={handleTextChange} />  */}
      <button onClick={handleSpeech}>
        <img src={speaker} alt="듣기" />
      </button>
      <div className={`${styles.icon}`}>Example</div>
    </div>
  );
};

export default TextToSpeechComponent;
