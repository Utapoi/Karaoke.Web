import { Album } from './Album'
import type { AlbumInterface } from './Album'
import type { LocalizedStringInterface } from './LocalizedString'
import { LocalizedString } from './LocalizedString'
import { Song } from './Song'
import type { SongInterface } from './Song'

export interface SingerInterface {
  Id: string
  Names: LocalizedStringInterface[]
  ProfilePicture: string
  Albums: AlbumInterface[]
  Songs: SongInterface[]
}

export class Singer {
  Id = ''
  Names: LocalizedString[] = []
  ProfilePicture: string
  Albums: Album[] = []
  Songs: Song[] = []

  constructor(singer: SingerInterface) {
    this.Id = singer.Id
    this.Names = singer.Names.map((name: LocalizedStringInterface) => LocalizedString.FromResponse(name))
    this.ProfilePicture = singer.ProfilePicture
    this.Albums = singer.Albums?.map((album: AlbumInterface) => Album.FromResponse(album))
    this.Songs = singer.Songs.map((song: SongInterface) => Song.FromResponse(song))
  }

  public GetName(language: string): string {
    const name = this.Names.find((name: LocalizedString) => name.Language === language)

    if (name)
      return name.Text

    return this.Names[0].Text
  }

  public static FromResponse(info: SingerInterface): Singer {
    return new Singer(info)
  }
}
