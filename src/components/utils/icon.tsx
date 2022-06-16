import React, { ReactNode, useEffect, useRef, useState } from "react";
import "./icon.scss";

interface IconPropsInterface {
  iconRelativePath: string;
  spin?: boolean;
  pimpSvg?: (svg: SVGSVGElement) => void;
  spanContainerStyles?: React.CSSProperties;
}

export default function Icon({
  iconRelativePath,
  spin,
  pimpSvg,
  spanContainerStyles,
}: IconPropsInterface) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [svg, setSvg] = useState<string | null>(null);

  const getSvg = async () => {
    const importedSVG = require(`!svg-inline-loader!../../assets/${iconRelativePath}.svg`);
    console.log(importedSVG);
    return importedSVG;
  };

  useEffect(() => {
    getSvg().then((svg) => {
      setSvg(svg);
    });
  }, []);

  useEffect(() => {
    if (pimpSvg && spanRef.current?.childNodes[0]) {
      (spanRef.current?.childNodes[0] as SVGSVGElement).style.fill = "red";
        pimpSvg(
          (spanRef.current?.childNodes[0] as SVGSVGElement)
        );
    }
  }, [svg]);

  return (
    <>
      <span
        style={spanContainerStyles}
        ref={spanRef}
        className={`icon ${spin ? "spin" : ""}`}
        dangerouslySetInnerHTML={{ __html: svg || "" }}
      ></span>
    </>
  );
}
