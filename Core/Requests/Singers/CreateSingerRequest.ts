import type { LocalizedFileInterface } from '~/Core/Models/LocalizedFile'
import type { LocalizedStringInterface } from '~/Core/Models/LocalizedString'
import type { CreateSingerInfo } from '~/Core/Forms/CreateSingerInfo'

export interface CreateSingerRequestInterface {
  Names: LocalizedStringInterface[]
  Nicknames: LocalizedStringInterface[]
  Birthday: Date | null
  ProfilePictureFile: LocalizedFileInterface | null
}

export class CreateSingerRequest implements CreateSingerRequestInterface {
  Names: LocalizedStringInterface[]
  Nicknames: LocalizedStringInterface[]
  Birthday: Date | null
  ProfilePictureFile: LocalizedFileInterface | null

  constructor(request: CreateSingerRequestInterface) {
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

  public static async FromInfoAsync(form: CreateSingerInfo): Promise<CreateSingerRequestInterface> {
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
