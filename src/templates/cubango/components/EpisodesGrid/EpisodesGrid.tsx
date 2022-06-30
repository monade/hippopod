import React, {useEffect, useState} from 'react';
import './EpisodesGrid.scss';
import {Episode} from "../../../../models/episode";
import EpisodesGridItem from "../EpisodesGridItem/EpisodesGridItem";

interface Props {
  episodes: Episode[];
  imageUrl?: string;
  onPlayEpisode: (episode: Episode) => void;
  onQueueEpisode: (episode: Episode) => void;
}

const EpisodesGrid: React.FC<Props> = ({ episodes, imageUrl, onPlayEpisode, onQueueEpisode }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [shownEpisodes, setShownEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    setShownEpisodes(isCollapsed ? episodes.slice(0, 8) : episodes);
  }, [isCollapsed])

  const toggleIsCollapsed = () => setIsCollapsed(!isCollapsed);

  const renderEpisodes = () => shownEpisodes.map((episode, index) =>
    <EpisodesGridItem
      key={`listEpisode${index}`}
      episode={episode}
      imageUrl={imageUrl}
      onPlayEpisode={onPlayEpisode}
      onQueueEpisode={onQueueEpisode}
    />
  );

  const renderToggleButton = () => episodes.length > 4 ?
    <button className='episodes-grid__toggle' onClick={() => toggleIsCollapsed()}>
      {isCollapsed ? 'Load more' : 'Collapse'}
    </button> :
    '';

  return (
    <>
      <div className='episodes-grid'>
        {renderEpisodes()}
      </div>
      {renderToggleButton()}
    </>
  );
}

export default EpisodesGrid;