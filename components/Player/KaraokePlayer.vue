<script setup lang="ts">
import SubtitlesOctopus from 'libass-wasm'
import AudioPlayer from './AudioPlayer.vue'

const OctopusInstance = ref<SubtitlesOctopus | null>(null)
const CanvasRef = ref<HTMLCanvasElement | undefined>(undefined)
const { width, height } = useWindowSize()

// Events
function OnUpdate(value: number) {
  OctopusInstance.value?.setCurrentTime(value)
}

// Watchers
watch(
  () => CanvasRef.value,
  (canvas) => {
    const options: Options = {
      canvas,
      subUrl: '/test/railgun_op.ass',
      renderMode: 'wasm-blend',
      fonts: [
        '/test/CabinCondensed-Regular.woff2',
        '/test/SourceSansPro-SemiBold.woff2',
        '/test/1_ANGIE-BOLD.woff2',
        '/test/2_ANGIE-BOLDITALIC.woff2',
        '/test/3_BSOD.woff2',
        '/test/4_CLEARFACESSIBOLD.woff2',
        '/test/5_IM_FELL_ENGLISH_PRO_ROMAN.woff2',
        '/test/6_INSIGNESPLATS!-REGULAR.woff2',
        '/test/7_KINESISSTD-BLACK.woff2',
        '/test/8_AGARAMONDPRO-REGULAR.woff2',
      ],
      workerUrl: '/subtitles-octopus/subtitles-octopus-worker.js',
      legacyWorkerUrl: '/subtitles-octopus/subtitles-octopus-worker-legacy.js',
      debug: true,
    }

    OctopusInstance.value = new SubtitlesOctopus(options)
    OctopusInstance.value.setCurrentTime(0)
  },
)
</script>

<template>
  <div class="relative h-100vh w-100vw bg-[url(./test/toaru-wallpaper.jpg)] bg-cover">
    <div class="relative h-full w-full backdrop-blur-xl">
      <canvas v-if="width !== Infinity" ref="CanvasRef" :width="width" :height="height" class="absolute inset-0 z-50 max-h-full" />
      <div class="absolute bottom-0 h-25 w-full px-8">
        <AudioPlayer
          instrumental-url="/test/Shinjidai/shinjidai_no_vocals.mp3"
          voice-url="/test/Shinjidai/vocals.mp3"
          :duration="188"
          @play="() => {
            console.log('play')
          }"
          @update="OnUpdate"
        />
      </div>
    </div>
  </div>
</template>
