<script setup lang="ts">
import { Howl } from 'howler'
import type { SongDTO } from '~/api/models/SongDTO'

const props = defineProps<{
  song: SongDTO
}>()

// Variables
const IsHover = ref<boolean>(false)

const PreviewTrack = ref<Howl | undefined>()
const PreviewProgress = ref<number>(0)
const PreviewProgressInterval = useIntervalFn(() => {
  PreviewProgress.value += 0.6667
}, 100)

const PreviewTimeout = useTimeoutFn(() => {
  ResetPreview()
}, 15000, { immediate: false })

// Events
function OnPlay() {
  PreviewTrack.value?.load()
  PreviewTrack.value?.play()
  PreviewTrack.value?.seek((PreviewTrack.value?.duration() ?? 0) / 3)

  PreviewProgress.value = 0
  PreviewProgressInterval.resume()
  PreviewTimeout.start()
}

function OnStop() {
  ResetPreview()
}

function ResetPreview() {
  PreviewTrack.value?.stop()
  PreviewTrack.value?.unload()
  PreviewProgressInterval.pause()
  PreviewTimeout.stop()
  PreviewProgress.value = 0
}

onMounted(() => {
  PreviewTrack.value = new Howl({
    src: [props.song.previewUrl ?? ''],
    format: ['mp3'],
    volume: 0.8, // We don't want to blow up the user's ears, but since with are normalizing everything, we could set this to 1, I guess?
    preload: false, // If we preload this, it will cause a lot of lag when we have a lot of songs
    autoplay: false,
  })
})
</script>

<template>
  <div class="relative max-h-40 rounded-xl shadow dark:bg-[#222222]">
    <div class="w-full flex justify-start">
      <div class="relative h-40 min-h-40 min-w-40 w-40" @mouseenter="IsHover = true" @mouseleave="IsHover = false" @focusout="IsHover = false">
        <Transition name="fade">
          <div v-if="IsHover" class="absolute inset-0 h-full w-full rounded-xl dark:bg-black/50">
            <div class="grid h-full w-full place-items-center">
              <Transition>
                <div>
                  <div
                    v-show="!PreviewTrack?.playing()"
                    class="i-material-symbols:play-circle-rounded z-10 transform-gpu transition-all duration-200 hover:cursor-pointer"
                    text="3xl dark:white"
                    font="semibold"
                    title="Play Preview"
                    @click="OnPlay()"
                  />
                  <div v-show="PreviewTrack?.playing()" class="relative transition-all duration-200 hover:cursor-pointer" @click="OnStop()">
                    <div
                      class="i-material-symbols:stop-rounded z-10 transform-gpu"
                      text="3xl dark:white"
                      font="semibold"
                      title="Stop"
                    />
                    <ProgressRing
                      :radius="27" :progress="PreviewProgress" :stroke="4" color="rgb(239,68,68)"
                      class="absolute left-1/2 top-1/2 z-2 transform-gpu -translate-x-1/2 -translate-y-1/2"
                    />
                    <ProgressRing
                      :radius="27" :progress="100" :stroke="4" color="#fff"
                      class="absolute left-1/2 top-1/2 z-1 transform-gpu -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </Transition>
        <div class="absolute bottom-1 left-1 rounded-full px-2 py-0.5 text-sm font-semibold backdrop-blur-xl dark:bg-black/70 dark:text-white">
          {{ song.duration }}
        </div>
        <NuxtLink :to="`/songs/${song.id}`">
          <img class="h-full w-full rounded-xl object-cover hover:cursor-pointer" :src="song.album.albumArt" alt="Take This! All Loaded!">
        </NuxtLink>
      </div>
      <div class="w-full flex flex-col justify-between overflow-hidden p-3">
        <!-- General Information -->
        <div>
          <div class="w-full flex items-center justify-between">
            <NuxtLink :to="`/songs/${song.id}`">
              <p class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold hover:cursor-pointer dark:text-white">
                {{ song.title }}
              </p>
            </NuxtLink>
            <div v-if="song.id === '3'" class="rounded-full bg-green-600 px-2 py-0.5 text-xs uppercase">
              certified
            </div>
            <div v-if="song.id === '2'" class="rounded-full bg-red-500 px-2 py-0.5 text-xs uppercase">
              utapoi
            </div>
            <div v-else-if="song.id === '1'" class="rounded-full bg-blue-600 px-2 py-0.5 text-xs uppercase">
              community
            </div>
          </div>
          <NuxtLink :to="`/songs/${song.album.id}`">
            <p class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm hover:cursor-pointer dark:text-gray-400">
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
            <div class="flex items-center gap-1 text-xs dark:text-white">
              <span class="i-fluent:play-circle-24-filled text-sm" title="Play Count" />
              <p>1 500</p>
            </div>
            <div class="flex items-center gap-1 text-xs dark:text-white">
              <span class="i-fluent:heart-circle-20-filled text-sm" title="Likes" />
              <p>500</p>
            </div>
            <div class="ml-6 flex items-center gap-1 text-right text-xs dark:text-white">
              <span class="i-fluent:calendar-20-filled text-sm" title="Release Date" />
              <p>2023/05/31</p>
            </div>
          </div>
        </div>

        <!-- Song Information -->
        <div class="flex items-center gap-1">
          <span class="text-gray-400" text="sm">by </span>
          <p class="overflow-hidden text-ellipsis whitespace-nowrap text-sm dark:text-gray-100">
            {{ song.artist }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
