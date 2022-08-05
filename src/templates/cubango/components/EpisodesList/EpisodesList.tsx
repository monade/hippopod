import React, { useEffect, useState } from "react";
import "./EpisodesList.scss";
import { Episode } from "../../../../models/episode";
import EpisodesListItem from "../EpisodesListItem/EpisodesListItem";

interface Props {
  podcastImageUrl?: string;
  episodes: Episode[];
  onPlayEpisode: (episode: Episode) => void;
  onQueueEpisode: (episode: Episode) => void;
  filter?: string;
}

const EpisodesList: React.FC<Props> = ({
  podcastImageUrl,
  episodes,
  onPlayEpisode,
  onQueueEpisode,
  filter,
}) => {
  const [shownEpisodes, setShownEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    setShownEpisodes(sliceEpisodes(6));
  }, []);

  useEffect(() => {
    setShownEpisodes(
      episodes.filter(
        (episode) =>
          episode.title?.toLowerCase()?.includes(filter?.toLowerCase() ?? "") ||
          episode.description
            ?.toLowerCase()
            ?.includes(filter?.toLowerCase() ?? "")
      )
    );
  }, [filter]);

  const sliceEpisodes = (episodesAmount: number) =>
    episodes.slice(0, Math.min(episodesAmount, episodes.length));
  const showMore = () =>
    setShownEpisodes(sliceEpisodes(shownEpisodes.length + 6));

  const renderEpisodes = () =>
    shownEpisodes.map((episode, index) => (
      <EpisodesListItem
        key={`listEpisode${index}`}
        episode={episode}
        imageUrl={episode.imageUrl}
        onPlayEpisode={onPlayEpisode}
        onQueueEpisode={onQueueEpisode}
      />
    ));

  const renderShowMoreButton = () =>
    episodes.length !== shownEpisodes.length ? (
      <button className="episodes-list__toggle" onClick={() => showMore()}>
        Load more
      </button>
    ) : (
      ""
    );

  return (
    <div className="episodes-list">
      {renderEpisodes()}
      {renderShowMoreButton()}
    </div>
  );
};

export default EpisodesList;
