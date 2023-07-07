import { Album } from './Album'
import type { AlbumInterface } from './Album'
import { LocalizedString } from './LocalizedString'
import type { ILocalizedString } from './LocalizedString'
import { Singer } from './Singer'
import type { ISinger } from './Singer'
import { Tag } from './Tag'
import type { TagInterface } from './Tag'

export interface ISong {
  Id: string
  Titles: ILocalizedString[]
  Singers: ISinger[]
  Albums: AlbumInterface[]
  Duration: string
  ReleaseDate: Date
  Tags: TagInterface[]
  PreviewUrl: string
  OriginalUrl: string
  Cover: string
  Lyrics: LocalizedString[]
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
  OriginalUrl: string
  Cover: string
  Lyrics: LocalizedString[]

  constructor(song: ISong) {
    this.Id = song.Id.toLowerCase()
    this.Titles = song.Titles?.map((title: ILocalizedString) => LocalizedString.FromResponse(title))
    this.Singers = song.Singers?.map((singer: ISinger) => Singer.FromResponse(singer))
    this.Albums = song.Albums?.map((album: AlbumInterface) => Album.FromResponse(album))
    this.Duration = song.Duration
    this.ReleaseDate = song.ReleaseDate
    this.Tags = song.Tags?.map((tag: TagInterface) => Tag.FromResponse(tag))
    this.PreviewUrl = song.PreviewUrl
    this.OriginalUrl = song.OriginalUrl
    this.Cover = song.Cover
    this.Lyrics = song.Lyrics?.map((lyric: ILocalizedString) => LocalizedString.FromResponse(lyric))
  }

  public GetAlbum(): Album {
    return this.Albums[0] ?? Album.Empty()
  }

  public GetAlbums(): Album[] {
    return this.Albums
  }

  public GetCover(): string {
    return (this.Cover !== '' && this.Cover !== null) ? this.Cover : this.GetAlbum().Cover
  }

  public GetLyrics(language = 'English'): string {
    const lyrics = this.Lyrics?.find((lyric: LocalizedString) => lyric.Language === language)

    if (lyrics !== undefined)
      return lyrics.Text

    if (this.Lyrics === undefined)
      return ''

    return this.Lyrics[0]?.Text ?? ''
  }

  public GetTitle(language = 'English'): string {
    const title = this.Titles?.find((title: LocalizedString) => title.Language === language)

    if (title)
      return title.Text

    return this.Titles[0].Text
  }

  public GetSinger(): Singer {
    return this.Singers[0] ?? Singer.Empty()
  }

  public static FromResponse(info: ISong): Song {
    return new Song(info)
  }
}
