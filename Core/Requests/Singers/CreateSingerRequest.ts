import type { LocalizedFileInterface } from '~/Core/Models/LocalizedFile'
import type { LocalizedString, LocalizedStringInterface } from '~/Core/Models/LocalizedString'

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

  public static async FromInfoAsync(form: any): Promise<CreateSingerRequestInterface> {
    console.log(form.names.slice(0))
    return {
      Names: form.names.filter((x: LocalizedString) => x.Text !== ''),
      Nicknames: form.nicknames.filter((x: LocalizedString) => x.Text !== ''),
      Birthday: new Date(form.birthday.year, form.birthday.month, form.birthday.day),
      ProfilePictureFile: {
        File: await ToBase64(form.profilePictureFiles[0].file as File),
        FileType: form.profilePictureFiles[0].file.type ?? 'image/png',
        Language: '', // We don't need language for profile picture
        FileName: form.profilePictureFiles[0].file.name,
      },
    }
  }
}
