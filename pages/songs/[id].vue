<script setup lang="ts">
// Composables
const Route = useRoute()

// Variables
const SongId = computed<string>(() => Route.params.id.toString())
</script>

<template>
  <div class="h-full w-full px-12 pt-8">
    <div class="w-full flex flex-col gap-4">
      <!-- Song Info -->
      <div class="w-full">
        <div class="flex items-start justify-start gap-8">
          <!-- Song/Album Cover -->
          <div class="h-72 w-72">
            <img class="h-full w-full rounded-xl" src="https://static.wikia.nocookie.net/senkizesshousymphogear/images/a/a5/Symphogear_G_Character_Song_2.jpg">
          </div>
          <div class="flex flex-col gap-3">
            <!-- Title / Artist -->
            <div class="mt-2">
              <h1 class="text-3xl font-semibold">
                Rainbow Flower
              </h1>
              <h2 class="text-md dark:text-gray-400">
                Tachibana Hibiki (CV: <span class="underline hover:cursor-pointer">Yuuki Aoi</span>)
              </h2>
            </div>

            <!-- Play / Favorites -->
            <div class="flex items-center gap-2">
              <div class="inline-flex items-center gap-3 border-1.75 border-[#f90b31] rounded-full px-4 py-1 text-center text-lg text-[#f90b31] transition-all duration-200 hover:cursor-pointer hover:bg-[#f90b31] hover:text-white">
                <span class="i-game-icons:microphone" />
                <span>Sing</span>
              </div>
              <div class="inline-flex items-center gap-3 border-1.75 border-gray-600 rounded-full px-4 py-1 text-center text-lg text-gray-400 transition-all duration-200 hover:cursor-pointer hover:bg-gray-600 hover:text-white">
                <span class="i-fluent:add-circle-12-filled" />
                <span>Add to playlist</span>
              </div>
              <div class="text-center text-lg font-semibold text-gray-400 transition-all duration-200 hover:cursor-pointer">
                <div class="i-fluent:heart-28-regular hover:i-fluent:heart-28-filled text-xl transition-all duration-200 hover:text-[#f90b31]" />
              </div>
            </div>

            <div class="my-2 w-100 border border-gray-600" />

            <div class="flex items-center gap-8">
              <!-- Tags -->
              <div class="flex flex-wrap items-center gap-1">
                <p class="rounded-sm bg-red-600/80 px-1.5 py-0.5 text-sm">
                  Anime
                </p>
                <p class="rounded-sm bg-purple-600/80 px-1.5 py-0.5 text-sm">
                  Symphogear
                </p>
              </div>

              <!-- Singer Count -->
              <div class="flex items-center gap-6">
                <div class="flex items-center justify-start gap-1.5 py-1.25" title="Duration">
                  <span class="i-fluent:clock-32-filled" />
                  <span class="text-sm">3:58</span>
                </div>
                <div class="flex items-center justify-start gap-1.5 py-1.25" title="Singer">
                  <span class="i-fluent:mic-28-filled" />
                  <span class="text-sm">1</span>
                </div>
              </div>
            </div>

            <!-- Stats -->
            <!-- <div>
              <div class="my-1 w-full flex items-center gap-3">
                <div class="flex items-center gap-1 dark:text-white">
                  <span class="i-fluent:play-circle-24-filled" title="Play Count" />
                  <p>1 500</p>
                </div>
                <div class="flex items-center gap-1 dark:text-white">
                  <span class="i-fluent:heart-circle-20-filled" title="Likes" />
                  <p>500</p>
                </div>
                <div class="ml-6 flex items-center gap-1 text-right dark:text-white">
                  <span class="i-fluent:calendar-20-filled" title="Release Date" />
                  <p>2023/05/31</p>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>

      <!-- Details -->
      <div class="flex flex-wrap gap-4">
        <!-- Lyrics -->
        <div class="w-1/2 flex-1 rounded-xl bg-[#222222] p-3 text-center shadow">
          <h3 class="text-xl font-semibold">
            Lyrics
          </h3>
          <div class="mt-6 text-gray-200">
            <p>
              幾億の歴史を超えて
            </p>
            <p>
              この胸の (Go) 問いかけに (Go) 応えよShine
            </p>
            <p>焔より熱い想いよ</p>
            <br>
            <p>鋼鉄の (Go) イカヅチで (Go) ぶっ飛ばせMy Gungnir</p>
            <p>最速で最短で一直線に</p>
            <p>光った (Fly) 朝日を (Fly)</p>
            <br>
            <p>君と共に 見たい (見たい) 今 (今) 見上げよう</p>
            <p>...</p>
          </div>
        </div>

        <div class="w-1/2 flex flex-1 flex-col gap-4">
          <!-- Ranking -->
          <div class="col-span-2 row-span-1 rounded-xl bg-[#222222] p-3 text-center shadow">
            <h3 class="text-xl font-semibold">
              Ranking
            </h3>
          </div>

          <!-- Recommended -->
          <div class="col-span-2 col-start-3 rounded-xl bg-[#222222] p-3 text-center shadow">
            <h3 class="text-xl font-semibold">
              Similar songs
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
