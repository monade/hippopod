import React from "react";
import playerContext from "./playerContext";

export default function PlayPauseButton() {
  const ctx = React.useContext(playerContext);

  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <button
      onClick={() => {
        isPlaying ? ctx?.audioPlayer.pause() : ctx?.audioPlayer.play();
        setIsPlaying(!isPlaying);
      }}
    >
      {isPlaying ? "pause" : "play"}
    </button>
  );
}
