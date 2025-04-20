<script setup lang="ts">
const props = defineProps<{
  label: string;
  icon?: string;
}>();
</script>

<template>
  <span :class="$style.badge">
    <i v-if="icon" :class="['pi', icon, $style.icon]" />
    {{ props.label }}
  </span>
</template>

<style module lang="scss">
@use "@scss/variables" as *;

.badge {
  display: inline-flex;
  align-items: center;
  gap: $spacing-1;

  padding: 0.25rem 0.5rem;

  font-size: calc($font-size-xs + 1px);
  font-weight: $font-weight-medium;
  border-radius: 9999px;
  background-color: var(--accent-primary-hover);
  color: var(--text-primary);
  border: 1px solid var(--accent-primary);
  line-height: 1;
}

.icon {
  font-size: 0.8rem;
  color: var(--accent-primary);
}
</style>
