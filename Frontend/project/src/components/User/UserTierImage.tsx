import gold from "../../assets/Tier/gold.png";
import silver from "../../assets/Tier/silver.png";
import bronze from "../../assets/Tier/bronze.png";

interface TierImageProps {
  tier: string;
}

export const TierImage = ({ tier }: TierImageProps) => {
  // const로 하면 상수라 x
  let imageSrc = "";
  let altText = "";

  // A, B, C에 따라 티어 이미지 변경되게 switch 문
  switch (true) {
    case tier.startsWith("A"):
      imageSrc = bronze;
      altText = "A1, A2를 위한 브론즈";
      break;
    case tier.startsWith("B"):
      imageSrc = silver;
      altText = "B1, B2를 위한 실버";
      break;
    case tier.startsWith("C"):
      imageSrc = gold;
      altText = "C1, C2를 위한 골드";
      break;
    default:
      imageSrc = "";
      altText = "No Tier Image";
  }

  return <img src={imageSrc} alt={altText} />;
};
