import type { ILocalizedString } from '../Models/LocalizedString'

export interface CreateAlbumInfo {
  Titles: ILocalizedString[]
  ReleaseDateYear: number
  ReleaseDateMonth: number
  ReleaseDateDay: number
  Singers: string[]
  CoverFile: File | null
}
