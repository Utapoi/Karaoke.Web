import type { ILocalizedString } from '../Models/LocalizedString'

export interface ICreateSingerInfo {
  Names: ILocalizedString[]
  Nicknames: ILocalizedString[]
  Descriptions: ILocalizedString[]
  Activities: ILocalizedString[]
  BirthdayYear: number
  BirthdayMonth: number
  BirthdayDay: number
  ProfilePictureFile: File | null
}
