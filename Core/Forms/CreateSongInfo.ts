import type { LocalizedStringInterface } from '../Models/LocalizedString'
import type { CreateFileInfo } from './CreateFileInfo'

export interface CreateSongInfo {
  Titles: LocalizedStringInterface[]
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
