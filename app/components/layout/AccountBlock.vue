<template>
  <div :class="$style.account">
    <ThemeToggle />
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from "@components/ui/ThemeToggle.vue";
</script>

<style module lang="scss">
.account {
  flex: 0 0 100px;

  padding: 0.5rem;

  background-color: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
}
</style>
