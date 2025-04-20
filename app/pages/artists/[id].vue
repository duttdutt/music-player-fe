<script setup lang="ts">
import type { Artist } from "app/types";
import Badge from "@components/ui/Badge.vue";

const route = useRoute();
const artistId = Number(route.params.id);

const artist = await $fetch<Artist>(
  `http://localhost:3026/artists/${artistId}`
);
</script>

<template>
  <div :class="$style.artistPage">
    <div :class="$style.leftSide">
      <img
        v-if="artist?.coverUrl"
        :src="artist.coverUrl"
        :alt="artist.title"
        :class="$style.cover"
      />
    </div>
    <div :class="$style.rightSide">
      <Badge label="Исполнитель" icon="pi-user" />
      <h1 :class="$style.artistName">{{ artist?.title }}, {{ artistId }}</h1>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@scss/variables" as *;

.artistPage {
  display: flex;
  gap: $spacing-5;
  padding: 2rem;
  font-family: $font-family-primary;
  color: var(--text-primary);

  .leftSide {
    .cover {
      max-width: 200px;

      border-radius: 50%;
      border: 3px solid var(--border-primary);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .rightSide {
    flex: 1;

    .artistName {
      margin: $spacing-1 0;

      font-size: $font-size-5xl;
      font-weight: $font-weight-bold;
    }
  }
}
</style>
