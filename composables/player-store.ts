import { defineStore } from 'pinia'

export enum PlayerState {
  NOT_STARTED = 'not-started',
  PLAYING = 'playing',
  PAUSED = 'paused',
  ENDED = 'ended',
}

/**
 * The player store.
 * Used to manage the state of the player.
 */
export const usePlayerStore = defineStore('player-store', () => {
  // State
  const State = ref<PlayerState>(PlayerState.NOT_STARTED)

  return {
    State,
  }
})
