import React, { useEffect, useState } from "react";
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
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>(
    podcast.episodes
  );

  useEffect(() => {
    if (!filter || filter === "") {
      setFilteredEpisodes(podcast.episodes);
      return;
    }

    setFilteredEpisodes(
      podcast.episodes.filter(
        (episode) =>
          episode.title?.toLowerCase()?.includes(filter?.toLowerCase() ?? "") ||
          episode.description
            ?.toLowerCase()
            ?.includes(filter?.toLowerCase() ?? "")
      )
    );
  }, [filter]);

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
        {layout === "grid" ? (
          <EpisodesGrid
            podcastImageUrl={podcast.imageUrl}
            episodes={filteredEpisodes}
            onPlayEpisode={onPlayEpisode}
            onQueueEpisode={onQueueEpisode}
          />
        ) : (
          <EpisodesList
            podcastImageUrl={podcast.imageUrl}
            episodes={filteredEpisodes}
            onPlayEpisode={onPlayEpisode}
            onQueueEpisode={onQueueEpisode}
          />
        )}
      </div>
    </div>
  );
};

export default Episodes;
