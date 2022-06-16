import React, { useContext, useEffect, useState } from "react";
import { EpisodeContextType, playerContext } from "../../store/playerContext";
import { Types } from "../../store/playerReducer";
import "./queue.scss";

interface QueuePropsInterface {
  isQueueVisible: boolean;
}

export default function Queue({ isQueueVisible }: QueuePropsInterface) {
  const { state, dispatch } = useContext(playerContext);

  const [queue, setQueue] = useState<EpisodeContextType[] | null>(null);

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

  return (
    <div>
      {!isQueueVisible ? (
        ""
      ) : (
        <>
          <h1>QUEUE:</h1>
          <button
            onClick={() => {
              removeAllTracks();
            }}
          >
            remove all tracks
          </button>
          {queue?.map((episode) => (
            <div key={episode.id}>
              {JSON.stringify(episode)}{" "}
              <button
                onClick={() => {
                  removeTrack(episode.id);
                }}
              >
                X
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
