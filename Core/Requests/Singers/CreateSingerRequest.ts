import type { ILocalizedFile } from '~/Core/Models/LocalizedFile'
import type { ILocalizedString } from '~/Core/Models/LocalizedString'
import type { ICreateSingerInfo } from '~/Core/Forms/CreateSingerInfo'

export interface ICreateSingerRequest {
  Names: ILocalizedString[]
  Nicknames: ILocalizedString[]
  Birthday: Date | null
  ProfilePictureFile: ILocalizedFile | null
}

export class CreateSingerRequest implements ICreateSingerRequest {
  Names: ILocalizedString[]
  Nicknames: ILocalizedString[]
  Birthday: Date | null
  ProfilePictureFile: ILocalizedFile | null

  constructor(request: ICreateSingerRequest) {
    this.Names = request.Names
    this.Nicknames = request.Nicknames
    this.Birthday = request.Birthday
    this.ProfilePictureFile = request.ProfilePictureFile
  }

  public static Empty(): CreateSingerRequest {
    return new CreateSingerRequest({
      Names: [],
      Nicknames: [],
      Birthday: null,
      ProfilePictureFile: null,
    })
  }

  public static async FromInfoAsync(form: ICreateSingerInfo): Promise<ICreateSingerRequest> {
    return {
      Names: form.Names,
      Nicknames: form.Nicknames,
      Birthday: new Date(form.BirthdayYear, form.BirthdayMonth, form.BirthdayDay),
      ProfilePictureFile: {
        File: await ToBase64(form.ProfilePictureFile!),
        FileType: form.ProfilePictureFile!.type ?? 'image/png',
        Language: '', // We don't need language for profile picture
        FileName: form.ProfilePictureFile!.name,
      },
    }
  }
}
