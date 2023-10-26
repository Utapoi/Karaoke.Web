<script setup lang="ts">
import AnimatedSmallSongCard from '~/components/songs/AnimatedSmallSongCard.vue'

definePageMeta({
  layout: 'game',
})
</script>

<template>
  <div class="h-full w-full">
    <div class="h-full w-full bg-[url(/test/Symphogear-XV.jpg)] bg-cover bg-no-repeat">
      <div class="h-full w-full bg-black/75 backdrop-blur-xl">
        <div class="h-full w-full p-8">
          <div class="h-full flex flex-col justify-between">
            <div class="w-full flex justify-between gap-4">
              <div class="flex gap-4">
                <div v-motion-slide-left class="aspect-ratio-1 h-62 w-62">
                  <img src="https://static.wikia.nocookie.net/senkizesshousymphogear/images/a/a5/Symphogear_G_Character_Song_2.jpg" class="h-full w-full rounded-lg object-cover shadow-lg" alt="tmp">
                </div>
                <div class="flex flex-col gap-3">
                  <div v-motion-slide-top class="text-3xl font-semibold">
                    Rainbow Flower
                  </div>
                  <div v-motion-slide-top>
                    <p class="text-md text-main">
                      <span class="text-secondary">by </span> Tachibana Hibiki (CV: Yuuki Aoi)
                    </p>
                    <p class="text-md text-main">
                      <span class="text-secondary">from </span> Symphogear G Character Song 2
                    </p>
                  </div>
                  <div v-motion-slide-top>
                    <div class="text-accent ml-1 mt-8 text-sm font-semibold">
                      Select one
                    </div>
                    <div class="mt-2 flex justify-start gap-2">
                      <div class="hover:text-main text-secondary inline-flex items-center justify-center border border-gray-700 rounded-full px-3 py-1.5 transition-color duration-125 hover:cursor-pointer hover:bg-gray-700/45">
                        <span class="i-circle-flags:jp" />
                        <span class="text-md ml-2">Japanese</span>
                      </div>
                      <div class="hover:text-main text-secondary inline-flex items-center justify-center border border-gray-700 rounded-full px-3 py-1.5 transition-color duration-200 hover:cursor-pointer hover:bg-gray-700/45">
                        <span class="i-circle-flags:earth" />
                        <span class="text-md ml-2">Romaji</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-motion-slide-top class="flex items-start gap-2">
                <div class="hover:text-main text-secondary w-30 inline-flex items-center justify-center border border-gray-600 rounded-full px-2 py-2 transition-all duration-125 hover:cursor-pointer hover:bg-gray-600 hover:bg-opacity-15">
                  <span class="text-xl">Back</span>
                </div>
                <div class="border-accent hover:bg-accent hover:text-main text-accent w-30 inline-flex items-center justify-center border rounded-full px-2 py-2 transition-all duration-125 hover:cursor-pointer hover:bg-opacity-15">
                  <span class="text-xl">Sing</span>
                </div>
              </div>
            </div>
            <div v-motion-slide-left>
              <p class="text-md text-secondary mb-4">
                Up next
                in <span class="text-main">Symphogear Collection</span>
              </p>
              <div class="flex items-center gap-4">
                <!-- <div class="aspect-ratio-1 h-52 w-52 transform-gpu overflow-hidden border-2 border-[#444] rounded-xl border-dashed transition-transform duration-200">
                  <div class="h-full w-full inline-flex flex-col items-center justify-center gap-2 bg-black/75">
                    <div class="i-fluent:presence-blocked-24-regular text-3xl text-secondary" />
                    <p class="text-sm text-secondary">
                      No song
                    </p>
                  </div>
                </div> -->

                <AnimatedSmallSongCard url="https://static.wikia.nocookie.net/senkizesshousymphogear/images/4/44/Symphogear_Character_Song_1.jpg" title="Gyakkō no Flügel" singer="Nana Mizuki, Minami Takayama" />

                <AnimatedSmallSongCard url="https://static.wikia.nocookie.net/senkizesshousymphogear/images/7/7a/Mizuki_Nana_Synchrogazer.jpg" title="Synchrogazer" singer="Mizuki Nana" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
