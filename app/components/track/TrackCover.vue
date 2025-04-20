<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  coverBlob?: string | null;
  coverUrl?: string;
  alt?: string;
  isActive: boolean;
}>();

const emit = defineEmits(["play", "pause"]);

const finalCover = computed(() =>
  props.coverBlob ? `data:image/png;base64,${props.coverBlob}` : props.coverUrl
);

const handleClick = () => {
  if (props.isActive) {
    emit("pause");
  } else {
    emit("play");
  }
};
</script>

<template>
  <div :class="$style.coverWrapper">
    <img v-if="finalCover" :src="finalCover" :alt="alt" :class="$style.cover" />
    <button :class="$style.playButton" @click="handleClick">
      <i :class="props.isActive ? 'pi pi-pause' : 'pi pi-play'" />
    </button>
  </div>
</template>

<style module lang="scss">
@use "@scss/variables" as *;

.coverWrapper {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: $spacing-1;
}

.playButton {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;
  padding: $spacing-3;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.2s ease;

  border: none;
  border-radius: $spacing-1;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: calc($font-size-xs - 2px);
}

.coverWrapper:hover .playButton {
  opacity: 1;
}
</style>
