import React from "react";
import playerContext from "./playerContext";
import PlayPauseButton from "./playPauseButton";
import SkipSecondsButton from "./skipSecondsButton";

export default function Commands() {
  const ctx = React.useContext(playerContext);

  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div>
      <h1>COMMADNS</h1>
      <SkipSecondsButton seconds={-10} />
      <PlayPauseButton />
      <SkipSecondsButton seconds={10} />
      <div>titolo: {ctx?.getCurrentEpisode().title}</div>
      <div>data: {ctx?.getCurrentEpisode().date.toString()}</div>
      <div>durata: {ctx?.audioPlayer.getDuration()} seconds</div>
      <div>dimensione: {ctx?.getCurrentEpisode().size} Bytes</div>
      <div>tempo trascorso: {ctx?.audioPlayer.getCurrentTime()} seconds</div>
      <div>
        percentuale di progresso:{" "}
        {ctx?.audioPlayer.getDuration() && ctx?.audioPlayer.getCurrentTime()
          ? ctx?.audioPlayer.getCurrentTime() / ctx?.audioPlayer.getDuration()
          : 0}
      </div>
      <div>
        tempo dalla fine:{" "}
        {ctx?.audioPlayer.getDuration() && ctx?.audioPlayer.getCurrentTime()
          ? ctx?.audioPlayer.getDuration() - ctx?.audioPlayer.getCurrentTime()
          : 0}
      </div>
      <div>volume: TODO</div>
      <button>velocità</button>
      <a
        href={ctx?.getCurrentEpisode().url}
        download={ctx?.getCurrentEpisode().url.split("/").pop()}
      >
        scarica
      </a>
      <button>apri/chiudi coda</button>
    </div>
  );
}
