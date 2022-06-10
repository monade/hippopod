import { EpisodeContextType } from "../../store/playerContext";

export class AudioPlayer {
  audio: HTMLAudioElement = new Audio();
  _currentTime: number = 0;
  _duration: number = 0;
  isReady: boolean = false;
  episode: EpisodeContextType | null = null;
  goToNextEpisode: boolean = false;
  isLoading: boolean = false;

  constructor() {
    this.audio.addEventListener("ended", this.onEnded.bind(this));
    // this.audio.addEventListener("timeupdate", this.onTimeUpdate.bind(this));
    this.audio.addEventListener("error", this.onError.bind(this));
  }

  setEpisode(episode: EpisodeContextType) {
    this.goToNextEpisode = false;
    this.episode = episode;
    this.audio.src = episode.url;
    this.audio.load();
    this.isReady = true;
    this.isLoading = false;
  }

  destroyEpisode() {
    this.audio.currentTime = 0;
    this.pause();

    this.audio.src = "";
    this.isReady = false;
    this.isLoading = false;
  }

  // events handlers

  onEnded() {
    this.audio.currentTime = 0;
    this.audio.pause();
    this.goToNextEpisode = true;
  }

  onTimeUpdate() {
    console.log("ciao");
  }

  onError() {
    this.audio.currentTime = 0;
    this.audio.pause();
  }

  // getters

  get currentTime() {
    return this.audio.currentTime || 0;
  }

  get duration() {
    return this.audio.duration || 0;
  }

  // actions

  async play() {
    if (!this.isReady) {
      return;
      // throw new Error("Player not ready");
    }
    this.isLoading = true;
    await this.audio.play();
    this.isLoading = false;
  }

  pause() {
    this.isLoading = false;
    this.audio.pause();
  }

  playOrPause() {
    this.audio.paused ? this.play() : this.pause();
  }

  skipSeconds(seconds: number) {
    if (!this.isReady) {
      return;
      // throw new Error("Player not ready");
    }
    this.audio.currentTime += seconds;
  }

  download() {
    if (!this.audio.src) {
      return;
      // throw new Error("No audio source");
    }
    window.open(this.audio.src, "_blank");
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
  }

  setPlaybackRate(rate: number) {
    this.audio.playbackRate = rate;
  }

  setMuted(isMuted: boolean) {
    this.audio.muted = isMuted;
  }
}

export default new AudioPlayer();
