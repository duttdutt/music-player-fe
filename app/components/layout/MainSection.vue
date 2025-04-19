<template>
  <main :class="$style.main">
    <NuxtPage />
  </main>
</template>

<style module lang="scss">
.main {
  flex: 1 1 auto;

  padding: 1rem;
  overflow-y: auto;

  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
}
</style>
