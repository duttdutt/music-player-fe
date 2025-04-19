<template>
  <ClientOnly>
    <div class="theme-toggle" :title="`Theme: ${colorMode.preference}`">
      <button
        v-for="option in options"
        :key="option.value"
        :class="[
          'theme-circle',
          { active: colorMode.preference === option.value },
        ]"
        :style="{
          backgroundColor: option.bg,
          borderColor: option.accent,
        }"
        @click="applyTheme(option.value)"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const themeClasses = ["light-purple", "dark-purple"];

const applyTheme = (theme: string) => {
  themeClasses.forEach((cls) => document.documentElement.classList.remove(cls));
  document.documentElement.classList.add(theme);
  colorMode.preference = theme;
};

const options = [
  { value: "light-purple", bg: "#f3f4f6", accent: "#9047ff" },
  { value: "dark-purple", bg: "#374151", accent: "#A96FFF" },
];
</script>

<style scoped>
.theme-toggle {
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem;
  border-radius: 0.5rem;
}

.theme-circle {
  width: 1rem;
  height: 1rem;
  padding: 5px;
  border: 5px solid;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  opacity: 0.6;
}

.theme-circle.active {
  transform: scale(1.1);
  opacity: 1;
}
</style>
