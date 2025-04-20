import type { Track } from "app/types";
import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", () => {
  const currentTrack = ref<Track | null>(null);
  const isPlaying = ref(false);
  const audio = ref<HTMLAudioElement | null>(null);

  let objectUrl: string | null = null;

  const play = async (track: Track, blob: Blob) => {
    if (audio.value) {
      audio.value.pause();
      audio.value.src = "";
    }

    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(blob);

    const newAudio = new Audio(objectUrl);
    audio.value = newAudio;
    currentTrack.value = track;

    newAudio.addEventListener("playing", () => {
      isPlaying.value = true;
    });

    newAudio.addEventListener("pause", () => {
      isPlaying.value = false;
    });

    await newAudio.play();
  };

  const pause = () => {
    audio.value?.pause();
  };

  return {
    currentTrack,
    isPlaying,
    play,
    pause,
    audio,
  };
});
