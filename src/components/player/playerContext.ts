import React from "react";
import { PlayerContextInterface } from "./types";

export default React.createContext<PlayerContextInterface | null>(null);

// command actions

// const play = () => {
//   audioElement.play();
// };

// const pause = () => {
//   audioElement.pause();
// };

// const goBack10Seconds = () => {};

// const goForward10Seconds = () => {};

// const mute = () => {};

// const unMute = () => {};

// const setVolume = () => {};

// const openQueue = () => {};

// const changeEpisodeSpeed = () => {};

// const downloadEpisode = () => {};

// queue actions

// const selectTrack = () => {};

// const nextTrack = () => {};

// const removeATrack = () => {};

// const removeAllTracks = () => {};

// const addATrack = () => {};
