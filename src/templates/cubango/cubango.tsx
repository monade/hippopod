import { useContext, useEffect, useState } from "react";
import { Player } from "../../components";
import { Podcast } from "../../models/podcast";
import { playerContext } from "../../store/playerContext";
import { Types } from "../../store/playerReducer";
import { getPodcast } from "../../utils/podcastUtils";
import Header from "./components/header/header";
import "./cubango.scss";

const Cubango = () => {
  const [podcast, setPodcast] = useState<Podcast>();

  useEffect(() => {
    getPodcast("https://feeds.megaphone.fm/muschioselvaggio").then((res) =>
      setPodcast(res)
    );
  });

  /* set scss variables */

  useEffect(() => {
    document.documentElement.style.setProperty("--primaryColor", "#2EB170");
    document.documentElement.style.setProperty("--secondaryColor", "#242C36");
  }, []);

  /* player stuff */

  const { state, dispatch } = useContext(playerContext);

  const [playWhenPlayerIsReady, setPlayWhenPlayerIsReady] = useState({
    id: "",
    play: false,
  });

  const addEpisodeToEndOfQueue = () => {
    dispatch({
      type: Types.AddEpisodeToEndOfQueue,
      payload: {
        id: Math.random().toString(),
        url: "https://podcast.radiopopolare.it/podcast/popolare-gr.mp3",
        date: new Date(),
        size: 7.12,
        title: "#36 Tra guerra santa e Jihad - Le crociate",
      },
    });
  };

  const addEpisodeToTopOfQueue = () => {
    dispatch({
      type: Types.AddEpisodeToTopOfQueue,
      payload: {
        id: Math.random().toString(),
        url: "https://api.spreaker.com/download/episode/49986136/37_crociateoccidente.mp3",
        date: new Date(),
        size: 12.34,
        title: "#36 Tra guerra santa e Jihad - Le crociate",
      },
    });
  };

  const addEpisodeToTopOfQueueAndPlay = () => {
    const ID = Math.random().toString();
    dispatch({
      type: Types.AddEpisodeToTopOfQueue,
      payload: {
        id: ID,
        url: "https://podcast.radiopopolare.it/podcast/popolare-gr.mp3",
        date: new Date(),
        size: 1.2,
        title:
          "#36 Tra guerra santa e Jihad - Le crociate",
      },
    });
    setPlayWhenPlayerIsReady({ id: ID, play: true });
  };

  const getNextTrack = () => {
    return state.queue.length > 1 ? state.queue[1] : null;
  };

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

  return (
    <>
      <Header title={podcast?.title} />
      <h2>
        -------------------- this is an example of what the rest of the app can
        do to interact with the player:
      </h2>
      <button onClick={addEpisodeToEndOfQueue}>
        Add Episode to end of queue
      </button>
      <button onClick={addEpisodeToTopOfQueue}>
        Add episode to top of queue
      </button>
      <button onClick={addEpisodeToTopOfQueueAndPlay}>
        Add episode to top of queue and play it
      </button>
      <Player />
    </>
  );
};

export default Cubango;
