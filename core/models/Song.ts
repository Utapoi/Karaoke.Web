import { Album } from './Album'
import type { AlbumInterface } from './Album'
import { LocalizedString } from './LocalizedString'
import type { LocalizedStringInterface } from './LocalizedString'
import { Singer } from './Singer'
import type { SingerInterface } from './Singer'
import { Tag } from './Tag'
import type { TagInterface } from './Tag'

export interface SongInterface {
  Id: string
  Titles: LocalizedStringInterface[]
  Singers: SingerInterface[]
  Albums: AlbumInterface[]
  Duration: string
  ReleaseDate: Date
  Tags: TagInterface[]
  PreviewUrl: string
}

export class Song {
  Id: string
  Titles: LocalizedString[]
  Singers: Singer[]
  Albums: Album[]
  Duration: string
  ReleaseDate: Date
  Tags: Tag[]
  PreviewUrl: string

  constructor(song: SongInterface) {
    this.Id = song.Id
    this.Titles = song.Titles.map((title: LocalizedStringInterface) => LocalizedString.FromResponse(title))
    this.Singers = song.Singers.map((singer: SingerInterface) => Singer.FromResponse(singer))
    this.Albums = song.Albums.map((album: AlbumInterface) => Album.FromResponse(album))
    this.Duration = song.Duration
    this.ReleaseDate = song.ReleaseDate
    this.Tags = song.Tags.map((tag: TagInterface) => Tag.FromResponse(tag))
    this.PreviewUrl = song.PreviewUrl
  }

  public GetTitle(language: string): string {
    const title = this.Titles.find((title: LocalizedString) => title.Language === language)

    if (title)
      return title.Text

    return this.Titles[0].Text
  }

  public static FromResponse(info: SongInterface): Song {
    return new Song(info)
  }
}
