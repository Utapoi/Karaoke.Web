<script setup lang="ts">
import type { Song } from '~/Core/Models/Song'

defineProps<{
  song: Song
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
    <div class="h-min rounded-xl bg-latte-surface0 p-5 sm:mb-2 sm:mt-6 dark:bg-mocha-surface0">
      <div class="mb-6 w-full flex items-center justify-between gap-2">
        <h2 class="text-2xl text-latte-text dark:text-mocha-text">
          Lyrics
        </h2>
      </div>
      <article class="whitespace-pre-line text-center text-justify prose prose-latte-subtext1 dark:prose-mocha-subtext1 dark:prose-invert">
        {{ song.GetLyrics() }}
      </article>
    </div>

    <div class="h-min rounded-xl bg-latte-surface0 p-5 sm:mb-2 sm:mt-6 dark:bg-mocha-surface0">
      <div class="mb-6 w-full flex items-center justify-between gap-2">
        <h2 class="text-2xl text-latte-text dark:text-mocha-text">
          Albums
        </h2>
      </div>
      <div class="grid grid-cols-2 w-full items-center gap-5 text-latte-text sm:grid-cols-4 dark:text-mocha-text">
        <div v-for="album in song.Albums" :key="album.Id">
          <AlbumCard :album="album" :singers="album.Singers" />
        </div>
      </div>
    </div>
  </div>
</template>
