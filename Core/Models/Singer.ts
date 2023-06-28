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
  Descriptions: LocalizedString[]
  Activities: LocalizedString[]
  Birthday: string | null
  PopularSong: SongInterface | null
  ProfilePicture: string
  Albums: AlbumInterface[]
  Songs: SongInterface[]
  AlbumsCount: number
  SongsCount: number
}

export class Singer {
  Id = ''
  Names: LocalizedString[] = []
  Nicknames: LocalizedString[] = []
  Descriptions: LocalizedString[] = []
  Activities: LocalizedString[] = []
  Birthday: string | null = null
  PopularSong: Song | null = null
  ProfilePicture: string
  Albums: Album[] = []
  Songs: Song[] = []
  AlbumsCount = 0
  SongsCount = 0

  constructor(singer: SingerInterface) {
    this.Id = singer.Id
    this.Names = singer.Names?.map((name: LocalizedStringInterface) => LocalizedString.FromResponse(name))
    this.Nicknames = singer.Nicknames?.map((nickname: LocalizedStringInterface) => LocalizedString.FromResponse(nickname))
    this.Descriptions = singer.Descriptions?.map((description: LocalizedStringInterface) => LocalizedString.FromResponse(description))
    this.Activities = singer.Activities?.map((activity: LocalizedStringInterface) => LocalizedString.FromResponse(activity))
    this.Birthday = singer.Birthday
    this.PopularSong = singer.PopularSong ? Song.FromResponse(singer.PopularSong) : null
    this.ProfilePicture = singer.ProfilePicture
    this.Albums = singer.Albums?.map((album: AlbumInterface) => Album.FromResponse(album))
    this.Songs = singer.Songs?.map((song: SongInterface) => Song.FromResponse(song))
    this.AlbumsCount = singer.AlbumsCount
    this.SongsCount = singer.SongsCount
  }

  /**
   * Create a new empty instance of the Singer class used to avoid null checks since its shit in TS.
   * @returns An empty instance of the Singer class.
   */
  public static Empty(): Singer {
    return new Singer({
      Id: '',
      Names: [],
      Nicknames: [],
      Descriptions: [],
      Activities: [],
      Birthday: null,
      ProfilePicture: '',
      PopularSong: null,
      Albums: [],
      Songs: [],
      AlbumsCount: 0,
      SongsCount: 0,
    })
  }

  /**
   * Get the name of the singer in the specified language
   * @param language The language to get the name in.
   * @returns The name of the singer in the specified language.
   */
  public GetName(language = 'English'): string {
    const name = this.Names.find((name: LocalizedString) => name.Language === language)

    if (name !== undefined)
      return name.Text

    return this.Names[0]?.Text ?? ''
  }

  /**
   * Get the nicknames of the singer in the specified language
   * @param language The language to get the nicknames in.
   * @returns The nicknames of the singer in the specified language.
   */
  public GetNicknames(language = 'English'): string[] {
    const nicknames = this.Nicknames.filter(x => x.Language === language).map((nickname: LocalizedString) => nickname.Text)

    if (nicknames !== undefined)
      return nicknames

    return this.Nicknames.map(x => x.Text)
  }

  /**
   * Get the description of the singer in the specified language
   * @param language The language to get the description in.
   * @returns The description of the singer in the specified language.
  */
  public GetDescription(language = 'English'): string {
    const description = this.Descriptions.find((description: LocalizedString) => description.Language === language)

    if (description !== undefined)
      return description.Text

    return this.Descriptions[0]?.Text ?? ''
  }

  /**
   * Get the activities of the singer in the specified language
   * @param language The language to get the activities in.
   * @returns The activities of the singer in the specified language.
   */
  public GetActivities(language = 'English'): string[] {
    const activities = this.Activities.filter(x => x.Language === language).map((activity: LocalizedString) => activity.Text)

    if (activities !== undefined)
      return activities

    return this.Activities.map(x => x.Text)
  }

  /**
   * Get a random album cover from the singer.
   * @returns A random album cover from the singer.
   */
  public GetRandomAlbumCover(): string {
    const album = this.Albums[Math.floor(Math.random() * this.Albums.length)]

    return album.Cover
  }

  public HasActivities(): boolean {
    return this.Activities.length > 0
  }

  /**
   * Create a new instance of the Singer class from the response of the API.
   * @param info The response of the API.
   * @returns A new instance of the Singer class.
   */
  public static FromResponse(info: SingerInterface | null): Singer {
    if (info === null)
      return Singer.Empty()

    return new Singer(info)
  }
}
