<script setup lang="ts">
import type { SongDTO } from '~/api/models/SongDTO'
import SongCard from '~/components/songs/SongCard.vue'

const RainbowFlower: SongDTO = {
  id: '3',
  title: 'Rainbow Flower',
  artist: 'Tachibana Hibiki (CV: Yuuki Aoi)',
  album: {
    id: '3',
    title: 'Symphogear G Character Song 2',
    albumArt: 'https://static.wikia.nocookie.net/senkizesshousymphogear/images/a/a5/Symphogear_G_Character_Song_2.jpg',
    artist: 'Tachibana Hibiki (CV: Yuuki Aoi)',
    songs: [],
    tags: [],
  },
  duration: '3:58',
  tags: ['Anime', 'Symphogear'],
  previewUrl: 'https://static.wikia.nocookie.net/senkizesshousymphogear/images/f/f5/Rainbow_Flower.ogg',
}

const Shinjidai: SongDTO = {
  id: '2',
  title: 'Shinjidai',
  artist: 'Uta (CV: Ado)',
  album: {
    id: '2',
    title: 'UTA from ONE PIECE FILM RED',
    albumArt: ' https://www.lyrical-nonsense.com/wp-content/uploads/2022/06/Ado-New-Genesis-UTA-from-ONE-PIECE-FILM-RED.jpg',
    artist: 'Uta (CV: Ado)',
    songs: [],
    tags: [],
  },
  duration: '3:58',
  tags: ['Movie', 'One Piece'],
  previewUrl: 'https://youtu.be/1FliVTcX8bQ',
}
</script>

<template>
  <Suspense>
    <ClientOnly>
      <div class="h-full w-full flex flex-col flex-wrap gap-12 px-12 py-8">
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
          <div class="4xl:grid-cols-5 grid grid-cols-1 mt-4 w-full justify-start gap-2 3xl:grid-cols-3 lg:grid-cols-2">
            <SongCard
              :song="RainbowFlower"
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
          <div class="4xl:grid-cols-5 grid grid-cols-1 mt-4 w-full content-start gap-2 3xl:grid-cols-3 lg:grid-cols-2">
            <SongCard
              :song="Shinjidai"
              :small="true"
            />
            <SongCard
              :song="RainbowFlower"
            />
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
