<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['authorize'],
  AuthMiddlewareOptions: {
    Role: 'Admin',
  },
})
</script>

<template>
  <div />
</template>
