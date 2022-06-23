import React from "react";
import './PodcastIcon.scss';

interface Props {
  url?: string;
  iconUrl: string;
  alt: string;
  width?: string;
  height?: string;
}

const PodcastIcon: React.FC<Props> = ({ url, iconUrl, alt, width, height }) => {
  return url ? (
    <a className="podcast-links-icon" href={url}>
      <img src={iconUrl} alt={alt} style={{ width: width || 'auto', height: height || 'auto' }} />
    </a>
  ) : <></>;
}

export default PodcastIcon;