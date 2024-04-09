import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { loadingActions } from "../../store/loading";
import { GetUserTier } from "./UserTier";
import styles from "./UserExp.module.css";
import { TierImage } from "./UserTierImage";

interface UserProps {
  tier: string;
  tierExp: number;
  level: number;
  levelExp: number;
  maxTierExp: number;
  maxLevelExp: number;
}

export default function UserExp({
  tier,
  tierExp,
  level,
  levelExp,
  maxTierExp,
  maxLevelExp,
}: UserProps) {
  // 경험치 비율 계산
  const calculateExpWidth = (Exp: number, maxExp: number) => {
    const widthPercentage = (Exp / maxExp) * 100;
    console.log(widthPercentage);
    return widthPercentage;
  };

  return (
    <div className={`${styles.exps}`}>
      {/* 티어 경험치 */}
      <div className={`${styles.tier}`}>
        <div className={`${styles.tierS}`}>
          <TierImage tier={tier} />
        </div>
        <div className={`${styles.exp}`}>
          <div
            className={`${styles.expFilled}`}
            style={{
              width: `${calculateExpWidth(tierExp, maxTierExp)}%`,
              backgroundColor: "#4caf50",
            }}
          />
          <div className={`${styles.expText}`}>
            {tierExp} / {maxTierExp}
          </div>
        </div>
      </div>
      <div className={`${styles.tier}`}>
        {/* 레벨 경험치 */}
        <div className={`${styles.level}`}>
          <span>Lv.{level}</span>
        </div>
        <div className={`${styles.exp}`}>
          <div
            className={`${styles.expFilled}`}
            style={{
              width: `${calculateExpWidth(levelExp, maxLevelExp)}%`,
              backgroundColor: "#4caf50",
            }}
          />
          <div className={`${styles.expText}`}>
            {levelExp} / {maxLevelExp}
          </div>
        </div>
      </div>
    </div>
  );
}
