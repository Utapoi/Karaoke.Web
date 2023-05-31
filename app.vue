<script setup lang="ts">
useHead({
  title: 'Karaoke - Utapoi',
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: rgb(17 17 17);
  color: white;
}
</style>
