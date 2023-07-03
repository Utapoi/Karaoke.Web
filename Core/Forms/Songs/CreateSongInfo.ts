import type { ILocalizedString } from '../../Models/LocalizedString'
import type { CreateFileInfo } from '../CreateFileInfo'

export interface CreateSongInfo {
  Titles: ILocalizedString[]
  ReleaseDate: Date | null
  Singers: string[]
  Albums: string[]
  Tags: string[]
  ThumbnailFile: CreateFileInfo
  PreviewFile: CreateFileInfo
  VoiceFile: CreateFileInfo
  InstrumentalFile: CreateFileInfo
  LyricsFiles: CreateFileInfo[]
  KaraokeFiles: CreateFileInfo[]
}
