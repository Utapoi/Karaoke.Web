<script setup lang="ts">
import SongCard from '~/components/Songs/SongCard.vue'
import { useSongsService } from '~/Composables/Services/SongsService'
import type { Song } from '~/Core/Models/Song'

const SongsService = useSongsService()

const Songs = ref<Song[]>(await SongsService.GetSongsAsync())
</script>

<template>
  <Suspense>
    <ClientOnly>
      <div class="mx-auto max-w-10xl w-full px-8 py-16">
        <div class="h-full w-full flex flex-col flex-wrap gap-12">
          <!-- Hero Banner / Play -->
          <div class="relative w-full overflow-hidden rounded-xl shadow">
            <div class="mx-auto aspect-ratio-video h-30vh w-full rounded-xl bg-[url(/test/Symphogear-XV.jpg)] bg-cover">
              <div class="h-full w-full rounded-xl bg-black/40 backdrop-blur-xl">
                <div class="h-full w-full inline-flex flex-col items-center justify-center">
                  Ouais ça va changer mais pour l'instant ça reste vide.
                  <div class="w-34 rounded-full bg-[#f90b31] px-6 py-2 text-center text-xl font-semibold transition-all duration-200 hover:scale-115 hover:cursor-pointer">
                    Play
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Latest release -->
          <div class="h-full w-full">
            <div class="inline-flex items-center gap-4">
              <div class="h-0.75 w-14 rounded-full dark:bg-white" />

              <h2 class="text-2xl font-semibold">
                Latest releases
              </h2>
            </div>
            <div class="grid grid-cols-1 mt-4 w-full justify-start gap-2 3xl:grid-cols-3 lg:grid-cols-2">
              <SongCard
                v-for="song in Songs"
                :key="song.Id"
                :song="song"
              />
              <SongCard
                :song="RainbowFlower"
              />
              <SongCard
                :song="RainbowFlower"
              />
            </div>
          </div>

          <!-- Popular songs -->
          <div class="h-full w-full">
            <div class="inline-flex items-center gap-4">
              <div class="h-0.75 w-14 rounded-full dark:bg-white" />

              <h2 class="text-2xl font-semibold">
                Popular
              </h2>
            </div>
            <div class="grid grid-cols-1 mt-4 w-full content-start gap-2 3xl:grid-cols-3 lg:grid-cols-2">
              <SongCard
                :song="RainbowFlower"
              />
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
    <template #fallback>
      <div italic op50>
        <span animate-pulse>Loading...</span>
      </div>
    </template>
  </Suspense>
</template>
