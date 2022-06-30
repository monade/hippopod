import React from 'react';
import './EpisodesGridItem.scss';
import {Episode} from "../../../../models/episode";
import EpisodeControls from "../EpisodeControls/EpisodeControls";
import EpisodeInfo from "../EpisodeInfo/EpisodeInfo";

interface Props {
  episode: Episode;
  imageUrl?: string;
  onPlayEpisode: (episode: Episode) => void;
  onQueueEpisode: (episode: Episode) => void;
}

const EpisodesGridItem: React.FC<Props> = ({ episode, imageUrl, onPlayEpisode, onQueueEpisode }) => {

  return (
    <div className='episodes-grid-item'>
      <EpisodeControls
        fill={'width'}
        imageUrl={imageUrl}
        episodeUrl={episode.url}
        onPlayEpisode={() => onPlayEpisode(episode)}
        onQueueEpisode={() => onQueueEpisode(episode)}
      />
      <div className='episodes-grid-item__content'>
        <EpisodeInfo episode={episode} />
        <h6>{episode.title}</h6>
      </div>
    </div>
  )
}

export default EpisodesGridItem;