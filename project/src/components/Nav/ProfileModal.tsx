import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./ProfileModal.module.css";
import { useEffect } from "react";
import axios from "axios";

export default function ProfileModal() {
  const userId = useSelector((state: RootState) => state.user.userId);

  // useEffect(() => {
  //     const fetchTier = async () => {
  //         const response = await axios.get(`/api/user-service/tier/${userId}`)
  //         console.log(response)

  return (
    <div className={`${styles.moduleContainer}`}>
      <div className={`${styles.tierExpContainer}`}>
        <div className={`${styles.tierExpImg}`}>
          <div className={`${styles.tierimg}`}></div>
        </div>
      </div>
    </div>
  );
}
