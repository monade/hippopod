// https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm

import { EpisodeContextType } from "./playerContext";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  AddEpisodeToEndOfQueue = "ADD_EPISODE_TO_END_OF_QUEUE",
  AddEpisodeToTopOfQueue = "ADD_EPISODE_TO_TOP_OF_QUEUE",
  DeleteEpisode = "DELETE_EPISODE",
  DeleteAllEpisodes = "DELETE_ALL_EPISODES",
}

type QueuePayload = {
  [Types.AddEpisodeToEndOfQueue]: EpisodeContextType;
  [Types.AddEpisodeToTopOfQueue]: EpisodeContextType;
  [Types.DeleteEpisode]: {
    id: string;
  };
  [Types.DeleteAllEpisodes]: null;
};

export type QueueActions =
  ActionMap<QueuePayload>[keyof ActionMap<QueuePayload>];

export const queueReducer = (
  state: EpisodeContextType[],
  action: QueueActions
) => {
  switch (action.type) {
    case Types.AddEpisodeToEndOfQueue:
      return [
        ...state,
        {
          id: action.payload.id,
          url: action.payload.url,
          date: action.payload.date,
          size: action.payload.size,
          title: action.payload.title,
          imageUrl: action.payload.imageUrl,
        },
      ];
    case Types.AddEpisodeToTopOfQueue:
      return [
        {
          id: action.payload.id,
          url: action.payload.url,
          date: action.payload.date,
          size: action.payload.size,
          title: action.payload.title,
          imageUrl: action.payload.imageUrl,
        },
        ...state,
      ];
    case Types.DeleteEpisode:
      return [...state.filter((product) => product.id !== action.payload.id)];
    case Types.DeleteAllEpisodes:
      return [];
    default:
      return state;
  }
};
