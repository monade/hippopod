import { useContext, useEffect, useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { playerContext } from "../../store/playerContext";
import Commands from "./commands";
import MobileCommands from "./mobileCommands";
import MobileQueue from "./mobileQueue";
import "./player.scss";
import Queue from "./queue";

export default function Player() {
  const [isQueueVisible, setIsQueueVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(playerContext);

  const { width, isMobile } = useIsMobile();

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
          {isMobile ? (
            <>
              <MobileCommands
                isLoading={isLoading}
                isQueueVisible={isQueueVisible}
                setIsQueueVisible={setIsQueueVisible}
              />
              <MobileQueue
                isQueueVisible={isQueueVisible}
                setIsQueueVisible={setIsQueueVisible}
              />
              <div className="player-space-mobile" />
            </>
          ) : (
            <>
              <Commands
                isLoading={isLoading}
                isQueueVisible={isQueueVisible}
                setIsQueueVisible={setIsQueueVisible}
              />
              <Queue
                isQueueVisible={isQueueVisible}
                setIsQueueVisible={setIsQueueVisible}
              />
              <div className="player-space" />
            </>
          )}
        </>
      )}
    </>
  );
}
