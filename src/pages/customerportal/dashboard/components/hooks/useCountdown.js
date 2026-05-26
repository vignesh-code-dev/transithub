import { useState, useEffect, useCallback } from "react";

export default function useCountdown(targetEpoch) {
  const calc = useCallback(() => {
    const diff = Math.max(0, targetEpoch - Date.now());

    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  }, [targetEpoch]);

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const interval = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(interval);
  }, [calc]);

  return time;
}