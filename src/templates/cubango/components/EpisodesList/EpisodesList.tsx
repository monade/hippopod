import React, {useEffect, useState} from 'react';
import './EpisodesList.scss';
import {Episode} from "../../../../models/episode";
import EpisodesListItem from "../EpisodesListItem/EpisodesListItem";

interface Props {
  episodes: Episode[];
  imageUrl?: string;
  onPlayEpisode: (episode: Episode) => void;
  onQueueEpisode: (episode: Episode) => void;
}

const EpisodesList: React.FC<Props> = ({ episodes, imageUrl, onPlayEpisode, onQueueEpisode }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [shownEpisodes, setShownEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    setShownEpisodes(isCollapsed ? episodes.slice(0, 4) : episodes);
  }, [isCollapsed])

  const toggleIsCollapsed = () => setIsCollapsed(!isCollapsed);

  const renderEpisodes = () => shownEpisodes.map((episode, index) =>
    <EpisodesListItem
      key={`listEpisode${index}`}
      episode={episode}
      imageUrl={imageUrl}
      onPlayEpisode={onPlayEpisode}
      onQueueEpisode={onQueueEpisode}
    />
  );

  const renderToggleButton = () => episodes.length > 4 ?
    <button className='episodes-list__toggle' onClick={() => toggleIsCollapsed()}>
      {isCollapsed ? 'Load more' : 'Collapse'}
    </button> :
    '';

  return (
    <div className='episodes-list'>
      {renderEpisodes()}
      {renderToggleButton()}
    </div>
  );
}

export default EpisodesList;