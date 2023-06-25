import type { LocalizedStringInterface } from '../Models/LocalizedString'

export interface CreateSingerInfo {
  Names: LocalizedStringInterface[]
  Nicknames: LocalizedStringInterface[]
  BirthdayYear: number
  BirthdayMonth: number
  BirthdayDay: number
  ProfilePictureFile: File | null
}
