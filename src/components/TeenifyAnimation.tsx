import React from "react";
import type { CSSProperties } from "react";

export default function TeenifyAnimation({
  animationDurationSeconds = 5,
}: {
  animationDurationSeconds?: number;
}) {
  const animationContainerRef = React.createRef<HTMLDivElement>();
  const [animationContainerWidth, setAnimationContainerWidth] = React.useState(0);

  React.useLayoutEffect(() => {
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
        <div className="teenify-animation__side left"></div>
        <div className="teenify-animation__side right"></div>
      </div>
    </div>
  );
}
