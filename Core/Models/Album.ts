import { LocalizedString } from './LocalizedString'
import type { LocalizedStringInterface } from './LocalizedString'
import { Singer } from './Singer'
import type { SingerInterface } from './Singer'
import { Song } from './Song'
import type { SongInterface } from './Song'
import { Tag } from './Tag'
import type { TagInterface } from './Tag'

export interface AlbumInterface {
  Id: string
  Titles: LocalizedStringInterface[]
  Singers: SingerInterface[]
  AlbumArt: string
  Songs: SongInterface[]
  Tags: TagInterface[]
}

export class Album {
  Id: string
  Titles: LocalizedString[] = []
  Singers: Singer[] = []
  AlbumArt: string
  Songs: Song[] = []
  Tags: Tag[] = []

  constructor(album: AlbumInterface) {
    // Note(Mikyan): We could also use AutoMapper for TS here.

    this.Id = album.Id
    this.Titles = album.Titles.map((title: LocalizedStringInterface) => LocalizedString.FromResponse(title))
    this.Singers = album.Singers.map((singer: SingerInterface) => Singer.FromResponse(singer))
    this.AlbumArt = album.AlbumArt
    this.Songs = album.Songs.map((song: SongInterface) => Song.FromResponse(song))
    this.Tags = album.Tags.map((tag: TagInterface) => Tag.FromResponse(tag))
  }

  public GetTitle(language: string): string {
    const title = this.Titles.find((title: LocalizedString) => title.Language === language)

    if (title)
      return title.Text

    return this.Titles[0].Text
  }

  public static Empty(): Album {
    return new Album({
      Id: '',
      Titles: [],
      Singers: [],
      AlbumArt: '',
      Songs: [],
      Tags: [],
    })
  }

  public static FromResponse(info: AlbumInterface): Album {
    return new Album(info)
  }
}
