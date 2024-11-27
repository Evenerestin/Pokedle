import gsap from "gsap";
import { useCallback, useState } from "react";
import { textTween } from "../tweens/textTween";

export const useCountdown = (onComplete) => {
  const [countdownHasRun, setCountdownHasRun] = useState(false);
  const [showCanvas, setShowCanvas] = useState(true);

  const countdown = useCallback(() => {
    if (countdownHasRun) return;

    const countdownTimeline = gsap.timeline({
      onComplete: () => {
        setShowCanvas(false);
        if (onComplete) onComplete();
      },
    });

    countdownTimeline.add(textTween("#first", 20), "+=1.5");
    countdownTimeline.add(textTween("#second", 20));
    countdownTimeline.add(textTween("#third", 30));
    setCountdownHasRun(true);

    return countdownTimeline;
  }, [countdownHasRun, onComplete]);

  return { countdown, showCanvas, setShowCanvas };
};
