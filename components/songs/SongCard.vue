<script setup lang="ts">
import type { SongDTO } from '~/api/models/SongDTO'

defineProps<{
  song: SongDTO
}>()
</script>

<template>
  <div class="relative rounded-xl shadow dark:bg-[#222222]">
    <div v-if="song.id === '3'" class="absolute right-2 top-2 rounded-full bg-green-600 px-2 py-0.5 text-xs uppercase">
      certified
    </div>
    <div v-if="song.id === '2'" class="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs uppercase">
      utapoi
    </div>
    <div v-else-if="song.id === '1'" class="absolute right-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs uppercase">
      community
    </div>

    <div class="w-full flex justify-start">
      <div class="relative h-40 min-h-40 min-w-40 w-40">
        <div class="absolute bottom-1 left-1 rounded-full bg-black/70 px-2 py-0.5 text-sm font-semibold text-white backdrop-blur-xl">
          {{ song.duration }}
        </div>
        <NuxtLink :to="`/songs/${song.id}`">
          <img class="h-full w-full rounded-xl object-cover hover:cursor-pointer" :src="song.album.albumArt" alt="Take This! All Loaded!">
        </NuxtLink>
      </div>
      <div class="flex flex-col justify-between overflow-hidden p-3">
        <!-- General Information -->
        <div>
          <NuxtLink :to="`/songs/${song.id}`">
            <p class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-white hover:cursor-pointer">
              {{ song.title }}
            </p>
          </NuxtLink>
          <NuxtLink :to="`/songs/${song.album.id}`">
            <p class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-400 hover:cursor-pointer">
              {{ song.album.title }}
            </p>
          </NuxtLink>
        </div>

        <!-- Tags -->
        <div>
          <div class="my-1 w-full flex flex-wrap items-center gap-1">
            <p v-for="(tag, idx) in song.tags" :key="idx" class="rounded-sm px-1.5 py-0.5 text-xs" :class="{ 'bg-red-600/80': idx === 0, 'bg-purple-600/80': idx === 1, 'bg-blue-600/80': idx === 2 }">
              {{ tag }}
            </p>
          </div>
        </div>

        <!-- Stats -->
        <div>
          <div class="my-1 w-full flex items-center gap-3">
            <div class="flex items-center gap-1 text-xs text-white">
              <span class="i-fluent:play-circle-24-filled text-sm" title="Play Count" />
              <p>1 500</p>
            </div>
            <div class="flex items-center gap-1 text-xs text-white">
              <span class="i-fluent:heart-circle-20-filled text-sm" title="Likes" />
              <p>500</p>
            </div>
            <div class="ml-6 flex items-center gap-1 text-right text-xs text-white">
              <span class="i-fluent:calendar-20-filled text-sm" title="Release Date" />
              <p>2023/05/31</p>
            </div>
          </div>
        </div>

        <!-- Song Information -->
        <div class="flex items-center gap-1">
          <span class="text-gray-400" text="sm">by </span>
          <p class="text-sm text-gray-100">
            {{ song.artist }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
