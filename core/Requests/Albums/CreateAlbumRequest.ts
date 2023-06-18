import type { LocalizedStringInterface } from '~/core/Models/LocalizedString'

export interface CreateAlbumRequestInterface {
  Titles: LocalizedStringInterface[]
  ReleaseDate: Date | null
  Singers: string[]
}

export class CreateAlbumRequest implements CreateAlbumRequestInterface {
  Titles: LocalizedStringInterface[]
  ReleaseDate: Date | null
  Singers: string[]

  constructor(request: CreateAlbumRequestInterface) {
    this.Titles = request.Titles
    this.ReleaseDate = request.ReleaseDate
    this.Singers = request.Singers
  }

  public static Empty(): CreateAlbumRequest {
    return new CreateAlbumRequest({
      Titles: [],
      ReleaseDate: null,
      Singers: [],
    })
  }

  public static async FromInfoAsync(form: any): Promise<CreateAlbumRequestInterface> {
    return {
      Titles: form.titles,
      ReleaseDate: new Date(form.releaseDate.year, form.releaseDate.month, form.releaseDate.day),
      Singers: form.singers,
    }
  }
}
