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
  font-family: "Quicksand", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
}

html {
  background: #141414;
  color: white;
}

input {
  outline: none;
  text-decoration: none;
  background-color: none;
  border: none;
}
</style>
