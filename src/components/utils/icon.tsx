import React, { useEffect, useRef, useState } from "react";
import "./icon.scss";

interface IconPropsInterface {
  iconRelativePath: string;
  spin?: boolean;
  svgStyles?: React.CSSProperties;
  spanContainerStyles?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export default function Icon({
  iconRelativePath,
  spin,
  svgStyles,
  spanContainerStyles,
  className,
  onClick,
}: IconPropsInterface) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [svg, setSvg] = useState<string | null>(null);

  const getSvg = async () => {
    const importedSVG = require(`!svg-inline-loader!../../assets/${iconRelativePath}.svg`);
    return importedSVG;
  };

  useEffect(() => {
    getSvg().then((svg) => {
      setSvg(svg);
    });
  }, [iconRelativePath]);

  useEffect(() => {
    if (svgStyles && spanRef.current?.childNodes[0]) {
      (spanRef.current?.childNodes[0] as SVGSVGElement).setAttribute(
        "style",
        Object.entries(svgStyles)
          .map(([k, v]) => `${k}:${v}`)
          .join(";")
      );
      // (spanRef.current?.childNodes[0] as SVGSVGElement).style = pimpSvg(
      //   spanRef.current?.childNodes[0] as SVGSVGElement
      // );
    }
  }, [svg, svgStyles]);

  return (
    <>
      <span
        onClick={onClick}
        style={spanContainerStyles}
        ref={spanRef}
        className={`icon ${spin ? "spin" : ""} ${className ? className : ""}`}
        dangerouslySetInnerHTML={{ __html: svg || "" }}
      ></span>
    </>
  );
}
