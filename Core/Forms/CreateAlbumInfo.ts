import type { LocalizedStringInterface } from '../Models/LocalizedString'

export interface CreateAlbumInfo {
  Titles: LocalizedStringInterface[]
  ReleaseDateYear: number
  ReleaseDateMonth: number
  ReleaseDateDay: number
  Singers: string[]
  CoverFile: File | null
}
