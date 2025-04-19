<script setup lang="ts">
import SidebarLayout from "@components/layout/SidebarLayout.vue";
import ContentLayout from "@components/layout/ContentLayout.vue";
</script>

<template>
  <div :class="$style.layout">
    <SidebarLayout />
    <ContentLayout />
  </div>
</template>

<style module lang="scss">
.layout {
  display: flex;

  height: 100vh;
  overflow: hidden;

  background-color: var(--bg-secondary);
  color: var(--text-primary);

  & > * {
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
}
</style>
