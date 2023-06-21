import type { LocalizedStringInterface } from '../Models/LocalizedString'

export interface CreateAlbumInfo {
  Titles: LocalizedStringInterface[]
  ReleaseDate: Date | null
  Singers: string[]
  CoverFile: File | null
}
