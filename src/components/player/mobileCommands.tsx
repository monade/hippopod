import { colord } from "colord";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ReactSlider from "react-slider";
import ARGUMENTS from "../../data/arguments";
import { EpisodeContextType, playerContext } from "../../store/playerContext";
import { getTimeStringFromSeconds } from "../../utils/dateUtils";
import CircularProgressBar from "../utils/circularProgressBar";
import Icon from "../utils/icon";
import "./mobileCommands.scss";

interface CommandsPropsInterface {
  isQueueVisible: boolean;
  setIsQueueVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

enum PlaybackRates {
  SLOW = 0.5,
  NORMAL = 1,
  FAST = 1.5,
  FASTER = 2,
  MORE_FASTER = 4,
  FASTEST = 6,
  MOST_FASTEST = 8,
}

export default function MobileCommands({
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
  audioPlayer.setOnTimeUpdate(() => {
    setCurrentTime(audioPlayer.currentTime);
  });

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
  }, [state.audioPlayer.audio.paused, state.audioPlayer.audio.readyState]);

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

  const background = useMemo(() => {
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue(
      "--bg-color"
    );

    if (ARGUMENTS.themeMode === "dark") {
      return colord(bgColor).lighten(0.05).toHex();
    }
    return bgColor;
  }, []);

  const border = useMemo(() => {
    if (ARGUMENTS.themeMode === "dark") {
      return "1px solid #4B4F55";
    }
    return "1px solid #CECECE";
  }, []);

  return (
    <div
      className="mobile-commands mobile-commands-background"
      style={{ backgroundColor: background, borderTop: border }}
    >
      <div className="commands-container flex-column align-items-center">
        <div className="text-no-wrap title">{currentEpisode?.title}</div>

        <div className="flex-row time-track-section">
          <p className="text-no-wrap time-track-timer left-timer">
            {getTimeStringFromSeconds(currentTime)}
          </p>
          <ReactSlider
            className="time-track-slider"
            ref={timeTrackSlider}
            onChange={(event: any) => {
              audioPlayer.pause();
              audioPlayer.audio.currentTime = event;
              audioPlayer.play();
            }}
            min={0}
            max={audioPlayer.duration}
            value={currentTime}
            orientation="horizontal"
            trackClassName="track"
            thumbClassName="thumb"
            thumbActiveClassName="thumb-active"
          />
          <p className="text-no-wrap time-track-timer right-timer">
            {audioPlayer.duration && currentTime ? "-" : ""}
            {getTimeStringFromSeconds(
              audioPlayer.duration && currentTime
                ? audioPlayer.duration - currentTime
                : null
            )}
          </p>
        </div>

        <div className="flex-row flex-center-center justify-content-between play-commands-container">
          <div
            className="clickable circle-command-button left-circle-command-button flex-center-center"
            onClick={changePlaybackRate}
          >
            <p>{playbackRate}x</p>
          </div>

          <div className="felx-row flex-center-center">
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
                color={`#${(ARGUMENTS as any).color}`}
                diameter={playerDiameter}
              />
              <img
                alt="episode cover"
                className="play-image-container position-absolute"
                src={currentEpisode?.imageUrl}
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

          <div
            className="clickable circle-command-button flex-center-center position-relative"
            onClick={triggerShowQueue}
          >
            <Icon
              className="menu-icon flex-center-center"
              iconRelativePath="player/menu"
              svgStyles={muteUnmuteSvgStyles}
            />
            {state.queue.length > 0 ? (
              <div className="queue-length-tag">{state.queue.length}</div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
