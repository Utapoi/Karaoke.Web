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
    <div class="mx-auto h-full max-w-7xl w-full px-12 pt-8 container">
      <div class="w-full flex flex-col gap-4">
        <!-- Singer Info -->
        <div class="w-full rounded-xl bg-cover bg-center bg-no-repeat">
          <div class="relative flex flex-col rounded-xl bg-latte-surface0 dark:bg-mocha-surface1">
            <div class="bg-image h-64 w-full rounded-t-xl">
              <div class="h-full w-full rounded-t-xl bg-black/20" />
            </div>
            <div class="flex items-start justify-start gap-4 px-6 pb-6">
              <!-- Artist Image -->
              <div class="h-86 w-56 rounded-xl shadow -mt-43">
                <img class="h-full w-full rounded-xl object-cover" :src="`https://localhost:7215${CurrentSinger.ProfilePicture}`">
              </div>
              <div class="mt-2 h-full flex flex-col items-start">
                <!-- Title / Artist -->
                <h1 class="text-3xl font-semibold text-latte-text dark:text-mocha-text">
                  {{ CurrentSinger.GetName() }}
                </h1>
                <h2 class="text-md text-latte-subtext0 dark:text-mocha-subtext0">
                  <span v-for="nickname in CurrentSinger.GetNicknames()" :key="nickname">{{ nickname }}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        <!-- Albums -->
        <div class="mt-4 flex items-center gap-2">
          <div class="h-0.25 w-16 rounded-full bg-latte-text dark:bg-mocha-text" />
          <h2 class="text-2xl text-latte-text dark:text-mocha-text">
            Albums
          </h2>
        </div>
        <div class="grid grid-cols-2 mb-8 w-full gap-4 text-latte-text lg:grid-cols-5 md:grid-cols-4 dark:text-mocha-text">
          <div v-for="album in CurrentSinger.Albums" :key="album.Id">
            <img class="aspect-1/1 h-76 h-min w-76 rounded-xl object-cover" :src="`https://localhost:7215${album.Cover}`">
            <p class="mt-1 overflow-hidden text-ellipsis">
              {{ album.GetTitle() }}
            </p>
          </div>
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
