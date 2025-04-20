<script setup lang="ts">
import type { Artist } from "app/types";

const props = defineProps<{
  title?: string;
  artists?: Artist[];
}>();

const router = useRouter();

const goToArtist = (id: number) => {
  router.push(`/artists/${id}`);
};
</script>

<template>
  <div :class="$style.info">
    <h3 :class="$style.trackTitle">{{ props.title }}</h3>
    <p v-if="props.artists?.length" :class="$style.artistTitle">
      <span
        v-for="(artist, index) in props.artists"
        :key="artist.id"
        @click="goToArtist(artist.id)"
        :class="$style.artistLink"
      >
        {{ artist.title }}
        <span v-if="index < props.artists.length - 1">, </span>
      </span>
    </p>
  </div>
</template>

<style module lang="scss">
@use "@scss/variables" as *;

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  line-height: $line-height-normal;

  .trackTitle {
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
  }

  .artistTitle {
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: var(--text-muted);
  }

  .artistLink {
    cursor: pointer;
    color: var(--text-muted);
    transition: color 0.2s ease;

    &:hover {
      color: var(--text-muted-hover);
    }
  }
}
</style>
