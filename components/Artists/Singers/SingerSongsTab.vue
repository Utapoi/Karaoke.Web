<script setup lang="ts">
import { useSingersService } from '~/Composables/Services/SingersService'
import type { Singer } from '~/Core/Models/Singer'
import type { Song } from '~/Core/Models/Song'

const props = defineProps<{
  singer: Singer
}>()

const SingersService = useSingersService()

const Songs = ref<Song[] | undefined>(await SingersService.GetSongsAsync(props.singer.Id))
</script>

<template>
  <div class="mb-2 mt-6 rounded-xl bg-latte-surface0 p-5 dark:bg-mocha-surface0">
    <div class="mb-6 flex items-center gap-6">
      <h2 class="text-2xl text-latte-text dark:text-mocha-text">
        Songs
      </h2>
      <div class="flex items-center gap-2">
        <div class="flex cursor-pointer items-center gap-1 rounded-full bg-latte-surface2 px-3 py-1 text-latte-text dark:bg-mocha-surface2 dark:text-mocha-text">
          <span>Release Date</span>
          <span class="i-fluent:arrow-down-16-filled text-sm" />
        </div>
      </div>
    </div>
    <div v-if="Songs" class="grid grid-cols-2 w-full items-center gap-5 text-latte-text lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-4 dark:text-mocha-text">
      <div v-for="song in Songs" :key="song.Id">
        <SongCard :song="song" :singers="[singer]" />
      </div>
    </div>
  </div>
</template>
