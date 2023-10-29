<script setup lang="ts">
import { Howl } from 'howler'
import { PlayerState, usePlayerStore } from '~/Composables/Stores/PlayerStore'

const props = defineProps<{
  instrumentalUrl: string
  voiceUrl: string
  duration: number
}>()

const emits = defineEmits<{
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'seek'): void
  (e: 'ended'): void
  (e: 'update', time: number): void
}>()

// Composables
const PlayerStore = usePlayerStore()

const InstrumentalTrack = new Howl({
  src: [props.instrumentalUrl],
  volume: 0.25,
  preload: true,
  autoplay: false,
  onplay: OnPlay,
  onpause: OnPause,
  onend: OnEnded,
})

const VoiceTrack = new Howl({
  src: [props.voiceUrl],
  volume: 0.25,
  preload: true,
  autoplay: false,
  onplay: OnPlay,
  onpause: OnPause,
  onend: OnEnded,
})

// VueUse
const Timer = useIntervalFn(() => {
  if (PlayerStore.State !== PlayerState.PLAYING)
    return

  emits('update', InstrumentalTrack.seek() ?? VoiceTrack.seek() ?? 0)
}, 33.333 /* 30 fps */, { immediate: false })

useTimeoutFn(() => {
  InstrumentalTrack.play()
  VoiceTrack.play()
}, 3000)

// Events
function OnPlay() {
  PlayerStore.State = PlayerState.PLAYING
  Timer.resume()
  emits('play')
}

function OnPause() {
  PlayerStore.State = PlayerState.PAUSED
  Timer.pause()
  emits('pause')
}

function OnEnded() {
  PlayerStore.State = PlayerState.ENDED
  Timer.pause()
  emits('ended')
}

// Watchers
watch(() => PlayerStore.State,
  () => {
    switch (PlayerStore.State) {
      case PlayerState.PLAYING: {
        if (Timer.isActive)
          return

        Timer.resume()
        break
      }
      case PlayerState.PAUSED:
      case PlayerState.ENDED: {
        if (!Timer.isActive)
          return

        Timer.pause()
        break
      }
      default:
        break
    }
  })
</script>

<template>
  <div />
</template>
