<script setup lang="ts">
import type { Singer } from '~/Core/Models/Singer'

defineProps<{
  singer: Singer
}>()
</script>

<template>
  <div>
    <!-- Popular Song -->
    <!-- Until the stats are released this will be the latest added song. -->
    <div v-if="singer.PopularSong !== null" class="mb-2 mt-6 rounded-xl bg-latte-surface0 dark:bg-mocha-surface0">
      <div class="flex items-center gap-6 md:flex-row">
        <div>
          <img class="h-38 min-w-38 rounded-l-xl object-cover" :src="singer.PopularSong.GetCover()">
        </div>
        <div class="flex flex-col items-center gap-4 md:flex-row md:gap-0">
          <div class="flex flex-col items-start whitespace-nowrap">
            <p class="text-latte-text dark:text-mocha-text">
              {{ singer.PopularSong.GetTitle() }}
            </p>
            <p class="text-sm text-latte-subtext1 dark:text-mocha-subtext1">
              Nana Mizuki
            </p>
          </div>
        </div>
        <SongWave :song-url="singer.PopularSong.OriginalUrl" song-wave-class="hidden pr-5 md:block" />
      </div>
    </div>

    <!-- Latest Songs -->
    <div
      class="my-2 rounded-xl bg-latte-surface0 p-5 dark:bg-mocha-surface0" :class="{
        'mb-2 mt-6': singer.PopularSong === null,
        'my-2': singer.PopularSong !== null,
      }"
    >
      <div class="mb-6 flex items-center gap-2">
        <h2 class="text-2xl text-latte-text dark:text-mocha-text">
          Latest Songs
        </h2>
      </div>
    </div>

    <!-- Latest Albums -->
    <div class="my-2 rounded-xl bg-latte-surface0 p-5 dark:bg-mocha-surface0">
      <div class="mb-6 flex items-center gap-2">
        <h2 class="text-2xl text-latte-text dark:text-mocha-text">
          Latest Albums
        </h2>
      </div>
      <div class="grid grid-cols-2 w-full items-center gap-5 text-latte-text lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-4 dark:text-mocha-text">
        <div v-for="album in singer.Albums.slice(0, 7)" :key="album.Id">
          <AlbumCard :album="album" :singers="[singer]" />
        </div>
      </div>
    </div>

    <div v-if="singer.Descriptions.length > 0" class="my-2 w-full rounded-xl bg-latte-surface0 p-5 shadow dark:bg-mocha-surface0">
      <h2 class="text-2xl text-latte-text dark:text-mocha-text">
        About {{ singer.GetName() }}
      </h2>
      <div class="mt-6 whitespace-pre-line text-justify prose prose-latte-subtext1 dark:prose-mocha-subtext1 dark:prose-invert">
        {{ singer.GetDescription() }}
      </div>
    </div>
  </div>
</template>
