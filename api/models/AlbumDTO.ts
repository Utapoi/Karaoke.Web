import type { SongDTO } from './SongDTO'

export interface AlbumDTO {
  id: string
  title: string
  artist: string
  albumArt: string
  songs: SongDTO[]
  tags: string[]
}
