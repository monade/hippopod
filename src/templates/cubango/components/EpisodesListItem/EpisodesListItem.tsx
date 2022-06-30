import React from 'react';
import './EpisodesListItem.scss';
import {Episode} from "../../../../models/episode";
import EpisodeControls from "../EpisodeControls/EpisodeControls";
import EpisodeInfo from "../EpisodeInfo/EpisodeInfo";

interface Props {
  episode: Episode;
  imageUrl?: string;
  onPlayEpisode: (episode: Episode) => void;
  onQueueEpisode: (episode: Episode) => void;
}

const EpisodesListItem: React.FC<Props> = ({ episode, imageUrl, onPlayEpisode, onQueueEpisode }) => {

  const renderDate = (date?: Date) => date ?
    <span>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</span> :
    '';
  const formatDuration = (durationSeconds: number) => {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;

    const twoDigits = (x: number) => x.toLocaleString('en-US', { minimumIntegerDigits: 2 });

    return `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`;
  }
  const renderDuration = (durationSeconds?: number) => durationSeconds ?
      <span>{formatDuration(durationSeconds)}</span> :
    '';
  const renderSize = (sizeBytes?: number) => sizeBytes ?
    <span>{Math.round((sizeBytes / 1000000) * 100) / 100} MB</span> :
    '';

  return (
    <div className='episodes-list-item'>
      <EpisodeControls
        fill={'height'}
        imageUrl={imageUrl}
        episodeUrl={episode.url}
        onPlayEpisode={() => onPlayEpisode(episode)}
        onQueueEpisode={() => onQueueEpisode(episode)}
      />
      <div className='episodes-list-item__content'>
        <h6>{episode.title}</h6>
        <EpisodeInfo episode={episode} />
      </div>
    </div>
  )
}

export default EpisodesListItem;