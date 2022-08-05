import React, {useState} from 'react';
import './EpisodesGridItem.scss';
import {Episode} from "../../../../models/episode";
import EpisodeControls from "../EpisodeControls/EpisodeControls";
import EpisodeInfo from "../EpisodeInfo/EpisodeInfo";
import EpisodeInfoModal from "../../../../components/EpisodeInfoModal/EpisodeInfoModal";
interface Props {
  episode: Episode;
  imageUrl?: string;
  onPlayEpisode: (episode: Episode) => void;
  onQueueEpisode: (episode: Episode) => void;
}

const EpisodesGridItem: React.FC<Props> = ({ episode, imageUrl, onPlayEpisode, onQueueEpisode }) => {


  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    if (!modalIsOpen) {
      setIsOpen(true);
    }
  }
  const closeModal = () => {
    setIsOpen(false);
  }

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
        <EpisodeInfo onClick={openModal} episode={episode} />
        <h6 onClick={openModal} >{episode.title}</h6>
      </div>
      <EpisodeInfoModal
        episode={episode}
        isOpen={modalIsOpen}
        onClose={closeModal}
        onPlayEpisode={() => onPlayEpisode(episode)}
        onQueueEpisode={() => onQueueEpisode(episode)}
      />
    </div>
  )
}

export default EpisodesGridItem;
