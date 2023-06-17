import { EmptyLocalizedFileInterface, type LocalizedFileInterface } from '~/core/Models/LocalizedFile'
import type { LocalizedStringInterface } from '~/core/Models/LocalizedString'

export interface CreateSongRequestInterface {
  Titles: LocalizedStringInterface[]
  ReleaseDate: Date
  Singers: string[]
  Albums: string[]
  Tags: string[]
  ThumbnailFile: LocalizedFileInterface
  PreviewFile: LocalizedFileInterface
  VoiceFile: LocalizedFileInterface
  InstrumentalFile: LocalizedFileInterface
  LyricsFiles: LocalizedFileInterface[]
  KaraokeFiles: LocalizedFileInterface[]
}

export class CreateSongRequest implements CreateSongRequestInterface {
  Titles: LocalizedStringInterface[]
  ReleaseDate: Date
  Singers: string[]
  Albums: string[]
  Tags: string[]
  ThumbnailFile: LocalizedFileInterface
  PreviewFile: LocalizedFileInterface
  VoiceFile: LocalizedFileInterface
  InstrumentalFile: LocalizedFileInterface
  LyricsFiles: LocalizedFileInterface[]
  KaraokeFiles: LocalizedFileInterface[]

  constructor(request: CreateSongRequestInterface) {
    this.Titles = request.Titles
    this.ReleaseDate = request.ReleaseDate
    this.Singers = request.Singers
    this.Albums = request.Albums
    this.Tags = request.Tags
    this.ThumbnailFile = request.ThumbnailFile
    this.PreviewFile = request.PreviewFile
    this.VoiceFile = request.VoiceFile
    this.InstrumentalFile = request.InstrumentalFile
    this.LyricsFiles = request.LyricsFiles
    this.KaraokeFiles = request.KaraokeFiles
  }

  public static Empty(): CreateSongRequest {
    return new CreateSongRequest({
      Titles: [],
      ReleaseDate: new Date(),
      Singers: [],
      Albums: [],
      Tags: [],
      ThumbnailFile: EmptyLocalizedFileInterface,
      PreviewFile: EmptyLocalizedFileInterface,
      VoiceFile: EmptyLocalizedFileInterface,
      InstrumentalFile: EmptyLocalizedFileInterface,
      LyricsFiles: [],
      KaraokeFiles: [],
    })
  }

  public static async FromInfo(form: any): Promise<CreateSongRequestInterface> {
    const request = CreateSongRequest.Empty()

    request.Titles = form.titles
    request.ReleaseDate = new Date(form.releaseDate.year, form.releaseDate.month, form.releaseDate.day)
    request.Singers = form.singers // [string] of Ids
    request.Albums = form.albums
    request.Tags = form.tags

    request.ThumbnailFile = {
      File: await ToBase64(form.thumbnailFile.files[0]),
      FileType: form.thumbnailFile.files[0].type ?? 'image/png',
      Language: form.thumbnailFile.language,
      FileName: form.thumbnailFile.files[0].name,
    }

    request.PreviewFile = {
      File: await ToBase64(form.previewFile.files[0]),
      FileType: form.previewFile.files[0].type ?? 'audio/ogg',
      Language: form.previewFile.language,
      FileName: form.previewFile.files[0].name,
    }

    request.VoiceFile = {
      File: await ToBase64(form.voiceFile.files[0]),
      FileType: form.voiceFile.files[0].type ?? 'audio/ogg',
      Language: form.voiceFile.language,
      FileName: form.voiceFile.files[0].name,
    }

    request.InstrumentalFile = {
      File: await ToBase64(form.instrumentalFile.files[0]),
      FileType: form.instrumentalFile.files[0].type ?? 'audio/ogg',
      Language: form.instrumentalFile.language,
      FileName: form.instrumentalFile.files[0].name,
    }

    // Note(Mikyan): We may need to do something more robust here.
    // AutoMapper for TS...?
    request.LyricsFiles = (await Promise.allSettled(form.lyricsFiles.map(async (f: any) => {
      return {
        File: await ToBase64(f.Files[0]),
        FileType: f.files[0].type ?? 'text/txt',
        Language: f.language,
        FileName: f.liles[0].name,
      }
    }))).map((e: any) => e.value as LocalizedFileInterface)

    request.KaraokeFiles = (await Promise.allSettled(form.karaokeFiles.map(async (f: any) => {
      return {
        File: await ToBase64(f.files[0]),
        FileType: f.files[0].type ?? 'text/txt',
        Language: f.language,
        FileName: f.files[0].name,
      }
    }))).map((e: any) => e.value as LocalizedFileInterface)

    return request
  }
}
