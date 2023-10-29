<script setup lang="ts">
const props = defineProps<{
  radius: number
  stroke: number
  progress: number
  color: string
}>()

// Variables
const NormalizedRadius = computed(() => props.radius - props.stroke * 2)
const Circumference = computed(() => NormalizedRadius.value * 2 * Math.PI)
</script>

<template>
  <svg :height="props.radius * 2" :width="props.radius * 2">
    <circle
      :stroke-width="props.stroke"
      :stroke-dasharray="Circumference"
      :stroke-dashoffset="Circumference - props.progress / 100 * Circumference"
      :r="NormalizedRadius"
      :cx="props.radius"
      :cy="props.radius"
      :stroke="color"
      fill="transparent"
    />
  </svg>
</template>
