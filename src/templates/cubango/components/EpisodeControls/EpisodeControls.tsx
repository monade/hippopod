import React, {useState} from 'react';
import './EpisodeControls.scss';
import {ReactComponent as DownloadIcon} from '../../assets/download.svg';
import {ReactComponent as PlayIcon} from '../../assets/play.svg';
import {ReactComponent as PlaylistIcon} from '../../assets/playlist.svg';

interface Props {
  imageUrl?: string;
  episodeUrl?: string;
  onPlayEpisode: () => void;
  onQueueEpisode: () => void;
  fill: 'width' | 'height'
}

const EpisodeControls: React.FC<Props> = ({imageUrl, episodeUrl, onPlayEpisode, onQueueEpisode, fill}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  const download = () => episodeUrl && window.open(episodeUrl || "", "_blank");

  const renderOverlay = () => isOverlayVisible ?
    <div className='episode-controls__overlay'>
      <div className='episode-controls__overlay__backdrop'></div>
      <div className='episode-controls__overlay__icon' onClick={() => download()}>
        <DownloadIcon style={{transform: 'rotate(90deg)'}}/>
      </div>
      <div className='episode-controls__overlay__icon contrast' onClick={() => onPlayEpisode()}>
        <PlayIcon/>
      </div>
      <div className='episode-controls__overlay__icon' onClick={() => onQueueEpisode()}>
        <PlaylistIcon/>
      </div>
    </div> :
    '';

  const style = fill === 'width' ? { width: '100%', height: 'auto' } : { width: 'auto', height: '100%' };

  return (
    <div
      className='episode-controls'
      style={style}
      onMouseEnter={() => setIsOverlayVisible((true))}
      onMouseLeave={() => setIsOverlayVisible((false))}>
      <img src={imageUrl}/>
      {renderOverlay()}
    </div>
  )
}

export default EpisodeControls;