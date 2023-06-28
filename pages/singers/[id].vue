<script setup lang="ts">
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
                <div class="flex flex-col items-start gap-0">
                  <h1 class="text-3xl font-semibold text-latte-text dark:text-mocha-text">
                    {{ CurrentSinger.GetName() }}
                  </h1>
                  <p class="text-latte-text dark:text-mocha-text">
                    <span class="text-xs text-latte-subtext1 dark:text-mocha-subtext1">or</span> {{ CurrentSinger.GetNicknames().join(', ') }}
                  </p>
                </div>
                <h2 v-if="CurrentSinger.HasActivities()" class="text-md text-latte-subtext0 dark:text-mocha-subtext0">
                  {{ CurrentSinger.GetActivities().join(', ') }}
                </h2>
                <div class="mt-6 w-full flex flex-wrap items-center gap-2 text-sm text-latte-text dark:text-mocha-text">
                  <p v-if="CurrentSinger.Birthday !== null" class="inline-flex items-center gap-1 rounded-full bg-latte-surface2 px-3 py-1 shadow dark:bg-mocha-surface2">
                    <span class="i-fluent:food-cake-20-filled text-lg text-latte-lavender dark:text-mocha-lavender" />
                    <span>{{ new Date(CurrentSinger.Birthday).toLocaleDateString() }}</span>
                  </p>
                  <p class="inline-flex items-center gap-1 rounded-full bg-latte-surface2 px-3 py-1 shadow dark:bg-mocha-surface2">
                    <span class="i-fluent:briefcase-12-filled text-lg text-latte-lavender dark:text-mocha-lavender" />
                    <span v-if="CurrentSinger.HasActivities()">{{ CurrentSinger.GetActivities().join(', ') }}</span>
                    <span v-else>Singer</span>
                  </p>
                  <p v-if="CurrentSinger.AlbumsCount > 0" class="inline-flex items-center gap-1 rounded-full bg-latte-surface2 px-3 py-1 shadow dark:bg-mocha-surface2">
                    <span class="i-fluent:cd-16-filled text-lg text-latte-lavender dark:text-mocha-lavender" />
                    <span>{{ CurrentSinger.AlbumsCount }} {{ CurrentSinger.AlbumsCount > 1 ? "albums" : "album" }}</span>
                  </p>
                  <p v-if="CurrentSinger.SongsCount > 0" class="inline-flex items-center gap-1 rounded-full bg-latte-surface2 px-3 py-1 shadow dark:bg-mocha-surface2">
                    <span class="i-fluent:music-note-1-20-filled text-lg text-latte-lavender dark:text-mocha-lavender" />
                    <span>{{ CurrentSinger.SongsCount }} {{ CurrentSinger.SongsCount > 1 ? "songs" : "song" }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="mx-auto w-full overflow-x-scroll overflow-y-hidden rounded-b-xl bg-latte-surface0 text-latte-text shadow backdrop-blur-md sm:overflow-x-hidden dark:bg-mocha-surface0 dark:text-mocha-text">
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
            <div class="pr-5 sm:pr-0">
              <h3>Stats</h3>
            </div>
          </div>
        </div>

        <!-- Popular Song -->
        <!-- Until the stats are released this will be the latest added song. -->
        <div v-if="CurrentSinger.PopularSong !== null" class="mb-2 mt-6 rounded-xl bg-latte-surface0 dark:bg-mocha-surface0">
          <div class="flex items-center gap-6 md:flex-row">
            <div>
              <img class="h-38 min-w-38 rounded-l-xl object-cover" :src="CurrentSinger.PopularSong.GetCover()">
            </div>
            <div class="flex flex-col items-center gap-4 md:flex-row md:gap-0">
              <div class="flex flex-col items-start whitespace-nowrap">
                <p class="text-latte-text dark:text-mocha-text">
                  {{ CurrentSinger.PopularSong.GetTitle() }}
                </p>
                <p class="text-sm text-latte-subtext1 dark:text-mocha-subtext1">
                  Nana Mizuki
                </p>
              </div>
            </div>
            <SongWave :song-url="CurrentSinger.PopularSong.OriginalUrl" song-wave-class="hidden pr-5 md:block" />
          </div>
        </div>

        <!-- Latest Songs -->
        <div
          class="my-2 rounded-xl bg-latte-surface0 p-5 dark:bg-mocha-surface0" :class="{
            'mb-2 mt-6': CurrentSinger.PopularSong === null,
            'my-2': CurrentSinger.PopularSong !== null,
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
            <div v-for="album in CurrentSinger.Albums.slice(0, 7)" :key="album.Id">
              <AlbumCard :album="album" :singers="[CurrentSinger]" />
            </div>
          </div>
        </div>

        <div v-if="CurrentSinger.Descriptions.length > 0" class="my-2 rounded-xl bg-latte-surface0 p-5 shadow dark:bg-mocha-surface0">
          <h2 class="text-xl text-latte-text dark:text-mocha-text">
            About {{ CurrentSinger.GetName() }}
          </h2>
          <p class="prose dark:prose-invert prose-latte-subtext1 dark:prose-mocha-subtext1 mt-6 whitespace-normal text-sm">
            {{ CurrentSinger.GetDescription() }}
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
