import type { ILocalizedFile } from '~/Core/Models/LocalizedFile'
import type { ILocalizedString } from '~/Core/Models/LocalizedString'
import type { ICreateSingerInfo } from '~/Core/Forms/CreateSingerInfo'

export interface ICreateSingerRequest {
  Names: ILocalizedString[]
  Nicknames: ILocalizedString[]
  Descriptions: ILocalizedString[]
  Activities: ILocalizedString[]
  Birthday: Date | null
  BloodType: string | null
  Height: number
  Nationality: string | null
  ProfilePictureFile: ILocalizedFile | null
}

export class CreateSingerRequest implements ICreateSingerRequest {
  Names: ILocalizedString[]
  Nicknames: ILocalizedString[]
  Descriptions: ILocalizedString[]
  Activities: ILocalizedString[]
  Birthday: Date | null
  BloodType: string | null
  Height: number
  Nationality: string | null
  ProfilePictureFile: ILocalizedFile | null

  constructor(request: ICreateSingerRequest) {
    this.Names = request.Names
    this.Nicknames = request.Nicknames
    this.Descriptions = request.Descriptions
    this.Activities = request.Activities
    this.Birthday = request.Birthday
    this.BloodType = request.BloodType
    this.Height = request.Height
    this.Nationality = request.Nationality
    this.ProfilePictureFile = request.ProfilePictureFile
  }

  public static Empty(): CreateSingerRequest {
    return new CreateSingerRequest({
      Names: [],
      Nicknames: [],
      Descriptions: [],
      Activities: [],
      Birthday: null,
      BloodType: null,
      Height: 0,
      Nationality: null,
      ProfilePictureFile: null,
    })
  }

  public static async FromInfoAsync(info: ICreateSingerInfo): Promise<ICreateSingerRequest> {
    return {
      Names: info.Names,
      Nicknames: info.Nicknames,
      Descriptions: info.Descriptions,
      Activities: info.Activities,
      Birthday: new Date(info.BirthdayYear, info.BirthdayMonth, info.BirthdayDay),
      BloodType: info.BloodType,
      Height: info.Height,
      Nationality: info.Nationality,
      ProfilePictureFile: {
        File: await ToBase64(info.ProfilePictureFile!),
        FileType: info.ProfilePictureFile!.type ?? 'image/png',
        Language: '', // We don't need language for profile picture
        FileName: info.ProfilePictureFile!.name,
      },
    }
  }
}
