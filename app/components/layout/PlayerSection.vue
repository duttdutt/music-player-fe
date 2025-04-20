<script setup lang="ts">
const player = usePlayerStore();

const coverUrl = computed(() =>
  player.currentTrack?.coverBlob
    ? `data:image/png;base64,${player.currentTrack.coverBlob}`
    : player.currentTrack?.artists?.[0]?.coverUrl
);

const progress = ref(0);
const currentTime = ref(0);
const totalTime = ref(0);

const updateProgress = () => {
  const audio = player.audio;
  if (audio && audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTime.value = audio.currentTime;
    totalTime.value = audio.duration;
  }
};

const seek = (event: MouseEvent) => {
  const bar = event.currentTarget as HTMLElement;
  const rect = bar.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;

  const audio = player.audio;
  if (audio && audio.duration) {
    audio.currentTime = percent * audio.duration;
  }
};

let lastAudio: HTMLAudioElement | null = null;

watch(
  () => player.audio,
  (newAudio, oldAudio) => {
    if (oldAudio) oldAudio.removeEventListener("timeupdate", updateProgress);
    if (newAudio) newAudio.addEventListener("timeupdate", updateProgress);
    lastAudio = newAudio;
  },
  { immediate: true }
);

onUnmounted(() => {
  if (lastAudio) {
    lastAudio.removeEventListener("timeupdate", updateProgress);
  }
});
</script>

<template>
  <section :class="$style.player">
    <div v-if="player.currentTrack" :class="$style.trackWrapper">
      <div :class="$style.trackInfo">
        <img
          v-if="coverUrl"
          :src="coverUrl"
          :alt="player.currentTrack.title"
          :class="$style.cover"
        />
        <div :class="$style.info">
          <h4>{{ player.currentTrack.title }}</h4>
          <p>
            {{ player.currentTrack.artists.map((a) => a.title).join(", ") }}
          </p>
        </div>
      </div>
      <TrackMeta
        :id="player.currentTrack.id"
        :duration="player.currentTrack.durationMs"
        :current-time="currentTime"
      />
    </div>
    <div v-else>No track playing</div>

    <div :class="$style.progressBarContainer" @click="seek">
      <div :class="$style.progressBar" :style="{ width: progress + '%' }" />
    </div>
  </section>
</template>

<style module lang="scss">
@use "@scss/variables" as *;

.player {
  flex: 0 0 100px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  position: relative;
}

.trackWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
}

.trackInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $spacing-2;
}

.cover {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: $spacing-1;
}

.info {
  display: flex;
  flex-direction: column;
  gap: $spacing-1;

  h4 {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
  }

  p {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: var(--text-muted);
  }
}

.progressBarContainer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: var(--border-primary);
  cursor: pointer;
  z-index: 1;
}

.progressBar {
  height: 100%;
  background-color: var(--accent-primary);
  transition: width 0.1s linear;
  border-radius: 0 4px 4px 0;
}
</style>
