import React, { useMemo } from "react";
import "./PodcastIcon.scss";

interface Props {
  url?: string;
  iconUrl: string;
  alt: string;
  width?: string;
  height?: string;
  themeMode?: string;
}

const PodcastIcon: React.FC<Props> = ({
  url,
  iconUrl,
  alt,
  width,
  height,
  themeMode,
}) => {
  const filter = useMemo(() => {
    if (!themeMode) {
      return "brightness(1)";
    }

    if (themeMode === "light") {
      return "brightness(0)";
    }
    return "brightness(1)";
  }, []);

  return url ? (
    <a className="podcast-links-icon" href={url} style={{ filter: "" }}>
      <img
        src={iconUrl}
        alt={alt}
        style={{
          width: width || "auto",
          height: height || "auto",
          filter: filter,
        }}
      />
    </a>
  ) : (
    <></>
  );
};

export default PodcastIcon;
