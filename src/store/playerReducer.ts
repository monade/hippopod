// https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};

export enum Types {
  AddEpisode = 'ADD_EPISODE',
  DeleteEpisode = 'DELETE_EPISODE',
}

type EpisodeType = {
  url: string;
  date: Date;
  size: number;
  title: string;
  playTime: Date;
}

type QueuePayload = {
  [Types.AddEpisode] : EpisodeType;
  [Types.DeleteEpisode]: {
    url: string;
  }
}

export type QueueActions = ActionMap<QueuePayload>[keyof ActionMap<QueuePayload>];

export const queueReducer = (state: EpisodeType[], action: QueueActions) => {
  switch (action.type) {
    case Types.AddEpisode:
      return [
        ...state,
        {
          url: action.payload.url,
          date: action.payload.date,
          size: action.payload.size,
          title: action.payload.title,
          playTime: action.payload.playTime,
        },
      ];
    case Types.DeleteEpisode:
      return [...state.filter((product) => product.url !== action.payload.url)];
    default:
      return state;
  }
};