import styles from "./Shadowing.module.css";
import mic from "../../assets/mic.png";
import speaker from "../../assets/listen.png";
import { ShadowingProps } from "./VideoDetail";
import TextToSpeechComponent from "../../components/Shadowing/AudioTTS";
import AudioRecorder from "../../components/Shadowing/AudioRecorder";
export default function Shadowing({ selectedLine }: ShadowingProps) {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.sound}`}>
        <div className={`${styles.listen}`}>
          {/* <div className={`${styles.listenIcon}`}>
            <img src={speaker} alt="듣기" />
          </div>
          <div className={`${styles.icon}`}>Example</div> */}
          <TextToSpeechComponent selectedLine={selectedLine} />
        </div>
        <div className={`${styles.speak}`}>
          {/* <div className={`${styles.icon}`}>
            <img src={mic} alt="말하기" />
          </div>
          <div className={`${styles.icon}`}>You</div> */}
          <AudioRecorder selectedLine={selectedLine} />
        </div>
      </div>
      <div className={`${styles.text}`}>
        {selectedLine || "학습하고 싶은 문장을 클릭하세요!"}
      </div>
    </div>
  );
}
