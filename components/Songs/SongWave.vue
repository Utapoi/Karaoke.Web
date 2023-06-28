<script setup lang="ts">
import WaveSurfer from 'wavesurfer.js'

export interface SongWaveProps {
  songUrl: string
  showControls?: boolean
  songWaveClass?: string
}

withDefaults(defineProps<SongWaveProps>(), {
  showControls: true,
  songWaveClass: '',
})

const SongWaveContainer = ref<HTMLDivElement | undefined>(undefined)
const SongWave = ref<WaveSurfer | undefined>(undefined)
const SongIsPlaying = ref<boolean>(false)

function OnPlayClicked() {
  SongWave.value?.play()
  SongIsPlaying.value = true
}

function OnPauseClicked() {
  SongWave.value?.pause()
  SongIsPlaying.value = false
}

watch(SongWaveContainer, (v) => {
  if (v === undefined)
    return

  SongWave.value = WaveSurfer.create({
    container: '#song-wave',
    waveColor: '#fefefe',
    progressColor: '#f90b31',
    barWidth: 3,
    barRadius: 3,
    barGap: 2,
    cursorWidth: 0,
    height: 74,
    url: '/test/innocent_starter.mp3',
  })

  SongWave.value.setVolume(0.25)

  SongWave.value.on('interaction', () => {
    SongWave.value?.play()
    SongIsPlaying.value = true
  })
})
</script>

<template>
  <div class="w-full flex items-center gap-8">
    <div v-if="showControls" class="mx-4 rounded-full bg-latte-surface1 p-3 text-xl text-latte-text hover:cursor-pointer dark:bg-mocha-surface1 dark:text-mocha-text">
      <div
        v-if="!SongIsPlaying"
        class="i-fluent:play-16-filled"
        @click.prevent="OnPlayClicked"
      />
      <div
        v-else
        class="i-fluent:pause-16-filled"
        @click.prevent="OnPauseClicked"
      />
    </div>
    <div id="song-wave" ref="SongWaveContainer" class="relative w-full" :class="songWaveClass" />
  </div>
</template>
