import React, { useState } from "react";
import { ShadowingProps } from "../../pages/Video/VideoDetail";
import styles from "./AudioTTS.module.css";
import speaker from "../../assets/listen.png";
const TextToSpeechComponent = ({ selectedLine }: ShadowingProps) => {
  const [text, setText] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(selectedLine ?? "");
  };

  const handleSpeech = async () => {
    console.log(text);
    const response = await fetch("http://localhost:8000/text-to-speech/", {
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
