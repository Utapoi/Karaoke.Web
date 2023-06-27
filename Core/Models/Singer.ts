import { Album } from './Album'
import type { AlbumInterface } from './Album'
import type { LocalizedStringInterface } from './LocalizedString'
import { LocalizedString } from './LocalizedString'
import { Song } from './Song'
import type { SongInterface } from './Song'

export interface SingerInterface {
  Id: string
  Names: LocalizedStringInterface[]
  Nicknames: LocalizedString[]
  ProfilePicture: string
  Albums: AlbumInterface[]
  Songs: SongInterface[]
}

export class Singer {
  Id = ''
  Names: LocalizedString[] = []
  Nicknames: LocalizedString[] = []
  ProfilePicture: string
  Albums: Album[] = []
  Songs: Song[] = []

  constructor(singer: SingerInterface) {
    this.Id = singer.Id
    this.Names = singer.Names?.map((name: LocalizedStringInterface) => LocalizedString.FromResponse(name))
    this.Nicknames = singer.Nicknames?.map((nickname: LocalizedStringInterface) => LocalizedString.FromResponse(nickname))
    this.ProfilePicture = singer.ProfilePicture
    this.Albums = singer.Albums?.map((album: AlbumInterface) => Album.FromResponse(album))
    this.Songs = singer.Songs?.map((song: SongInterface) => Song.FromResponse(song))
  }

  public static Empty(): Singer {
    return new Singer({
      Id: '',
      Names: [],
      Nicknames: [],
      ProfilePicture: '',
      Albums: [],
      Songs: [],
    })
  }

  public GetName(language = 'English'): string {
    const name = this.Names.find((name: LocalizedString) => name.Language === language)

    if (name !== undefined)
      return name.Text

    return this.Names[0]?.Text ?? ''
  }

  public GetNicknames(language = 'English'): string[] {
    const nicknames = this.Nicknames.filter(x => x.Language === language).map((nickname: LocalizedString) => nickname.Text)

    if (nicknames !== undefined)
      return nicknames

    return this.Nicknames.map(x => x.Text)
  }

  public GetRandomAlbumCover(): string {
    const album = this.Albums[Math.floor(Math.random() * this.Albums.length)]

    return album.Cover
  }

  public static FromResponse(info: SingerInterface | null): Singer {
    if (info === null)
      return Singer.Empty()

    return new Singer(info)
  }
}
