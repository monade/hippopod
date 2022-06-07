import React from "react";
import playerContext from "./playerContext";
import QueueEpisode from "./queueEpisode";

export default function Queue() {
  const ctx = React.useContext(playerContext);

  return (
    <div>
      <h1>QUEUE:</h1>
      <button>togli tutti i brani</button>
      {ctx?.queue.map((episode, index) => {
        return <QueueEpisode key={episode.url} episode={episode} />;
      })}
    </div>
  );
}
