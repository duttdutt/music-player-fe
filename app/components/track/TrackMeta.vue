<script setup lang="ts">
const props = defineProps<{
  id?: number | undefined | null;
  duration?: number | undefined | null;
  currentTime?: number | undefined | null;
}>();

const formattedTime = computed(() => {
  if (!props.duration) return "";

  const formatted = (ms: number) => {
    const min = Math.floor(ms / 60);
    const sec = Math.floor(ms % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return props.currentTime != null
    ? `${formatted(props.currentTime)} / ${formatted(props.duration / 1000)}`
    : formatted(props.duration / 1000);
});
</script>

<template>
  <div :class="$style.meta">
    <i class="pi pi-heart"></i>
    <span>{{ formattedTime }}</span>
  </div>
</template>

<style module lang="scss">
@use "@scss/variables" as *;

.meta {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  gap: $spacing-3;

  font-size: $font-size-xs;
  color: var(--text-muted);

  i {
    cursor: pointer;

    font-size: $font-size-sm;
    color: var(--text-muted);

    &:hover {
      color: var(--i-like);
    }
  }

  span {
    padding-right: $spacing-3;

    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: var(--text-muted);
  }
}
</style>
