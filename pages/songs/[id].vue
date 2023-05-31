<script setup lang="ts">
// Composables
const Route = useRoute()

// Variables
const SongId = computed<string>(() => Route.params.id.toString())
</script>

<template>
  <div />
</template>
