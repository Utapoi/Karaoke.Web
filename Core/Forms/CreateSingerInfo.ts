import type { LocalizedStringInterface } from '../Models/LocalizedString'

export interface CreateSingerInfo {
  Names: LocalizedStringInterface[]
  Nicknames: LocalizedStringInterface[]
  Birthday: Date | null
  ProfilePictureFile: File | null
}
