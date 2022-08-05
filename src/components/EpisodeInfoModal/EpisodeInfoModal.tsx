import React from "react";
import './EpisodeInfoModal.scss';
import {Episode} from "../../models/episode";
import Modal from 'react-modal';

interface Props {
  episode: Episode;
  isOpen: boolean;
  onClose: () => void;
}

const EpisodeInfoModal: React.FC<Props> = ({ episode, isOpen, onClose }) => {

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

  return (
    <div className="episodes-info-modal">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        style={customStyles}
      >
        {episode.description && <p dangerouslySetInnerHTML={{ __html: episode.description }} />}
      </Modal>
    </div>
  )
}

export default EpisodeInfoModal;
