import type { IEditSingerInfo } from '~/Core/Forms/EditSingerInfo'
import type { ILocalizedFile } from '~/Core/Models/LocalizedFile'
import type { ILocalizedString } from '~/Core/Models/LocalizedString'

export interface IEditSingerRequest {
  Names: ILocalizedString[]
  Nicknames: ILocalizedString[]
  Birthday: Date | null
  Descriptions: ILocalizedString[]
  Activities: ILocalizedString[]

  // Note(Mikyan): null means no change, otherwise this is a new profile picture.
  ProfilePictureFile: ILocalizedFile | null
}

export class EditSingerRequest implements IEditSingerRequest {
  Names: ILocalizedString[] = []
  Nicknames: ILocalizedString[] = []
  Birthday: Date | null = null
  Descriptions: ILocalizedString[] = []
  Activities: ILocalizedString[] = []
  ProfilePictureFile: ILocalizedFile | null = null

  constructor(request: IEditSingerRequest) {
    this.Names = request.Names
    this.Nicknames = request.Nicknames
    this.Birthday = request.Birthday
    this.Descriptions = request.Descriptions
    this.Activities = request.Activities
    this.ProfilePictureFile = request.ProfilePictureFile
  }

  public static async FromInfoAsync(info: IEditSingerInfo): Promise<IEditSingerRequest> {
    return new EditSingerRequest({
      Names: info.Names,
      Nicknames: info.Nicknames,
      Birthday: new Date(info.BirthdayYear, info.BirthdayMonth, info.BirthdayDay),
      Descriptions: info.Descriptions,
      Activities: info.Activities,
      ProfilePictureFile: info.ProfilePictureFile !== null
        ? {
            File: await ToBase64(info.ProfilePictureFile),
            FileType: info.ProfilePictureFile!.type ?? 'image/png',
            Language: '', // We don't need language for profile picture
            FileName: info.ProfilePictureFile!.name,
          }
        : null,
    })
  }
}
