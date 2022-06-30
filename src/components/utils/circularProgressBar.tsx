//INFO ABOUT HOW THIS COMPONENT WORKS HERE:
//https://www.dottedsquirrel.com/circular-progress-css/

import React, { useEffect, useRef } from "react";
import "./circularProgressBar.scss";

interface circularProgressBarPropsInterface {
  diameter: number;
  className?: string;
  color: string;
  percentage: number;
}

export default function CircularProgressBar({
  diameter,
  className,
  color,
  percentage,
}: circularProgressBarPropsInterface) {
  const rightBar = useRef(null);
  const rightProgress = useRef(null);
  const leftBar = useRef(null);
  const leftProgress = useRef(null);

  useEffect(() => {
    (
      rightBar.current as any
    ).style.clip = `rect(0px, ${diameter}px, ${diameter}px, ${diameter / 2}px)`;

    (rightProgress.current as any).style.clip = `rect(0px, ${
      diameter / 2
    }px, ${diameter}px, 0px)`;

    (leftBar.current as any).style.clip = `rect(0px, ${
      diameter / 2
    }px, ${diameter}px, 0px)`;

    (
      leftProgress.current as any
    ).style.clip = `rect(0px, ${diameter}px, ${diameter}px, ${diameter / 2}px)`;

    (rightProgress.current as any).style["background-color"] = `${color}`;
    (leftProgress.current as any).style["background-color"] = `${color}`;
  }, []);

  useEffect(() => {
    if (!percentage) {
      (rightProgress.current as any).style.transform = `rotate(0deg)`;
      (leftProgress.current as any).style.transform = `rotate(0deg)`;
      return;
    }
    (rightProgress.current as any).style.transform = `rotate(${
      percentage < 0.5 ? percentage * 2 * 180 : 180
    }deg)`;
    (leftProgress.current as any).style.transform = `rotate(${
      percentage > 0.5 ? percentage * 2 * 180 + 180 : 0
    }deg)`;
  }, [percentage]);

  return (
    <div
      className={`circular ${className ? className : ""}`}
      style={{ height: diameter, width: diameter }}
    >
      <div className="circle">
        <div className="bar right" ref={rightBar}>
          <div ref={rightProgress} className="progress"></div>
        </div>
        <div className="bar left" ref={leftBar}>
          <div ref={leftProgress} className="progress"></div>
        </div>
      </div>
    </div>
  );
}
