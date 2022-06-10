import React, { useContext, useEffect, useState } from "react";
import { EpisodeContextType, playerContext } from "../../store/playerContext";
import { Types } from "../../store/playerReducer";

interface CommandsPropsInterface {
  isQueueVisible: boolean;
  setIsQueueVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

enum PlaybackRates {
  SLOW = 0.5,
  NORMAL = 1,
  FAST = 1.5,
  FASTEST = 2,
  EXTRA_FAST = 10,
}

function getPlaybackRateKeyByValue(value: number) {
  return Object.keys(PlaybackRates)[
    Object.values(PlaybackRates).indexOf(value as unknown as PlaybackRates)
  ];
}

export default function Commands({
  isQueueVisible,
  setIsQueueVisible,
  isLoading,
}: CommandsPropsInterface) {
  const { state, dispatch } = useContext(playerContext);

  const audioPlayer = state.audioPlayer;

  const [currentEpisode, setCurrentEpisode] =
    useState<EpisodeContextType | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [isMuted, setIsMuted] = useState(false);

  const [volume, setVolume] = useState(80);

  const [playbackRate, setPlaybackRate] = useState(
    PlaybackRates.NORMAL as number
  );

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setCurrentTime(audioPlayer.audio.currentTime);
  }, [audioPlayer.audio.currentTime]);

  useEffect(() => {
    if (state.queue.length === 0) {
      setCurrentEpisode(null);
    }

    setCurrentEpisode(state.queue[0]);
  }, [state.queue]);

  useEffect(() => {
    if (!currentEpisode) {
      disableAudioPlayer();
    } else {
      initAudioPlayer();
    }
  }, [currentEpisode]);

  useEffect(() => {
    setIsPlaying(!state.audioPlayer.audio.paused);
  }, [state.audioPlayer.audio.paused]);

  useEffect(() => {
    if (isMuted) {
      audioPlayer.setVolume(0);
    } else {
      audioPlayer.setVolume(volume / 100);
    }
  }, [isMuted]);

  useEffect(() => {
    setIsMuted(false);
    audioPlayer.setVolume(volume / 100);
  }, [volume]);

  const initAudioPlayer = () => {
    if (!currentEpisode) {
      throw new Error("Can't initialize audio player.");
    }
    audioPlayer.setEpisode(currentEpisode);
  };

  const playOrPause = () => {
    setIsPlaying((prev) => !prev);
    audioPlayer.playOrPause();
  };

  const skipSeconds = (seconds: number) => {
    audioPlayer.skipSeconds(seconds);
  };

  const disableAudioPlayer = () => {
    audioPlayer.destroyEpisode();
  };

  const triggerShowQueue = () => {
    setIsQueueVisible((prev) => !prev);
  };

  const triggerMuted = () => {
    setIsMuted((prev) => !prev);
  };

  const changePlaybackRate = () => {
    const playbackValues = Object.values(PlaybackRates).filter(
      (val) => typeof val === "number"
    );
    const nextPlaybackValue = playbackValues[
      playbackValues.length > playbackValues.indexOf(playbackRate) + 1
        ? playbackValues.indexOf(playbackRate) + 1
        : 0
    ] as number;
    setPlaybackRate(nextPlaybackValue);
    audioPlayer.setPlaybackRate(nextPlaybackValue);
  };

  return (
    <div>
      <h1>COMMANDS</h1>
      <h3>Title: {currentEpisode?.title || "<no track>"}</h3>
      <p>
        <strong>Date: </strong>
        {currentEpisode?.date ? currentEpisode.date.toString() : "<no date>"}
      </p>
      <p>
        <strong>URL: </strong>
        {currentEpisode?.url || "<no url>"}
      </p>
      <p>
        <strong>Time elapsed in seconds: </strong>
        {audioPlayer.currentTime} seconds of {audioPlayer.duration} seconds
      </p>
      <p>
        <strong>Time to the end in seconds: </strong>
        {audioPlayer.duration && audioPlayer.currentTime
          ? audioPlayer.duration - audioPlayer.currentTime
          : 0}
        seconds
      </p>
      <p>
        <strong>Size: </strong>
        {currentEpisode?.size || 0} Bytes
      </p>
      <p>
        <strong>Percentuale di progresso: </strong>
        {audioPlayer.duration &&
        audioPlayer.duration !== 0 &&
        audioPlayer.currentTime
          ? audioPlayer.currentTime / audioPlayer.duration
          : 0}
        %
      </p>
      <input
        type="range"
        min="0"
        max={audioPlayer.duration}
        value={currentTime}
        onChange={(event) => {
          setCurrentTime(parseInt(event.target.value));
          audioPlayer.audio.currentTime = parseInt(event.target.value);
        }}
      />
      <button
        onClick={() => {
          skipSeconds(-10);
        }}
      >
        -10 seconds
      </button>
      <button
        onClick={() => {
          if (isLoading) {
            return;
          }
          playOrPause();
        }}
      >
        {isLoading ? "Loading..." : isPlaying ? "Pause" : "Play"}
      </button>
      <button
        onClick={() => {
          skipSeconds(+10);
        }}
      >
        +10 seconds
      </button>
      <button onClick={audioPlayer.download}>download</button>
      <input
        type="range"
        min="0"
        max="100"
        value={isMuted ? 0 : volume}
        onChange={(event) => setVolume(parseInt(event.target.value))}
      />
      <button onClick={triggerMuted}>{isMuted ? "unmute" : "mute"}</button>
      <button onClick={changePlaybackRate}>{playbackRate}x</button>
      <button onClick={triggerShowQueue}>
        {isQueueVisible ? "Hide" : "Show"} queue
      </button>
    </div>
  );
}
