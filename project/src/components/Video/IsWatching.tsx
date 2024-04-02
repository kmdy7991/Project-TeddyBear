import { useState } from "react";

interface isWatchingProps {
  videoId?: number;
}

export default function IsWatching({ videoId }: isWatchingProps) {
  // 시청완료 여부 판단
  const [isWatching, setIsWatching] = useState(false);
}
