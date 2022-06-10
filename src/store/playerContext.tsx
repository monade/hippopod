import { createContext, useReducer } from "react";
import audioPlayer, { AudioPlayer } from "../components/player/audioPlayer";
import { queueReducer, QueueActions } from "./playerReducer";

type PlayerContextType = {
  queue: EpisodeContextType[];
  audioPlayer: AudioPlayer;
}

export type EpisodeContextType = {
  url: string;
  date: Date;
  size: number;
  title: string;
  playTime: Date;
}

const initialState: PlayerContextType = {
  queue: [],
  audioPlayer: audioPlayer,
};

const playerContext = createContext<{
  state: PlayerContextType;
  dispatch: React.Dispatch<QueueActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ queue, audioPlayer }: PlayerContextType, action: QueueActions) => ({
  queue: queueReducer(queue, action),
  audioPlayer,
});

const PlayerProvider = (props: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <playerContext.Provider value={{ state, dispatch }}>
      {props.children}
    </playerContext.Provider>
  );
};

export { playerContext, PlayerProvider };
