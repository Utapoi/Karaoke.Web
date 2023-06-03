import { defineStore } from 'pinia'

interface KaraokeFileInfo {
  Language: string
}

enum CreationState {
  NOT_STARTED = 'not-started',
  IN_PROGRESS = 'in-progress',
  FINISHED = 'finished',
}

export const useCreateSongStore = defineStore('create-song-store', () => {
  const State = ref<CreationState>(CreationState.NOT_STARTED)
  const Title = ref<string | undefined>(undefined)
  const Artist = ref<string | undefined>(undefined)
  const Album = ref<string | undefined>(undefined)

  const SongCover = ref<File | undefined>(undefined)
  const KaraokeFiles = ref<[File, KaraokeFileInfo][]>([])

  /**
   * Adds a song cover.
   * @param file The file to add.
   */
  function AddSongCover(file: File) {
    SongCover.value = file
  }

  /**
   * Removes the song cover.
   */
  function RemoveSongCover() {
    SongCover.value = undefined
  }

  /**
   * Adds a karaoke file to the list.
   * @param file The file to add.
   * @param info The info about the file.
   */
  function AddKaraokeFile(file: File, info: KaraokeFileInfo) {
    KaraokeFiles.value.push([file, info])
  }

  /**
   * Removes a karaoke file from the list.
   * @param index The index of the file to remove.
   */
  function RemoveKaraokeFile(index: number) {
    KaraokeFiles.value.splice(index, 1)
  }

  /**
   * Creates a new song.
   */
  function Create() {
    if (State.value !== CreationState.IN_PROGRESS)
      throw new Error('The song creation is not in progress.')
    // TODO: Send API request.

    State.value = CreationState.FINISHED
    Reset()
  }

  /**
   * Validates the song data.
   */
  function Validate() {
    if (State.value !== CreationState.IN_PROGRESS)
      throw new Error('The song creation is not in progress.')

    // TODO: Validate the data.
  }

  /**
   * Resets the store.
   */
  function Reset() {
    State.value = CreationState.NOT_STARTED
    Title.value = undefined
    Artist.value = undefined
    Album.value = undefined
    SongCover.value = undefined
    KaraokeFiles.value = []
  }

  onUpdated(() => {
    if (State.value === CreationState.NOT_STARTED)
      State.value = CreationState.IN_PROGRESS
  })

  return {
    Title,
    Artist,
    Album,
    SongCover,
    KaraokeFiles,
    AddSongCover,
    RemoveSongCover,
    AddKaraokeFile,
    RemoveKaraokeFile,
    Create,
    Validate,
    Reset,
  }
})
