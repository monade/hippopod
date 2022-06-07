import React from "react";
import { EpisodeContextInterface } from "./types";

export interface QueueEpisodeInterface {
  episode: EpisodeContextInterface;
}

export default function QueueEpisode({ episode }: QueueEpisodeInterface) {
  return <pre>{JSON.stringify(episode, null, 4)}</pre>;
}
