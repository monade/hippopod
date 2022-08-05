import React from "react";
import './EpisodeInfoModal.scss';
import {Episode} from "../../models/episode";
import Modal from 'react-modal';
import {getDateString} from "../../utils/dateUtils";
import {ReactComponent as DownloadIcon} from "../../templates/cubango/assets/download.svg";
import {ReactComponent as PlayIcon} from "../../templates/cubango/assets/play.svg";
import {ReactComponent as PlaylistIcon} from "../../templates/cubango/assets/playlist.svg";

interface Props {
  episode: Episode;
  isOpen: boolean;
  onClose: () => void;
  onPlayEpisode: () => void;
  onQueueEpisode: () => void;
}

const EpisodeInfoModal: React.FC<Props> = ({ episode, isOpen, onClose, onPlayEpisode, onQueueEpisode }) => {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '700px',
      maxWidth: '80%',
      height: '600px',
      maxHeight: '95%',
      zIndex: '999999',
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-color)',
      border: 'none',
      fontSize: 'var(--episode-list-item-font-size)'

    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      overflow: 'hidden',
      zIndex: '99999'
    }
  };

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

  const download = () => episode.url && window.open(episode.url || "", "_blank");


  return (
    <div className="episodes-info-modal">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        style={customStyles}
      >
        <div
        className="wrapper"
        >
          <span className="close-text" onClick={onClose}>Close</span>
          <div className="header">
            <img alt={episode.title} src={episode.imageUrl} />
            <div className="info">
              <h6>{episode.title}</h6>
              <span className="me-2">{renderDuration(episode.durationSeconds)}</span> •
              <span className="ms-2">Published on {renderDate(episode.publicationDate)}</span>
              <div className="controls">
                <div className='icon contrast' onClick={() => onPlayEpisode()}>
                  <PlayIcon/>
                </div>
                <div className='icon' onClick={() => download()}>
                  <DownloadIcon style={{transform: 'rotate(90deg)'}}/>
                </div>
                <div className='icon' onClick={() => onQueueEpisode()}>
                  <PlaylistIcon/>
                </div>
              </div>
            </div>
          </div>
          {episode.description && <p dangerouslySetInnerHTML={{ __html: episode.description }} />}

        </div>
      </Modal>
    </div>
  )
}

export default EpisodeInfoModal;
