import React from "react";
import "./EpisodeInfo.scss";
import { Episode } from "../../../../models/episode";
import { getDateString } from "../../../../utils/dateUtils";

interface Props {
  episode: Episode;
}

const EpisodeInfo: React.FC<Props> = ({ episode }) => {
  const renderDate = (date?: Date) =>
    date ? <span>{getDateString(date)}</span> : "";
  const formatDuration = (durationSeconds: number) => {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;

    const twoDigits = (x: number) =>
      x.toLocaleString("en-US", { minimumIntegerDigits: 2 });

    return `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`;
  };
  const renderDuration = (durationSeconds?: number) =>
    durationSeconds ? <span>{formatDuration(durationSeconds)}</span> : "";
  const renderSize = (sizeBytes?: number) =>
    sizeBytes ? (
      <span>{Math.round((sizeBytes / 1000000) * 100) / 100} MB</span>
    ) : (
      ""
    );

  return (
    <span className="episode-info">
      {renderDate(episode.publicationDate)}
      {renderDuration(episode.durationSeconds)}
      {renderSize(episode.sizeBytes)}
    </span>
  );
};

export default EpisodeInfo;
