import React, { useEffect, useState } from "react";
import "./EpisodesGrid.scss";
import { Episode } from "../../../../models/episode";
import EpisodesGridItem from "../EpisodesGridItem/EpisodesGridItem";

interface Props {
  podcastImageUrl?: string;
  episodes: Episode[];
  onPlayEpisode: (episode: Episode) => void;
  onQueueEpisode: (episode: Episode) => void;
}

const EpisodesGrid: React.FC<Props> = ({
  podcastImageUrl,
  episodes,
  onPlayEpisode,
  onQueueEpisode,
}) => {
  const sliceEpisodes = (episodesAmount: number) =>
    episodes.slice(0, Math.min(episodesAmount, episodes.length));

  const [shownEpisodes, setShownEpisodes] = useState<Episode[]>(
    sliceEpisodes(12)
  );

  useEffect(() => {
    setShownEpisodes(sliceEpisodes(12));
  }, [episodes]);

  const showMore = () =>
    setShownEpisodes(sliceEpisodes(shownEpisodes.length + 12));

  const renderEpisodes = () =>
    shownEpisodes.map((episode, index) => (
      <EpisodesGridItem
        key={`listEpisode${index}`}
        episode={episode}
        imageUrl={episode.imageUrl}
        onPlayEpisode={onPlayEpisode}
        onQueueEpisode={onQueueEpisode}
      />
    ));

  const renderShowMoreButton = () =>
    episodes.length !== shownEpisodes.length ? (
      <button className="episodes-grid__toggle" onClick={() => showMore()}>
        Load more
      </button>
    ) : (
      ""
    );

  return (
    <>
      <div className="episodes-grid">{renderEpisodes()}</div>
      {renderShowMoreButton()}
    </>
  );
};

export default EpisodesGrid;
