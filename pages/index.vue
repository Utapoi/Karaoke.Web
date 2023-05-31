<script setup lang="ts">
import type { Options } from 'libass-wasm'
import SubtitlesOctopus from 'libass-wasm'

const VideoRef = ref<HTMLVideoElement | undefined>(undefined)
const OctopusInstance = ref<SubtitlesOctopus | null>(null)

watch(
  () => VideoRef.value,
  (video) => {
    if (video) {
      const options: Options = {
        video: VideoRef.value, // HTML5 video element
        subUrl: '/test/railgun_op.ass', // Link to subtitles
        renderMode: 'wasm-blend',
        fonts: ['/test/CabinCondensed-Regular.woff2', '/test/SourceSansPro-SemiBold.woff2'], // Links to fonts (not required, default font already included in build)
        workerUrl: '/subtitles-octopus/subtitles-octopus-worker.js', // Link to WebAssembly-based file "libassjs-worker.js"
        legacyWorkerUrl: '/subtitles-octopus/subtitles-octopus-worker-legacy.js', // Link to non-WebAssembly worker
        debug: true,
      }
      OctopusInstance.value = new SubtitlesOctopus(options)
    }
  },
)
</script>

<template>
  <Suspense>
    <ClientOnly>
      <div class="relative">
        <video ref="VideoRef" :width="1920" :height="1080" controls preload="auto" class="aspect-ratio-video h-[100vh] w-[100vw]">
          <source src="https://animethemes.moe/video/ToaruKagakuNoRailgunS-OP1.webm" type="video/webm">
        </video>
      </div>
    </ClientOnly>
    <template #fallback>
      <div italic op50>
        <span animate-pulse>Loading...</span>
      </div>
    </template>
  </Suspense>
</template>
