import React, { useContext, useEffect, useState } from "react";
import { playerContext } from "../../store/playerContext";
import { Types } from "../../store/playerReducer";
import Commands from "./commands";
import "./player.scss";
import Queue from "./queue";

export default function Player() {
  const [isQueueVisible, setIsQueueVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(playerContext);

  useEffect(() => {
    setIsLoading(
      !state.audioPlayer.audio.paused &&
        state.audioPlayer.isReady &&
        state.audioPlayer.isLoading
    );
  }, [state.audioPlayer.isLoading, state.audioPlayer.isReady]);

  return (
    <>
      {state.queue.length === 0 ? (
        ""
      ) : (
        <>
          <Commands
            isLoading={isLoading}
            isQueueVisible={isQueueVisible}
            setIsQueueVisible={setIsQueueVisible}
          />
          <Queue isQueueVisible={isQueueVisible} />
        </>
      )}
    </>
  );
}
