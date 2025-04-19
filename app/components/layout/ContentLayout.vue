<template>
  <div :class="$style.contentArea">
    <MainSection />
    <PlayerSection />
  </div>
</template>

<script setup lang="ts">
import PlayerSection from "./PlayerSection.vue";
import MainSection from "./MainSection.vue";
</script>

<style module lang="scss">
.contentArea {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 80%;
  padding: 1rem;
  gap: 1rem;

  background-color: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
}
</style>
