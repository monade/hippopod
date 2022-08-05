import React, { useState } from "react";
import { EpisodesLayout } from "../../../../models/episodes-layout";
import EpisodesLayoutSelector from "../EpisodesLayoutSelector/EpisodesLayoutSelector";
import "./Episodes.scss";
import EpisodesList from "../EpisodesList/EpisodesList";
import EpisodesGrid from "../EpisodesGrid/EpisodesGrid";
import { Podcast } from "../../../../models/podcast";
import { Episode } from "../../../../models/episode";

interface Props {
  podcast: Podcast;
  layout: EpisodesLayout;
  onLayoutSelect: (layout: EpisodesLayout) => void;
  onPlayEpisode: (episode: Episode) => void;
  onQueueEpisode: (episode: Episode) => void;
}

const Episodes: React.FC<Props> = ({
  podcast,
  layout,
  onLayoutSelect,
  onPlayEpisode,
  onQueueEpisode,
}) => {
  const [filter, setFilter] = useState<string>("");

  const renderEpisodes = (episodes: Episode[]) => {
    switch (layout) {
      case "grid":
        return (
          <EpisodesGrid
            podcastImageUrl={podcast.imageUrl}
            episodes={episodes}
            onPlayEpisode={onPlayEpisode}
            onQueueEpisode={onQueueEpisode}
            filter={filter}
          />
        );
      case "list":
      default:
        return (
          <EpisodesList
            podcastImageUrl={podcast.imageUrl}
            episodes={episodes}
            onPlayEpisode={onPlayEpisode}
            onQueueEpisode={onQueueEpisode}
            filter={filter}
          />
        );
    }
  };

  return (
    <div className="episodes">
      <div className="episodes__layout-selector-outer">
        <input
          name="filter"
          type="text"
          placeholder="Search episodes..."
          onChange={(e) => setFilter(e.target.value)}
        />
        <EpisodesLayoutSelector
          layout={layout}
          onLayoutSelect={onLayoutSelect}
        />
      </div>
      <div className="episodes__content">
        {renderEpisodes(podcast.episodes)}
      </div>
    </div>
  );
};

export default Episodes;
