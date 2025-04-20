<script setup lang="ts">
import type { Track } from "app/types";
import TrackCover from "./TrackCover.vue";
import TrackInfo from "./TrackInfo.vue";
import TrackMeta from "./TrackMeta.vue";

const props = defineProps<{ trackId: number }>();
const player = usePlayerStore();

const track = ref<Track | null>(null);

onMounted(async () => {
  try {
    const data = await $fetch<Track>(
      `http://localhost:3026/tracks/${props.trackId}`
    );
    track.value = data;
  } catch (e) {
    console.error("Ошибка загрузки трека:", e);
  }
});

const loadTrackBlob = async () => {
  const localId = track.value?.id;
  const currentId = player.currentTrack?.id;

  const isSameTrack = localId === currentId;
  const isPlaying = player.audio?.paused === false;

  if (isSameTrack) {
    if (isPlaying) {
      player.pause();
    } else {
      await player.audio?.play();
    }
    return;
  }

  const res = await fetch(`http://localhost:3026/tracks/${props.trackId}/blob`);
  const blob = await res.blob();
  await player.play(track.value!, blob);
};
</script>

<template>
  <div :class="$style.trackCard">
    <div :class="$style.trackInfo">
      <TrackCover
        :coverBlob="track?.coverBlob"
        :coverUrl="track?.artists?.[0]?.coverUrl"
        :alt="track?.title"
        :is-active="player.currentTrack?.id === track?.id && player.isPlaying"
        @play="loadTrackBlob"
      />
      <TrackInfo :title="track?.title" :artists="track?.artists" />
    </div>
    <TrackMeta :id="track?.id" :duration="track?.durationMs" />
  </div>
</template>

<style module lang="scss">
@use "@scss/variables" as *;

.trackCard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-2;

  padding: $spacing-2;
  margin-bottom: $spacing-2;

  border: 1px solid var(--border-primary);
  border-radius: 8px;
  background-color: var(--bg-primary);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--bg-secondary);
  }
}

.trackInfo {
  display: flex;
  align-items: center;
  gap: $spacing-3;
}
</style>
