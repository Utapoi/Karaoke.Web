import { EmptyLocalizedFileInterface, type LocalizedFileInterface } from '~/Core/Models/LocalizedFile'
import type { LocalizedStringInterface } from '~/Core/Models/LocalizedString'

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

  public static async FromInfoAsync(form: any): Promise<CreateSongRequestInterface> {
    const request = CreateSongRequest.Empty()

    request.Titles = form.titles
    request.ReleaseDate = new Date(form.releaseDate.year, form.releaseDate.month, form.releaseDate.day)
    request.Singers = form.singers // [string] of Ids
    request.Albums = form.albums
    request.Tags = form.tags

    request.ThumbnailFile = {
      File: await ToBase64(form.thumbnailFiles[0].file as File),
      FileType: form.thumbnailFiles[0].file.type ?? 'image/png',
      Language: '', // We don't need language for thumbnail
      FileName: form.thumbnailFiles[0].file.name,
    }

    request.PreviewFile = {
      File: await ToBase64(form.previewFiles[0].file as File),
      FileType: form.previewFiles[0].file.type ?? 'audio/ogg',
      Language: '', // We don't need language for preview
      FileName: form.previewFiles[0].file.name,
    }

    request.VoiceFile = {
      File: await ToBase64(form.voiceFiles[0].file as File),
      FileType: form.voiceFiles[0].file.type ?? 'audio/ogg',
      Language: '', // We don't need language for voice
      FileName: form.voiceFiles[0].file.name,
    }

    request.InstrumentalFile = {
      File: await ToBase64(form.instrumentalFiles[0].file as File),
      FileType: form.instrumentalFiles[0].file.type ?? 'audio/ogg',
      Language: '',
      FileName: form.instrumentalFiles[0].file.name,
    }

    request.LyricsFiles = (await Promise.allSettled(form.lyricsFiles.map(async (f: any) => {
      return {
        File: await ToBase64(f.files[0].file as File),
        FileType: f.files[0].type ?? 'text/txt',
        Language: f.language,
        FileName: f.files[0].name,
      }
    }))).map((e: any) => e.value as LocalizedFileInterface)

    request.KaraokeFiles = (await Promise.allSettled(form.karaokeFiles.map(async (f: any) => {
      return {
        File: await ToBase64(f.files[0].file as File),
        FileType: f.files[0].type ?? 'subtitles/ass',
        Language: f.language,
        FileName: f.files[0].name,
      }
    }))).map((e: any) => e.value as LocalizedFileInterface)

    return request
  }
}
