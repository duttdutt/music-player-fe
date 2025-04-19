<script setup lang="ts">
import MenuBlock from "./MenuBlock.vue";
import AccountBlock from "./AccountBlock.vue";
import LogoBlock from "./LogoBlock.vue";
</script>

<template>
  <aside :class="$style.sidebar">
    <LogoBlock />
    <MenuBlock />
    <AccountBlock />
  </aside>
</template>

<style module lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 20%;
  padding: 1rem;
  gap: 1rem;

  background-color: var(--bg-secondary);
  border-radius: 8px;
}
</style>
