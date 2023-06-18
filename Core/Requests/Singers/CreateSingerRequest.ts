import type { LocalizedFileInterface } from '~/Core/Models/LocalizedFile'
import type { LocalizedStringInterface } from '~/Core/Models/LocalizedString'

export interface CreateSingerRequestInterface {
  Titles: LocalizedStringInterface[]
  Nicknames: LocalizedStringInterface[]
  Birthday: Date | null
  ProfilePicture: LocalizedFileInterface | null
}

export class CreateSingerRequest implements CreateSingerRequestInterface {
  Titles: LocalizedStringInterface[]
  Nicknames: LocalizedStringInterface[]
  Birthday: Date | null
  ProfilePicture: LocalizedFileInterface | null

  constructor(request: CreateSingerRequestInterface) {
    this.Titles = request.Titles
    this.Nicknames = request.Nicknames
    this.Birthday = request.Birthday
    this.ProfilePicture = request.ProfilePicture
  }

  public static Empty(): CreateSingerRequest {
    return new CreateSingerRequest({
      Titles: [],
      Nicknames: [],
      Birthday: null,
      ProfilePicture: null,
    })
  }

  public static async FromInfoAsync(form: any): Promise<CreateSingerRequestInterface> {
    return {
      Titles: form.titles,
      Nicknames: form.nicknames,
      Birthday: new Date(form.birthday.year, form.birthday.month, form.birthday.day),
      ProfilePicture: {
        File: await ToBase64(form.profilePictureFiles[0].file as File),
        FileType: form.profilePictureFiles[0].file.type ?? 'image/png',
        Language: '', // We don't need language for profile picture
        FileName: form.profilePictureFiles[0].file.name,
      },
    }
  }
}
