<script setup lang="ts">
import TrackCard from "@components/track/TrackCard.vue";
</script>

<template>
  <div v-for="n of 10">
    <TrackCard :track-id="n" />
  </div>
</template>

<style lang="scss" module></style>
