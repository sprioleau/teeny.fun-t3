import Image from "next/image";
import React from "react";
import type { CSSProperties } from "react";

export default function TeenifyAnimation({
  animationDurationSeconds = 1,
}: {
  animationDurationSeconds?: number;
}) {
  const animationContainerRef = React.createRef<HTMLDivElement>();
  const [animationContainerWidth, setAnimationContainerWidth] = React.useState(0);

  React.useEffect(() => {
    if (!animationContainerRef?.current) return;

    const animationContainer = animationContainerRef.current;
    const animationContainerWidth = animationContainer.clientWidth;
    setAnimationContainerWidth(animationContainerWidth);
    console.log("animationContainerRef:", animationContainerRef.current?.clientWidth);
  }, [animationContainerRef]);

  return (
    <div
      ref={animationContainerRef}
      className="teenify-animation"
      style={
        {
          "--animation-duration": animationDurationSeconds,
          "--animation-width": animationContainerWidth,
        } as CSSProperties
      }
    >
      <div className="teenify-animation__side-wrapper">
        <div className="teenify-animation__side left">
          <div className="teenify-animation__images">
            <Image
              src="/images/teenify-arrows.svg"
              alt="scrolling arrows"
              width={animationContainerWidth}
              height={animationContainerWidth / 4}
            />
            <Image
              src="/images/teenify-arrows.svg"
              alt="scrolling arrows"
              width={animationContainerWidth}
              height={animationContainerWidth / 4}
            />
          </div>
        </div>
        <div className="teenify-animation__side right">
          <div className="teenify-animation__images">
            <Image
              src="/images/teenify-arrows.svg"
              alt="scrolling arrows"
              width={animationContainerWidth}
              height={animationContainerWidth / 4}
            />
            <Image
              src="/images/teenify-arrows.svg"
              alt="scrolling arrows"
              width={animationContainerWidth}
              height={animationContainerWidth / 4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
