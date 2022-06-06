import React, { useEffect } from "react";

export default function Player() {
  // state and variables

  const audioElement = new Audio();

  // effects

  useEffect(() => {
    audioElement.src = "https://podcast.radiopopolare.it/podcast/popolare-gr.mp3";
  }, []);

  // actions

  const play = () => {
    audioElement.play();
  };

  const pause = () => {
    audioElement.pause();
  };

  const goBack10Seconds = () => {};

  const goForward10Seconds = () => {};

  const mute = () => {};

  const unMute = () => {};

  const setVolume = () => {};

  const openQueue = () => {};

  const changeEpisodeSpeed = () => {};

  const downloadEpisode = () => {};

  // formatted strings

  const getEpisodeTitle = () => {};

  const getEpisodeDate = () => {};

  const getEpisodeDuration = () => {};

  const getEpisodeSize = () => {};

  const getEpisodeCurrentTime = () => {};

  const getEpisodeCurrentTimePercentage = () => {};

  const getEpisodeCurrentTImeReverse = () => {};

  return (
    <div>
      <button onClick={play}>play</button>
      <button onClick={pause}>stop</button>
      <button onClick={pause}>stop</button>
      <button onClick={pause}>stop</button>
      <button onClick={pause}>stop</button>
    </div>
  );
}
