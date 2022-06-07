import React, { useEffect } from "react";
import AudioPlayer from "./audioPlayer";
import Commands from "./commands";
import PlayerContext from "./playerContext";
import Queue from "./queue";
import { PlayerContextInterface } from "./types";

export default function Player() {
  const audioPlayer = AudioPlayer;
  const playerContextInterface: PlayerContextInterface = {
    queue: [
      {
        url: "https://podcast.radiopopolare.it/podcast/popolare-gr.mp3",
        date: new Date(),
        size: 40000000,
        title: "#36 Tra guerra santa e Jihad - Le crociate",
        // duration: new Date(70000),
        playTime: new Date(5000),
      },
    ],
    audioPlayer,
    getCurrentEpisode: () => {
      return playerContextInterface.queue[0];
    },
  };
  useEffect(() => {
    console.log("setting episode.");
    audioPlayer.setEpisode(playerContextInterface.getCurrentEpisode());
  }, []);

  return (
    <PlayerContext.Provider value={playerContextInterface}>
      <Commands />
      <Queue />
    </PlayerContext.Provider>
  );
}
