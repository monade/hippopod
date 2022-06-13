import React, { useContext, useEffect, useState } from "react";
import { playerContext } from "../../store/playerContext";
import { Types } from "../../store/playerReducer";
import Commands from "./commands";
import Queue from "./queue";

export default function Player() {
  const { state, dispatch } = useContext(playerContext);
  const [isQueueVisible, setIsQueueVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addEpisodeToEndOfQueue = () => {
    dispatch({
      type: Types.AddEpisodeToEndOfQueue,
      payload: {
        id: Math.random().toString(),
        url: "https://podcast.radiopopolare.it/podcast/popolare-gr.mp3",
        date: new Date(),
        size: 40000000,
        title: "END OF QUEUE #36 Tra guerra santa e Jihad - Le crociate",
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
        size: 40000000,
        title: "TOP OF QUEUE #36 Tra guerra santa e Jihad - Le crociate",
      },
    });
  };

  const [playWhenPlayerIsReady, setPlayWhenPlayerIsReady] = useState({
    id: "",
    play: false,
  });

  const addEpisodeToTopOfQueueAndPlay = () => {
    const ID = Math.random().toString();
    dispatch({
      type: Types.AddEpisodeToTopOfQueue,
      payload: {
        id: ID,
        url: "https://podcast.radiopopolare.it/podcast/popolare-gr.mp3",
        date: new Date(),
        size: 40000000,
        title:
          "TOP OF QUEUE AND PLAY #36 Tra guerra santa e Jihad - Le crociate",
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

  useEffect(() => {
    setIsLoading(
      !state.audioPlayer.audio.paused &&
        state.audioPlayer.isReady &&
        state.audioPlayer.isLoading
    );
  }, [state.audioPlayer.isLoading, state.audioPlayer.isReady]);

  return (
    <div>
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
      <h2>-------------------- player starts here:</h2>
      <Commands
        isLoading={isLoading}
        isQueueVisible={isQueueVisible}
        setIsQueueVisible={setIsQueueVisible}
      />
      <Queue isQueueVisible={isQueueVisible} />
      <h2>-------------------- player state:</h2>
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </div>
  );
}
