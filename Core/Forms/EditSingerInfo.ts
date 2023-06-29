import { nanoid } from 'nanoid'
import type { ILocalizedString } from '../Models/LocalizedString'
import type { ISinger } from '../Models/Singer'

export interface IEditSingerInfo {
  Names: ILocalizedString[]
  Nicknames: ILocalizedString[]
  BirthdayYear: number
  BirthdayMonth: number
  BirthdayDay: number
  Descriptions: ILocalizedString[]
  Activities: ILocalizedString[]

  // Note(Mikyan): null means no change, otherwise this is a new profile picture.
  ProfilePictureFile: File | null
}

export function EmptyIEditSingerInfo(): IEditSingerInfo {
  return {
    Names: [],
    Nicknames: [],
    BirthdayYear: 0,
    BirthdayMonth: 0,
    BirthdayDay: 0,
    Descriptions: [],
    Activities: [],
    ProfilePictureFile: null,
  }
}

export function IEditSingerInfoFromSinger(singer: ISinger): IEditSingerInfo {
  const bday = new Date(singer.Birthday ?? '')

  return {
    Names: singer.Names,
    Nicknames: singer.Nicknames,
    BirthdayYear: bday.getFullYear() ?? 0,
    BirthdayMonth: bday.getMonth() ?? 0,
    BirthdayDay: bday.getDate() ?? 0,
    Descriptions: singer.Descriptions.length > 0
      ? singer.Descriptions
      : [{
          Id: nanoid(),
          Text: '',
          Language: 'Japanese',
        }],
    Activities: singer.Activities.length > 0
      ? singer.Activities
      : [{
          Id: nanoid(),
          Text: '',
          Language: 'Japanese',
        }],
    ProfilePictureFile: null,
  }
}
