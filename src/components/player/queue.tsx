import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { EpisodeContextType, playerContext } from "../../store/playerContext";
import { Types } from "../../store/playerReducer";
import Icon from "../utils/icon";
import "./queue.scss";
import ARGUMENTS from "../../data/arguments";
import { colord } from "colord";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

interface QueuePropsInterface {
  isQueueVisible: boolean;
  setIsQueueVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Queue({
  isQueueVisible,
  setIsQueueVisible,
}: QueuePropsInterface) {
  const { state, dispatch } = useContext(playerContext);

  const [queue, setQueue] = useState<EpisodeContextType[] | null>(null);

  const queueRef = useRef(null);

  useOnClickOutside(queueRef, () => setIsQueueVisible(false));

  const deleteIconStyles = {
    width: "12px",
    height: "12px",
  };

  useEffect(() => {
    setQueue(state.queue);
  }, [state.queue]);

  const removeAllTracks = () => {
    state.audioPlayer.pause();
    dispatch({
      type: Types.DeleteAllEpisodes,
      payload: null,
    });
  };

  const removeTrack = (id: string) => {
    dispatch({
      type: Types.DeleteEpisode,
      payload: {
        id: id,
      },
    });
  };

  const background = useMemo(() => {
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue(
      "--bg-color"
    );

    if (ARGUMENTS.themeMode === "dark") {
      return colord(bgColor).lighten(0.05).toHex();
    }
    return bgColor;
  }, []);

  const border = useMemo(() => {
    if (ARGUMENTS.themeMode === "dark") {
      return "1px solid #4B4F55";
    }
    return "1px solid #CECECE";
  }, []);

  return (
    <div className="queue-container">
      <div className="second-queue-container">
        {!isQueueVisible ? (
          ""
        ) : (
          <div className="queue-third-container">
            <div
              ref={queueRef}
              className="queue"
              style={{ backgroundColor: background, border: border }}
            >
              <div className="episode-height queue-header horizontal-queue-padding">
                <p className="up-next-title">
                  <b>Up Next</b>
                </p>
                <div
                  onClick={() => {
                    removeAllTracks();
                  }}
                  className="clear-all"
                >
                  <b>Clear all</b>
                </div>
              </div>
              <div className="queue-episode-list">
                {queue?.map((episode, index) => (
                  <div
                    className="queue-episode-item horizontal-queue-padding episode-height"
                    key={episode.id}
                    onClick={() => {
                      let episodesToRemove: string[] = [];
                      state.queue.forEach((episode, i) => {
                        if (i < index) {
                          episodesToRemove.push(episode.id);
                        }
                      });
                      episodesToRemove.forEach((id) => {
                        removeTrack(id);
                      });
                      setTimeout(() => {
                        state.audioPlayer.playOrPause();
                      }, 250);
                    }}
                  >
                    <img
                      alt="Episode"
                      src={episode.imageUrl}
                      className={`queue-episode-image ${
                        index === 0 ? "queue-episode-image-first" : ""
                      }`}
                    />
                    <div className="queue-episode-title">{episode.title}</div>
                    <div
                      className="remove-episode-icon-container clickable circle-command-button flex-center-center"
                      onClick={() => {
                        removeTrack(episode.id);
                      }}
                    >
                      <Icon
                        className="remove-episode-icon flex-center-center"
                        iconRelativePath="player/x"
                        svgStyles={deleteIconStyles}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
