import { createContext, useEffect, useReducer } from "react";
import audioPlayer, { AudioPlayer } from "../components/player/audioPlayer";
import { queueReducer, QueueActions } from "./playerReducer";

type PlayerContextType = {
  queue: EpisodeContextType[];
  audioPlayer: AudioPlayer;
};

export type EpisodeContextType = {
  id: string;
  url: string;
  date: Date;
  size: number;
  title: string;
  imageUrl: string;
};

const initialState: PlayerContextType = {
  queue:
    JSON.parse(
      localStorage.getItem("hippopod-player-context-queue") as string
    ) || [],
  audioPlayer: audioPlayer,
};

const playerContext = createContext<{
  state: PlayerContextType;
  dispatch: React.Dispatch<QueueActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { queue, audioPlayer }: PlayerContextType,
  action: QueueActions
) => ({
  queue: queueReducer(queue, action),
  audioPlayer,
});

const PlayerProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    localStorage.setItem(
      "hippopod-player-context-queue",
      JSON.stringify(state.queue)
    );
  }, [state]);
  return (
    <playerContext.Provider value={{ state, dispatch }}>
      {props.children}
    </playerContext.Provider>
  );
};

export { playerContext, PlayerProvider };
