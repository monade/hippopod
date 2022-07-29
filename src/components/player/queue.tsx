import React, {useContext, useEffect, useMemo, useState} from "react";
import { EpisodeContextType, playerContext } from "../../store/playerContext";
import { Types } from "../../store/playerReducer";
import Icon from "../utils/icon";
import "./queue.scss";
import {ARGUMENTS} from "../../data/arguments";
import {colord} from "colord";

interface QueuePropsInterface {
  isQueueVisible: boolean;
}

export default function Queue({ isQueueVisible }: QueuePropsInterface) {
  const { state, dispatch } = useContext(playerContext);

  const [queue, setQueue] = useState<EpisodeContextType[] | null>(null);

  const deleteIconStyles = {
    width: "16px",
    height: "16px",
  };

  useEffect(() => {
    setQueue(state.queue);
  }, [state.queue]);

  const removeAllTracks = () => {
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
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');

    if (ARGUMENTS.themeMode === "dark") {
      return colord(bgColor).lighten(0.05).toHex();
    }
    return bgColor;
  }, []);

  const border = useMemo(() => {
    if (ARGUMENTS.themeMode === "dark") {
      return '1px solid #4B4F55';
    }
    return '1px solid #CECECE'
  }, []);

  return (
    <div className="queue-container" >
      <div className="second-queue-container">
        {!isQueueVisible ? (
          ""
        ) : (
          <div className="queue-third-container">
            <div className="queue" style={{ backgroundColor: background, border: border }}>
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
                      className="remove-episode-icon-container"
                      onClick={() => {
                        removeTrack(episode.id);
                      }}
                    >
                      <Icon
                        className="remove-episode-icon"
                        iconRelativePath="player/back10"
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
