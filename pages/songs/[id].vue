<script setup lang="ts">
import { useSongsService } from '~/Composables/Services/SongsService'
import type { Song } from '~/Core/Models/Song'

const Config = useRuntimeConfig()
const Route = useRoute()
const Router = useRouter()

const SongsService = useSongsService()

const SelectedTab = ref<number>(0)

const SongId = ref<string>(Route.params.id.toString())
const CurrentSong = ref<Song | undefined>(undefined)

if (!SongId.value)
  await Router.push('/404')

const Response = await SongsService.GetAsync(SongId.value)

if (Response === undefined)
  await Router.push('/404')

CurrentSong.value = Response

useHead({
  title: `${CurrentSong.value!.GetTitle()} | Utapoi`,
})

// TODO: Use the variable from env.
const BackgroundCover = computed<string>(() => `url('${Config.public.API_URL}${CurrentSong.value?.GetCover()}')`)
</script>

<template>
  <div v-if="CurrentSong">
    <div class="bg-image h-56 w-full 2xl:h-96 4xl:h-126">
      <div class="h-full w-full bg-black/30" />
    </div>
    <div class="mx-auto h-full max-w-7xl w-full px-4 pt-8 container lg:px-12">
      <div class="w-full flex flex-col">
        <!-- Song Info -->
        <SongHeaderInfo :song="CurrentSong" />
        <!-- Tabs Menu -->
        <div class="mx-auto w-full overflow-x-scroll overflow-y-hidden rounded-b-xl bg-latte-surface0 text-latte-text shadow backdrop-blur-md sm:overflow-x-hidden dark:bg-mocha-surface0 dark:text-mocha-text">
          <div class="w-full flex items-center justify-start gap-12 px-5 py-3">
            <div
              class="relative h-full text-latte-red transition-all duration-150 hover:cursor-pointer dark:text-mocha-red" :class="{
                'text-latte-red dark:text-mocha-red': SelectedTab === 0,
                'text-latte-text dark:text-mocha-text': SelectedTab !== 0,
              }"
              @click.prevent="SelectedTab = 0"
            >
              <h3>Information</h3>
              <div v-if="SelectedTab === 0" v-motion-slide-left class="absolute border-b-2 border-latte-red -bottom-3.15 -left-1 -right-1 dark:border-mocha-red" />
            </div>
            <div
              class="relative h-full text-latte-red transition-all duration-150 hover:cursor-pointer dark:text-mocha-red" :class="{
                'text-latte-red dark:text-mocha-red': SelectedTab === 1,
                'text-latte-text dark:text-mocha-text': SelectedTab !== 1,
              }"
              @click.prevent="SelectedTab = 1"
            >
              <h3>Karaoke</h3>
              <div v-if="SelectedTab === 1" v-motion-slide-left class="absolute border-b-2 border-latte-red -bottom-3.15 -left-1 -right-1 dark:border-mocha-red" />
            </div>
            <div
              class="relative h-full text-latte-red transition-all duration-150 hover:cursor-pointer dark:text-mocha-red" :class="{
                'text-latte-red dark:text-mocha-red': SelectedTab === 2,
                'text-latte-text dark:text-mocha-text': SelectedTab !== 2,
              }"
              @click.prevent="SelectedTab = 2"
            >
              <h3>Stats</h3>
              <div v-if="SelectedTab === 2" v-motion-slide-left class="absolute border-b-2 border-latte-red -bottom-3.15 -left-1 -right-1 dark:border-mocha-red" />
            </div>
          </div>

        <!-- Tabs Content -->
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
