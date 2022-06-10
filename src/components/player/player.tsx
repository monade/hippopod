import React, { useContext, useState } from "react";
import { playerContext } from "../../store/playerContext";
import { Types } from "../../store/playerReducer";
import Commands from "./commands";
import Queue from "./queue";

export default function Player() {
  // const audioPlayer = AudioPlayer;
  // const ctx: PlayerContextInterface = {
  //   queue: [],
  //   audioPlayer,
  //   getCurrentEpisode: () => {
  //     return ctx.queue[0] || null;
  //   },
  //   addEpisodeToQueue: (episode: EpisodeContextInterface) => {
  //     console.log("alsjdbalsj", ctx.queue)
  //     ctx.queue = [...ctx.queue, episode];
  //     console.log("after", ctx.queue)
  //   },
  //   // command actions
  //   // const play = () => {
  //   //   audioElement.play();
  //   // };
  //   // const pause = () => {
  //   //   audioElement.pause();
  //   // };
  //   // const goBack10Seconds = () => {};
  //   // const goForward10Seconds = () => {};
  //   // const mute = () => {};
  //   // const unMute = () => {};
  //   // const setVolume = () => {};
  //   // const openQueue = () => {};
  //   // const changeEpisodeSpeed = () => {};
  //   // const downloadEpisode = () => {};
  //   // queue actions
  //   // const selectTrack = () => {};
  //   // const nextTrack = () => {};
  //   // const removeATrack = () => {};
  //   // const removeAllTracks = () => {};
  //   // const addATrack = () => {};
  // };

  // // useEffect(() => {
  // //   console.log("setting episode.");
  // //   audioPlayer.setEpisode(playerContextInterface.getCurrentEpisode());
  // // }, []);

  const { state, dispatch } = useContext(playerContext);
  const [isQueueVisible, setIsQueueVisible] = useState(false);

  const addEpisodeToQueue = () => {
    dispatch({
      type: Types.AddEpisode,
      payload: {
        url: "https://podcast.radiopopolare.it/podcast/popolare-gr.mp3",
        date: new Date(),
        size: 40000000,
        title: "#36 Tra guerra santa e Jihad - Le crociate",
        playTime: new Date(5000),
      },
    });
  };

  return (
    <div>
      <h2>-------------------- this is an example of what the rest of the app can do to interact with the player:</h2>
      <button onClick={addEpisodeToQueue}>add Episode</button>
      <h2>-------------------- player state:</h2>
      <pre>{JSON.stringify(state, null, 4)}</pre>
      <h2>-------------------- player starts here:</h2>
      <Commands setIsQueueVisible={setIsQueueVisible} />
      <Queue isQueueVisible={isQueueVisible} />
    </div>
  );
}
