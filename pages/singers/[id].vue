<script setup lang="ts">
import WaveSurfer from 'wavesurfer.js'
import { useSingersService } from '~/Composables/Services/SingersService'
import type { Singer } from '~/Core/Models/Singer'

const Route = useRoute()
const Router = useRouter()

const SingersService = useSingersService()

const SingerId = ref<string>(Route.params.id.toString())
const CurrentSinger = ref<Singer | undefined>(undefined)

if (!SingerId.value)
  await Router.push('/404')

const Response = await SingersService.GetAsync(SingerId.value)

if (Response === undefined)
  await Router.push('/404')

CurrentSinger.value = Response

const BackgroundCover = computed<string>(() => `url('https://localhost:7215${CurrentSinger.value?.GetRandomAlbumCover()}')`)

const PopularSongWaveContainer = ref<HTMLDivElement | undefined>(undefined)
const PopularSongWave = ref<WaveSurfer | undefined>(undefined)
const PopularSongIsPlaying = ref<boolean>(false)

function OnPlayClicked() {
  PopularSongWave.value?.play()
  PopularSongIsPlaying.value = true
}

function OnPauseClicked() {
  PopularSongWave.value?.pause()
  PopularSongIsPlaying.value = false
}

watch(PopularSongWaveContainer, (v) => {
  if (v === undefined)
    return

  PopularSongWave.value = WaveSurfer.create({
    container: '#popular-song-wave',
    waveColor: '#fefefe',
    progressColor: '#f90b31',
    barWidth: 3,
    barRadius: 3,
    barGap: 2,
    cursorWidth: 0,
    height: 74,
    url: '/test/innocent_starter.mp3',
  })

  PopularSongWave.value.setVolume(0.25)

  PopularSongWave.value.on('interaction', () => {
    PopularSongWave.value?.play()
    PopularSongIsPlaying.value = true
  })
})

useHead({
  title: `${CurrentSinger.value!.GetName()} | Utapoi`,
})
</script>

<template>
  <div v-if="CurrentSinger">
    <div class="bg-image h-56 w-full 2xl:h-96 4xl:h-126">
      <div class="h-full w-full bg-black/30" />
    </div>
    <div class="mx-auto h-full max-w-7xl w-full px-4 pt-8 container lg:px-12">
      <div class="w-full flex flex-col">
        <!-- Singer Info -->
        <div class="w-full rounded-t-xl bg-latte-surface0/75 p-3 backdrop-blur-md -mt-46 dark:bg-mocha-surface0/65">
          <div class="relative flex flex-col">
            <div class="max-w-5xl flex flex-col items-start justify-start gap-4 lg:flex-row">
              <!-- Artist Image -->
              <div class="h-46 min-w-46 rounded-xl">
                <img class="h-full w-full rounded-xl object-cover object-top" src="https://www.jame-world.com/media/image/2021-10/11622.jpg">
              </div>
              <div class="mt-2 h-full flex flex-col items-start">
                <!-- Names / Nicknames -->
                <h1 class="text-3xl font-semibold text-latte-text dark:text-mocha-text">
                  {{ CurrentSinger.GetName() }}
                </h1>
                <h2 class="text-md text-latte-subtext0 dark:text-mocha-subtext0">
                  <span v-for="nickname in CurrentSinger.GetNicknames()" :key="nickname">{{ nickname }}</span>
                </h2>
                <p class="mt-8 whitespace-normal text-sm text-latte-text dark:text-mocha-text">
                  Ouais je vais rajouter les informations genre la date de naissance, le groupe sanguin, etc
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="mx-auto w-full overflow-x-scroll overflow-y-hidden rounded-b-xl bg-latte-surface0 text-latte-text shadow backdrop-blur-md md:overflow-x-hidden dark:bg-mocha-surface0 dark:text-mocha-text">
          <div class="w-full flex items-center justify-start gap-12 px-5 py-3">
            <div class="relative h-full text-latte-red dark:text-mocha-red">
              <h3>Information</h3>
              <div class="absolute border-b-2 border-latte-red -bottom-3.15 -left-1 -right-1 dark:border-mocha-red" />
            </div>
            <div>
              <h3>Albums</h3>
            </div>
            <div>
              <h3>Songs</h3>
            </div>
            <div class="pr-5 lg:pr-0">
              <h3>Stats</h3>
            </div>
          </div>
        </div>

        <!-- Popular Song -->
        <!-- Until the stats are released this will be the latest added song. -->
        <div class="mb-2 mt-6 rounded-xl bg-latte-surface0 dark:bg-mocha-surface0">
          <div class="flex items-center gap-6 md:flex-row">
            <div>
              <img class="h-38 min-w-38 rounded-l-xl object-cover" src="https://upload.wikimedia.org/wikipedia/en/e/e9/Innocent_starter_%28cover%29.jpg">
            </div>
            <div class="flex flex-col items-center gap-4 md:flex-row md:gap-0">
              <div class="flex flex-col items-start whitespace-nowrap">
                <p class="text-latte-text dark:text-mocha-text">
                  Innocent Starter
                </p>
                <p class="text-sm text-latte-subtext1 dark:text-mocha-subtext1">
                  Nana Mizuki
                </p>
              </div>
              <div class="mx-4 rounded-full bg-latte-surface1 p-3 text-xl text-latte-text hover:cursor-pointer dark:bg-mocha-surface1 dark:text-mocha-text">
                <div
                  v-if="PopularSongIsPlaying === false"
                  class="i-fluent:play-16-filled"
                  @click.prevent="OnPlayClicked"
                />
                <div
                  v-else
                  class="i-fluent:pause-16-filled"
                  @click.prevent="OnPauseClicked"
                />
              </div>
            </div>
            <div id="popular-song-wave" ref="PopularSongWaveContainer" class="relative hidden w-full pr-5 lg:block" />
          </div>
        </div>

        <!-- Latest Songs -->
        <div class="my-2 rounded-xl bg-latte-surface0 p-5 dark:bg-mocha-surface0">
          <div class="mb-6 flex items-center gap-2">
            <div class="h-0.25 w-12 rounded-full bg-latte-text dark:bg-mocha-text" />
            <h2 class="text-2xl text-latte-text dark:text-mocha-text">
              Latest Songs
            </h2>
          </div>
        </div>

        <!-- Latest Albums -->
        <div class="my-2 rounded-xl bg-latte-surface0 p-5 dark:bg-mocha-surface0">
          <div class="mb-6 flex items-center gap-2">
            <div class="h-0.25 w-12 rounded-full bg-latte-text dark:bg-mocha-text" />
            <h2 class="text-2xl text-latte-text dark:text-mocha-text">
              Latest Albums
            </h2>
          </div>
          <div class="grid grid-cols-2 w-full gap-4 text-latte-text lg:grid-cols-5 md:grid-cols-4 dark:text-mocha-text">
            <div v-for="album in CurrentSinger.Albums" :key="album.Id">
              <NuxtLink :to="`/albums/${album.Id}`">
                <img class="aspect-1/1 h-38 h-min w-38 rounded-xl object-cover" :src="`https://localhost:7215${album.Cover}`">
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="my-2 rounded-xl bg-latte-surface0 p-5 shadow dark:bg-mocha-surface0">
          <h2 class="text-xl text-latte-text dark:text-mocha-text">
            About {{ CurrentSinger.GetName() }}
          </h2>
          <p class="mt-6 whitespace-normal text-sm text-latte-subtext1 dark:text-mocha-subtext1">
            Nana Mizuki is a renowned Japanese singer and voice actress. With a career spanning over two decades, she has established herself as one of the most successful and influential artists in the Japanese music industry. Nana's powerful and versatile vocals, coupled with her charismatic stage presence, have captivated audiences worldwide.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-image {
  background-image: v-bind(BackgroundCover);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
