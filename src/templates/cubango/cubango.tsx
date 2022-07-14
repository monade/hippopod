import React, { useContext, useEffect, useState } from "react";
import { Podcast } from "../../models/podcast";
import { getPodcast } from "../../utils/podcastUtils";
import "./cubango.scss";
import PodcastInfo from "./components/PodcastInfo/PodcastInfo";
import StickyHeader from "./components/StickyHeader/StickyHeader";
import Episodes from "./components/Episodes/Episodes";
import { Links } from "../../models/links";
import { Socials } from "../../models/socials";
import { EpisodesLayout } from "../../models/episodes-layout";
import { Episode } from "../../models/episode";
import Footer from "./components/Footer/Footer";
import { Types } from "../../store/playerReducer";
import { playerContext } from "../../store/playerContext";
import { Player } from "../../components";

interface Props {
  color: string;
  themeMode: string;
  links: Links;
  socials: Socials;
}

const rootStyle = (document.querySelector(":root") as any).style;
const computedStyle = getComputedStyle(document.documentElement);

const Cubango: React.FC<Props> = ({ color, themeMode, links, socials }) => {
  const [podcast, setPodcast] = useState<Podcast>();
  const [textColorOnPrimary, setTextColorOnPrimary] = useState<string>("white");
  const [episodesLayout, setEpisodesLayout] = useState<EpisodesLayout>("list");

  const { state, dispatch } = useContext(playerContext);

  const [playWhenPlayerIsReady, setPlayWhenPlayerIsReady] = useState({
    id: "",
    play: false,
  });

  const getEpisodeSizeInMB = (episode: Episode) => {
    return (Math.round(((episode.sizeBytes || 0) / 1000000) * 100) /
      100) as number;
  };

  const canEpisodeBePlayed = (episode: Episode) => {
    return (
      Boolean(episode.url) &&
      Boolean(episode.title) &&
      Boolean(episode.publicationDate) &&
      (Boolean(episode.imageUrl) || Boolean(podcast?.imageUrl))
    );
  };

  const addEpisodeToEndOfQueue = (episode: Episode) => {
    console.log("addEpisodeToEndOfQueue", episode);
    if (!canEpisodeBePlayed(episode)) {
      console.error("Episode can't be played");
      return;
    }
    dispatch({
      type: Types.AddEpisodeToEndOfQueue,
      payload: {
        id: `${episode.id}${Math.random()}`,
        url: episode.url as string,
        date: episode.publicationDate as Date,
        size: getEpisodeSizeInMB(episode),
        title: episode.title as string,
        imageUrl: (episode.imageUrl || podcast?.imageUrl) as string,
      },
    });
  };

  const addEpisodeToTopOfQueue = (episode: Episode) => {
    console.log("addEpisodeToTOpOfQueue", episode);
    if (!canEpisodeBePlayed(episode)) {
      console.error("Episode can't be played");
      return;
    }
    dispatch({
      type: Types.AddEpisodeToTopOfQueue,
      payload: {
        id: `${episode.id}${Math.random()}`,
        url: episode.url as string,
        date: episode.publicationDate as Date,
        size: getEpisodeSizeInMB(episode),
        title: episode.title as string,
        imageUrl: (episode.imageUrl || podcast?.imageUrl) as string,
      },
    });
  };

  const addEpisodeToTopOfQueueAndPlay = (episode: Episode) => {
    console.log("addEpisodeToTopOfQueueAndPlay", episode);
    if (!canEpisodeBePlayed(episode)) {
      console.error("Episode can't be played");
      return;
    }
    const episodeId = `${episode.id}${Math.random()}`;
    dispatch({
      type: Types.AddEpisodeToTopOfQueue,
      payload: {
        id: episodeId,
        url: episode.url as string,
        date: episode.publicationDate as Date,
        size: getEpisodeSizeInMB(episode),
        title: episode.title as string,
        imageUrl: (episode.imageUrl || podcast?.imageUrl) as string,
      },
    });
    setPlayWhenPlayerIsReady({ id: episodeId, play: true });
  };

  const getNextTrack = () => {
    return state.queue.length > 1 ? state.queue[1] : null;
  };

  useEffect(() => {
    setStyle(color, themeMode);
    setTextColorOnPrimary(calcTextColorOnPrimary(color));
    getPodcast(links.rssFeed).then((res) => setPodcast(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!state.audioPlayer.goToNextEpisode) {
      return;
    }
    const nextTrackId = getNextTrack()?.id;
    dispatch({
      type: Types.DeleteEpisode,
      payload: {
        id: state.queue[0].id,
      },
    });
    setPlayWhenPlayerIsReady({
      id: nextTrackId || "",
      play: Boolean(nextTrackId),
    });
  }, [state.audioPlayer.goToNextEpisode]);

  useEffect(() => {
    if (
      playWhenPlayerIsReady.play &&
      state.audioPlayer.isReady &&
      state.audioPlayer.episode?.id === playWhenPlayerIsReady.id
    ) {
      state.audioPlayer.play();
      setPlayWhenPlayerIsReady({
        id: "",
        play: false,
      });
    }
  }, [
    playWhenPlayerIsReady,
    playWhenPlayerIsReady.id,
    playWhenPlayerIsReady.play,
    state.queue,
    state.audioPlayer.isReady,
    state.audioPlayer.episode,
  ]);

  const lastUpdate = podcast ? getLastUpdate(podcast) : undefined;

  const playEpisode = (episode: Episode) => {
    addEpisodeToTopOfQueueAndPlay(episode);
  };

  const queueEpisode = (episode: Episode) => {
    addEpisodeToEndOfQueue(episode);
  };

  return podcast ? (
    <main className="main">
      <StickyHeader
        title={podcast.title}
        imageUrl={podcast.imageUrl}
        lastBuildDate={lastUpdate}
        textColor={textColorOnPrimary}
      />
      <PodcastInfo
        podcast={podcast}
        links={links}
        socials={socials}
        textColorOnPrimary={textColorOnPrimary}
      />
      <Episodes
        podcast={podcast}
        layout={episodesLayout}
        onLayoutSelect={(layout) => setEpisodesLayout(layout)}
        onPlayEpisode={playEpisode}
        onQueueEpisode={queueEpisode}
      />
      <Footer />
      <Player />
    </main>
  ) : (
    <span>Loading...</span>
  );
};

const setStyle = (color: string, themeMode: string) => {
  rootStyle.setProperty("--primary-color", `#${color}`);

  rootStyle.setProperty(
    "--bg-color",
    computedStyle.getPropertyValue(`--${themeMode}-mode-bg-color`)
  );
  rootStyle.setProperty(
    "--text-color",
    computedStyle.getPropertyValue(`--${themeMode}-mode-text-color`)
  );
};

const calcTextColorOnPrimary = (color: string) => {
  try {
    if (new RegExp(/^#[0-9a-f]{6,8}$/i).test(color)) {
      throw new Error("Not a valid color");
    }

    return calcTextColorOnColor(color);
  } catch {
    return "#ffffff";
  }
};

const calcTextColorOnColor = (color: string) => {
  const [r, g, b, a] = (color.match(/.{1,2}/g) || []).map((x) =>
    parseInt(x, 16)
  );

  if (a / 255 < 0.5) {
    return "#000000";
  }

  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#ffffff";
};

const getLastUpdate = (podcast: Podcast) => {
  if (podcast.lastBuildDate) {
    return podcast.lastBuildDate;
  }

  const episodesDates = podcast.episodes
    .map((episode) => episode.publicationDate?.getTime())
    .filter((date) => !!date) as number[];

  if (episodesDates.length === 0) {
    return undefined;
  }

  return new Date(Math.max(...episodesDates));
};

export default Cubango;
