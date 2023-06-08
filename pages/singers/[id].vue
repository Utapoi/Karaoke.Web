<script setup lang="ts">
const Route = useRoute()

const SingerId = ref<string>(Route.params.id[0].toString())
</script>

<template>
  <div />
</template>
