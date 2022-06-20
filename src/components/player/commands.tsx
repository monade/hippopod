import React, { useContext, useEffect, useRef, useState } from "react";
import { EpisodeContextType, playerContext } from "../../store/playerContext";
import { getDateString, getTimeStringFromSeconds } from "../../utils/dateUtils";
import CircularProgressBar from "../utils/circularProgressBar";
import Icon from "../utils/icon";
import "./commands.scss";

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

  const timeTrackSlider = useRef(null);

  const back10SvgStyles = {
    width: "30px",
    height: "30px",
  };
  const forward10SvgStyles = back10SvgStyles;
  const playOrPauseSvgStyles = {
    width: "22px",
    height: "22px",
  };
  const playerDiameter = 66;
  const muteUnmuteSvgStyles = {
    width: "16px",
    height: "16px",
  };

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

  useEffect(() => {
    (
      timeTrackSlider.current as any
    ).style.background = `background: linear-gradient(
      90deg,
      var(--primaryColor) ${currentTime / audioPlayer.duration}%,
      rgba(255, 255, 255, 0.4) ${currentTime / audioPlayer.duration}%
    )`;
  }, [currentTime]);

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
    <div className="commands commands-background">
      <div className="commands-container flex-row justify-content-between align-items-center">
        <div className="flex-row flex-center-center">
          <div
            onClick={() => {
              skipSeconds(-10);
            }}
            style={{ cursor: "cursor-pointer" }}
            className="clickable command-button back-10-button"
          >
            <Icon
              iconRelativePath="player/back10"
              svgStyles={back10SvgStyles}
            />
          </div>
          <div
            className="clickable command-button play-container"
            onClick={() => {
              if (isLoading) {
                return;
              }
              playOrPause();
            }}
          >
            <div className="play-outer-circle position-absolute"></div>
            <CircularProgressBar
              percentage={currentTime / audioPlayer.duration}
              color="#2EB170"
              diameter={playerDiameter}
            />
            <img
              className="play-image-container position-absolute"
              src="https://picsum.photos/68/68"
            />
            <Icon
              className="position-absolute play-or-pause-icon flex-center-center"
              iconRelativePath={isPlaying ? "player/pause" : "player/play"}
              svgStyles={playOrPauseSvgStyles}
            />
          </div>
          <div
            className="clickable command-button front-10-button"
            onClick={() => {
              skipSeconds(+10);
            }}
          >
            <Icon
              iconRelativePath="player/forward10"
              svgStyles={forward10SvgStyles}
            />
          </div>
        </div>
        <div className="flex-column title-section">
          <p className="text-no-wrap title">{currentEpisode?.title}</p>
          <p className="text-no-wrap subtitle">
            {getDateString(currentEpisode?.date)} ·{" "}
            {getTimeStringFromSeconds(audioPlayer.duration || null)} ·{" "}
            {currentEpisode?.size} MB
          </p>
        </div>
        <div className="flex-row time-track-section">
          <p className="text-no-wrap time-track-timer left-timer">
            {getTimeStringFromSeconds(audioPlayer.currentTime || null)}
          </p>
          <input
            className="time-track-slider"
            ref={timeTrackSlider}
            type="range"
            min="0"
            max={audioPlayer.duration}
            value={currentTime}
            onChange={(event) => {
              setCurrentTime(parseInt(event.target.value));
              audioPlayer.audio.currentTime = parseInt(event.target.value);
            }}
          />
          <p className="text-no-wrap time-track-timer right-timer">
            {audioPlayer.duration && audioPlayer.currentTime ? "-" : ""}
            {getTimeStringFromSeconds(
              audioPlayer.duration && audioPlayer.currentTime
                ? audioPlayer.duration - audioPlayer.currentTime
                : null
            )}
          </p>
        </div>
        <div className="flex-row">
          <Icon
            onClick={triggerMuted}
            className="clickable mute-unmute-icon flex-center-center"
            iconRelativePath={
              isMuted || volume === 0 ? "player/volume-mute" : "player/volume"
            }
            svgStyles={muteUnmuteSvgStyles}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(event) => setVolume(parseInt(event.target.value))}
          />
        </div>
        <div className="flex-row">
          <div
            className="clickable circle-command-button left-circle-command-button flex-center-center"
            onClick={changePlaybackRate}
          >
            <p>{playbackRate}x</p>
          </div>
          <div
            className="clickable circle-command-button flex-center-center"
            onClick={() => {
              window.open(currentEpisode?.url || "", "_blank");
            }}
          >
            <Icon
              className="download-icon flex-center-center"
              iconRelativePath="player/download"
              svgStyles={muteUnmuteSvgStyles}
            />
          </div>

          <div className="clickable circle-command-button flex-center-center" onClick={triggerShowQueue}>
            <Icon
              className="menu-icon flex-center-center"
              iconRelativePath="player/menu"
              svgStyles={muteUnmuteSvgStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
