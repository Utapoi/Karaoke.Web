<script setup lang="ts">
import SongCard from '~/components/songs/SongCard.vue'
import type { SongInterface } from '~/core/Models/Song'

const RainbowFlower: SongInterface = {
  Id: '3',
  Titles: [
    {
      Language: 'English',
      Text: 'Rainbow Flower',
    },
    {
      Language: 'Japanese',
      Text: '虹の花',
    },
  ],
  Singers: [
    {
      Id: '1',
      Names: [
        {
          Language: 'English',
          Text: 'Tachibana Hibiki (CV: Yuuki Aoi)',
        },
        {
          Language: 'Japanese',
          Text: '立花響 (CV: 悠木碧)',
        },
      ],
      Albums: [],
      Songs: [],
      ProfilePicture: 'https://s4.anilist.co/file/anilistcdn/staff/large/n101686-PTd0lQZMsmcv.png',
    }],
  Albums: [{
    Id: '3',
    Titles: [
      {
        Language: 'English',
        Text: 'Symphogear G Character Song 2',
      },
      {
        Language: 'Japanese',
        Text: '戦姫絶唱シンフォギアG キャラクターソング2',
      },
    ],
    AlbumArt: 'https://static.wikia.nocookie.net/senkizesshousymphogear/images/a/a5/Symphogear_G_Character_Song_2.jpg',
    Singers: [],
    Songs: [],
    Tags: [],
  }],
  Duration: '3:58',
  Tags: [
    {
      Id: '1',
      Name: 'Anime',
    },
    {
      Id: '2',
      Name: 'Symphogear',
    },
    {
      Id: '3',
      Name: 'Solo Artist',
    },
  ],
  PreviewUrl: 'https://static.wikia.nocookie.net/senkizesshousymphogear/images/f/f5/Rainbow_Flower.ogg',
}
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
