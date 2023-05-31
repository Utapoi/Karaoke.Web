import type { AlbumDTO } from './AlbumDTO'

export interface SongDTO {
  id: string
  title: string
  artist: string
  album: AlbumDTO
  duration: string
  tags: string[]
}
