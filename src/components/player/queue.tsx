import React from "react";

interface QueuePropsInterface {
  isQueueVisible: boolean;
}

export default function Queue({ isQueueVisible }: QueuePropsInterface) {
  return <div>{!isQueueVisible ? "" : <h1>QUEUE:</h1>}</div>;
}
