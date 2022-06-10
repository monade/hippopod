import React from "react";

interface CommandsPropsInterface {
  setIsQueueVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Commands({
  setIsQueueVisible,
}: CommandsPropsInterface) {

  const triggerShowQueue = () => {
    console.log("aljsdja");
    setIsQueueVisible((prev) => !prev);
  };

  return (
    <div>
      <h1>COMMANDS</h1>
      <button onClick={() => triggerShowQueue()}>show queue</button>
      {/* <SkipSecondsButton seconds={-10} />
      <PlayPauseButton />
      <SkipSecondsButton seconds={10} />
      <div>titolo: {ctx?.getCurrentEpisode()?.title}</div>
      <div>data: {ctx?.getCurrentEpisode()?.date.toString()}</div>
      <div>durata: {ctx?.audioPlayer.getDuration()} seconds</div>
      <div>dimensione: {ctx?.getCurrentEpisode()?.size} Bytes</div>
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
        href={ctx?.getCurrentEpisode()?.url}
        download={ctx?.getCurrentEpisode()?.url.split("/").pop()}
      >
        scarica
      </a>
      <button>apri/chiudi coda</button> */}
    </div>
  );
}
