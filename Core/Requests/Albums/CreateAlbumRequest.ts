import type { LocalizedFileInterface } from '~/Core/Models/LocalizedFile'
import type { LocalizedString, LocalizedStringInterface } from '~/Core/Models/LocalizedString'

export interface CreateAlbumRequestInterface {
  Titles: LocalizedStringInterface[]
  ReleaseDate: Date | null
  Singers: string[]
  CoverFile: LocalizedFileInterface | null
}

export class CreateAlbumRequest implements CreateAlbumRequestInterface {
  Titles: LocalizedStringInterface[]
  ReleaseDate: Date | null
  Singers: string[]
  CoverFile: LocalizedFileInterface | null

  constructor(request: CreateAlbumRequestInterface) {
    this.Titles = request.Titles
    this.ReleaseDate = request.ReleaseDate
    this.Singers = request.Singers
    this.CoverFile = request.CoverFile
  }

  public static Empty(): CreateAlbumRequest {
    return new CreateAlbumRequest({
      Titles: [],
      ReleaseDate: null,
      Singers: [],
      CoverFile: null,
    })
  }

  public static async FromInfoAsync(form: any): Promise<CreateAlbumRequestInterface> {
    return {
      Titles: form.titles.filter((x: LocalizedString) => x.Text !== ''),
      ReleaseDate: new Date(form.releaseDate.year, form.releaseDate.month, form.releaseDate.day),
      Singers: form.singers,
      CoverFile: {
        File: await ToBase64(form.coverFiles[0].file as File),
        FileType: form.coverFiles[0].file.type ?? 'image/png',
        Language: '', // We don't need language for profile picture
        FileName: form.coverFiles[0].file.name,
      },
    }
  }
}
