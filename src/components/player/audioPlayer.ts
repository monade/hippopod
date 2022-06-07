import { EpisodeContextInterface } from "./types";

export class AudioPlayer {
  audio: HTMLAudioElement = new Audio();
  isReady: boolean = false;
  currentTime: number = 0;

  constructor() {
    this.audio.addEventListener("ended", this.onEnded.bind(this));
    this.audio.addEventListener("timeupdate", this.onTimeUpdate.bind(this));
    this.audio.addEventListener("error", this.onError.bind(this));
  }

  setEpisode(episode: EpisodeContextInterface) {
    this.audio.src = episode.url;
    this.audio.load();
    this.isReady = true;
  }

  // events

  onEnded() {
    this.audio.currentTime = 0;
    this.audio.pause();
  }

  onTimeUpdate() {
    this.currentTime = this.audio.currentTime;
  }

  onError() {
    this.audio.currentTime = 0;
    this.audio.pause();
  }

  // getters

  getCurrentTime() {
    return this.audio.currentTime;
  }

  getDuration() {
    return this.audio.duration;
  }

  isPlaying() {
    return !this.audio.paused;
  }

  // actions

  async play() {
    console.log("play() called");
    if (!this.isReady) {
      throw new Error("Player not ready");
    }
    await this.audio.play();
    console.log("play() finished");
  }

  pause() {
    console.log("pause() called");
    if (!this.isReady) {
      throw new Error("Player not ready");
    }
    this.audio.pause();
  }

  skipSeconds(seconds: number) {
    console.log("skipSeconds() called");
    if (!this.isReady) {
      throw new Error("Player not ready");
    }
    this.audio.currentTime += seconds;
  }

  download() {
    console.log("download() called");
    if (!this.isReady) {
      throw new Error("Player not ready");
    }
    const a = document.createElement("a");
    a.href = this.audio.src;
    a.download = this.audio.src.split("/").pop() as string;
    a.click();
  }
}

export default new AudioPlayer();
