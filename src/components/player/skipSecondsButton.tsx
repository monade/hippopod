import React from "react";
import playerContext from "./playerContext";

export interface SkipSecondsButtonInterface {
  seconds: number;
}

export default function SkipSecondsButton({
  seconds,
}: SkipSecondsButtonInterface) {
  const ctx = React.useContext(playerContext);

  return <button onClick={() => {
    ctx?.audioPlayer.skipSeconds(seconds);
  }}>{seconds}</button>;
}
