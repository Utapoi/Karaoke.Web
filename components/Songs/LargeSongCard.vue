<script setup lang="ts">
import { Howl } from 'howler'
import type { Song } from '~/Core/Models/Song'
import ProgressRing from '~/components/Common/ProgressRing.vue'

const props = defineProps<{
  song: Song
}>()

// Variables
const IsHover = ref<boolean>(false)

const PreviewTrack = ref<Howl | undefined>()
const PreviewProgress = ref<number>(0)
const PreviewProgressInterval = useIntervalFn(() => {
  PreviewProgress.value += 0.6667 // 100 / 15000 = 0.6667
}, 100)

const PreviewTimeout = useTimeoutFn(() => {
  ResetPreview()
}, 15000, { immediate: false })

// Events
function OnPlay() {
  PreviewTrack.value?.load()
  PreviewTrack.value?.play()
  PreviewTrack.value?.seek(0)

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
    src: [props.song.PreviewUrl ?? ''],
    format: ['mp3'],
    volume: 0.5, // We don't want to blow up the user's ears, but since we are normalizing everything, we could set this to 1, maybe?
    preload: false, // If we preload this, it will cause a lot of lag when we have a lot of songs
    autoplay: false,
  })
})
</script>

<template>
  <div>
    <div class="relative rounded-xl bg-latte-surface0 shadow dark:bg-mocha-surface0">
      <div class="w-full flex justify-start gap-2">
        <div class="relative aspect-ratio-1 h-26 w-26 md:h-35 md:w-35" @mouseenter="IsHover = true" @mouseleave="IsHover = false" @focusout="IsHover = false">
          <Transition name="fade">
            <div v-if="IsHover" class="absolute inset-0 h-full w-full rounded-xl dark:bg-black/50">
              <div class="grid h-full w-full place-items-center">
                <Transition>
                  <div>
                    <div
                      v-show="!PreviewTrack?.playing()"
                      class="i-material-symbols:play-circle-rounded z-10 transform-gpu transition-all duration-200 hover:cursor-pointer"
                      text="3xl main"
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

          <div class="text-main absolute bottom-1 right-1 rounded-full px-2 py-0.5 text-sm font-semibold backdrop-blur-xl dark:bg-black/70">
            {{ song.Duration }}
          </div>
          <NuxtLink :to="`/songs/${song.Id}`">
            <img class="h-full w-full rounded-xl object-cover hover:cursor-pointer" :src="song.GetCover()" alt="Song cover">
          </NuxtLink>
        </div>
        <div class="w-full flex flex-col justify-between overflow-hidden px-2 py-1 md:p-2">
          <!-- General Information -->
          <div>
            <div class="w-full flex items-center justify-between">
              <NuxtLink :to="`/songs/${song.Id}`" class="w-min">
                <div class="text-main relative line-clamp-1 block w-full text-ellipsis whitespace-nowrap text-lg font-semibold hover:cursor-pointer">
                  {{ song.GetTitle() }}
                </div>
              </NuxtLink>
              <div class="hidden md:block">
                <div v-if="song.Id === '3'" class="max-w-22 rounded-full bg-green-600 px-2 py-0.5 text-center text-xs uppercase">
                  certified
                </div>
                <div v-if="song.Id === '2'" class="max-w-22 rounded-full bg-red-500 px-2 py-0.5 text-xs uppercase">
                  utapoi
                </div>
                <div v-else-if="song.Id === '1'" class="max-w-22 rounded-full bg-blue-600 px-2 py-0.5 text-xs uppercase">
                  community
                </div>
              </div>
            </div>
            <NuxtLink :to="`/albums/${song.Albums[0].Id}`">
              <p class="text-secondary w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm hover:cursor-pointer">
                {{ song.GetAlbum().GetTitle() }}
              </p>
            </NuxtLink>
          </div>

          <!-- Tags -->
          <div>
            <div class="my-1 w-full flex flex-wrap items-center gap-1">
              <p v-for="(tag, idx) in song.Tags" :key="idx" class="rounded-sm px-0.75 py-0.25 text-xs md:px-1.5 md:py-0.5" :class="{ 'bg-red-600/80': idx === 0, 'bg-purple-600/80': idx === 1, 'bg-blue-600/80': idx === 2 }">
                {{ tag.Name }}
              </p>
            </div>
          </div>

          <!-- Stats -->
          <div class="hidden">
            <div class="my-1 w-full flex items-center gap-3">
              <div class="text-main flex items-center gap-1 text-xs">
                <span class="i-fluent:play-circle-24-filled text-sm" title="Play Count" />
                <p>1 500</p>
              </div>
              <div class="text-main flex items-center gap-1 text-xs">
                <span class="i-fluent:heart-circle-20-filled text-sm" title="Likes" />
                <p>500</p>
              </div>
              <div class="text-main ml-6 flex items-center gap-1 text-right text-xs">
                <span class="i-fluent:calendar-20-filled text-sm" title="Release Date" />
                <p>2023/05/31</p>
              </div>
            </div>
          </div>

          <!-- Song Information -->
          <div class="flex items-center gap-1">
            <span class="text-secondary" text="sm">by </span>
            <p class="text-main overflow-hidden text-ellipsis whitespace-nowrap text-sm">
              {{ song.Singers.map(singer => singer.GetName()).join(', ') }}
            </p>
          </div>
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
