import { AudioPlayer } from "./audioPlayer";

export interface PlayerContextInterface {
  queue: EpisodeContextInterface[];
  audioPlayer: AudioPlayer;
  getCurrentEpisode: () => EpisodeContextInterface;
}

export interface EpisodeContextInterface {
  url: string;
  date: Date;
  size: number;
  title: string;
  // duration: Date;
  playTime: Date;
}
