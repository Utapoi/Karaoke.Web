<script setup lang="ts">
// Composables
const Route = useRoute()

// Variables
const SongId = computed<string>(() => Route.params.id.toString())
</script>

<template>
  <div class="mx-auto h-full max-w-7xl w-full px-12 pt-8 container">
    <div class="w-full flex flex-col gap-4">
      <!-- Song Info -->
      <div class="w-full rounded-xl bg-[url(/test/Symphogear-XV.jpg)] bg-cover bg-center bg-no-repeat">
        <div class="relative flex flex-col gap-8 rounded-xl from-black/90 via-gray-800/75 to-transparent bg-gradient-to-r p-6">
          <div class="absolute right-2 top-2 rounded-xl bg-black/65 px-3 py-3 backdrop-blur">
            <div class="w-full flex items-center gap-4">
              <div class="i-circle-flags:jp text-lg opacity-50 hover:cursor-pointer" />
              <div class="rounded-full hover:cursor-pointer">
                <div class="i-circle-flags:earth text-xl" />
              </div>
              <div class="i-circle-flags:en text-lg opacity-50 hover:cursor-pointer" />
            </div>
          </div>
          <div class="flex items-center justify-start gap-4">
            <!-- Song/Album Cover -->
            <div class="h-28 w-28">
              <img class="h-full w-full rounded-xl" src="https://static.wikia.nocookie.net/senkizesshousymphogear/images/a/a5/Symphogear_G_Character_Song_2.jpg">
            </div>
            <div class="h-full flex flex-col items-start">
              <!-- Title / Artist -->
              <h1 class="text-3xl font-semibold">
                Rainbow Flower
              </h1>
              <h2 class="text-md dark:text-gray-300">
                Tachibana Hibiki (CV: <span class="underline hover:cursor-pointer">Yuuki Aoi</span>)
              </h2>
              <h2 class="mt-2 text-sm dark:text-gray-400">
                from <span class="text-gray-300 hover:cursor-pointer">Symphogear G Character Song 2</span>
              </h2>
            </div>
          </div>
          <!-- Play / Favorites -->
          <div class="flex items-center gap-2">
            <div class="inline-flex items-center gap-3 border-1.75 border-[#f90b31] rounded-full px-4 py-1 text-center text-lg text-[#f90b31] transition-all duration-200 hover:cursor-pointer hover:bg-[#f90b31]/20 hover:text-white">
              <span class="i-game-icons:microphone" />
              <span>Sing</span>
            </div>
            <div class="inline-flex items-center gap-3 border-1.75 border-gray-600 rounded-full px-4 py-1 text-center text-lg text-gray-400 transition-all duration-200 hover:cursor-pointer hover:bg-gray-600/40 hover:text-white">
              <span class="i-fluent:add-circle-12-filled" />
              <span>Add to playlist</span>
            </div>
            <div class="text-center text-lg font-semibold text-gray-400 transition-all duration-200 hover:cursor-pointer">
              <div class="i-fluent:heart-28-regular hover:i-fluent:heart-28-filled text-xl transition-all duration-200 hover:text-[#f90b31]" />
            </div>
          </div>

          <!-- Tags -->
          <div class="flex items-center gap-8">
            <div class="flex flex-wrap items-center gap-1">
              <p class="rounded-sm bg-red-600/80 px-1.5 py-0.5 text-sm">
                Anime
              </p>
              <p class="rounded-sm bg-purple-600/80 px-1.5 py-0.5 text-sm">
                Symphogear
              </p>
              <p class="rounded-sm bg-blue-600/80 px-1.5 py-0.5 text-sm">
                Insert Song
              </p>
              <p class="rounded-sm bg-blue-600/80 px-1.5 py-0.5 text-sm">
                J-Pop
              </p>
              <p class="rounded-sm bg-blue-600/80 px-1.5 py-0.5 text-sm">
                Magical Girl
              </p>
            </div>

            <div class="flex items-center gap-6">
              <div class="flex items-center justify-start gap-1.5 py-1.25 text-gray-300" title="Duration">
                <span class="i-fluent:clock-32-filled" />
                <span class="text-sm text-white">3:58</span>
              </div>
              <div class="flex items-center justify-start gap-1.5 py-1.25 text-gray-300" title="Singer">
                <span class="i-fluent:mic-28-filled" />
                <span class="text-sm text-white">1</span> <span class="text-sm font-semibold">~</span> <span class="text-sm text-white">3</span>
              </div>
            </div>
          </div>

          <!-- Creators (Upcoming Feature) -->
          <!-- <div class="absolute bottom-2 right-2">
            <div class="flex -space-x-4">
              <img class="h-10 w-10 border-2 border-white rounded-full dark:border-gray-800" src="https://pbs.twimg.com/profile_images/1078297639521636352/_X45cMVJ_400x400.jpg" title="Created by User#1" alt="User">
              <img class="h-10 w-10 border-2 border-white rounded-full dark:border-gray-800" src="https://pbs.twimg.com/profile_images/1451666062638923780/6v-q2Ojo_400x400.jpg" title="Created by User#2" alt="User">
              <img class="h-10 w-10 border-2 border-white rounded-full dark:border-gray-800" src="https://pbs.twimg.com/profile_images/1638787092909297664/Bpq513g4_400x400.png" title="Created by User#3" alt="User">
              <a class="h-10 w-10 flex items-center justify-center border-2 border-white rounded-full bg-gray-700 text-xs font-medium text-white dark:border-gray-800 hover:bg-gray-600" title="and 2 others" href="#">+2</a>
            </div>
          </div> -->
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

      <!-- Details -->
      <div class="mb-8 w-full flex flex-wrap gap-4 lg:flex-nowrap">
        <!-- Lyrics -->
        <div class="h-min w-full rounded-xl bg-[#222222] p-3 text-center shadow lg:w-1/2">
          <h3 class="text-xl font-semibold">
            Lyrics
          </h3>
          <div class="mt-6 text-gray-200">
            (Ye-e-Ye-e Ha-a Kort gungnir messa baggy)<br>
            (Ye-e-Ye-e Ha-a Kort gungnir messa brossy…Gungnir)<br>
            <br>
            Ikuoku no rekishi wo koete<br>
            Kono mune no (Go) toikake ni (Go) kotae yo Shine<br>
            <br>
            Honō yori atsui omoi yo<br>
            Kōtetsu no (Go) ikadzuchi de (Go) buttobase My Gungnir<br>
            <br>
            Saisoku de saitan de icchokusen ni<br>
            Hikatta (Fly) asahi wo (Fly)<br>
            Kimi to tomo ni mitai (mitai) ima (ima) miageyō<br>
            <br>
            Hibike (hibike) tsutae (tsutae) utae (utae)<br>
            Zenryoku de "hitori ja nai" to todoketai<br>
            <br>
            Hibike (hibike) tsutae (tsutae) utae (utae)<br>
            Soshite! Waraō…! Kono sekai ni wa uta ga aru<br>
            <br>
            Nando demo tachiagareru sa<br>
            Chotto dake (Go) kita michi wo (Go) mite goran?<br>
            <br>
            Konna ni mo kagayaite iru<br>
            Tsumiageta (Go) monogatari (Go) uso wa nani mo nai<br>
            <br>
            "Itsuka mirai ni hito wa tsunagareru…"<br>
            Daiji na (Fly) tomo kara (Fly)<br>
            Moratta kotoba zettai (zettai) yume (yume) tsumugu kara<br>
            <br>
            Hibike (hibike) tsutae (tsutae) utae (utae)<br>
            Zenkai de ai no banka yo todoroite<br>
            <br>
            Hibike (hibike) tsutae (tsutae) utae (utae)<br>
            Soshite! Yūki mo nani mo kamo wo zenbu tabaneyō<br>
            <br>
            (Balwisyall nescell gungnir tron)<br>
            <br>
            Kimi to watashi, minna, minna,<br>
            Ayumikitta, ashiato ni donna hana ga saku no kanā?<br>
            Naite, warai, umare ochita, namida, namida…,<br>
            Kitto kirei na niji no hana ni natte saki utau…!<br>
            <br>
            Hibike (hibike) tsutae (tsutae) utae (utae)<br>
            Zenryoku de "hitori ja nai" to todoketai<br>
            <br>
            Hibike (hibike) tsutae (tsutae) utae (utae)<br>
            Soshite! Mata au sono hi made egao no "sayonara" da!<br>
            Zettai ni…zettai ni…!<br>
          </div>
          <div class="mt-6 text-right text-sm text-gray-400">
            Lyrics from <a href="https://symphogear.fandom.com/wiki/Rainbow_Flower" class="underline" target="_blank">Symphogear Wiki</a>
          </div>
        </div>

        <!-- Right Side -->
        <div class="h-min w-full flex flex-col gap-4 lg:w-1/2">
          <!-- Ranking -->
          <div class="rounded-xl bg-[#222222] p-3 text-center shadow">
            <h3 class="text-xl font-semibold">
              Ranking
            </h3>
          </div>

          <!-- Recommended -->
          <div class="rounded-xl bg-[#222222] p-3 text-center shadow">
            <h3 class="text-xl font-semibold">
              Similar songs
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
