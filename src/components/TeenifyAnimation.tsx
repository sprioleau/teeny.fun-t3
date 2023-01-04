import Image from "next/image";
import React from "react";
import type { CSSProperties } from "react";

type Props = {
  animationDurationSeconds?: number;
};

export default function TeenifyAnimation({ animationDurationSeconds = 1 }: Props) {
  const animationContainerRef = React.createRef<HTMLDivElement>();
  const imagesWrapperLeftRef = React.createRef<HTMLDivElement>();
  const imagesWrapperRightRef = React.createRef<HTMLDivElement>();
  const [animationContainerWidth, setAnimationContainerWidth] = React.useState(0);

  React.useEffect(() => {
    if (!animationContainerRef?.current) return;
    if (!imagesWrapperLeftRef?.current) return;
    if (!imagesWrapperRightRef?.current) return;

    const animationContainer = animationContainerRef.current;
    const animationContainerWidth = animationContainer.clientWidth;

    // prettier-ignore
    const keyframes = [
      { transform: "translateX(0)", },
      { transform: `translateX(${animationContainerWidth / 2}px)`, },
    ];

    const animationOptions = {
      duration: animationDurationSeconds * 1000,
      iterations: Infinity,
      easing: "linear",
    };

    imagesWrapperLeftRef.current.animate(keyframes, animationOptions);
    imagesWrapperRightRef.current.animate(keyframes, animationOptions);

    setAnimationContainerWidth(animationContainerWidth);
  }, [
    animationContainerRef,
    animationDurationSeconds,
    imagesWrapperLeftRef,
    imagesWrapperRightRef,
  ]);

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
          <div
            ref={imagesWrapperLeftRef}
            className="teenify-animation__images"
          >
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
          <div
            ref={imagesWrapperRightRef}
            className="teenify-animation__images"
          >
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
