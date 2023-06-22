import type { CreateFileInfo } from '~/Core/Forms/CreateFileInfo'
import type { CreateSongInfo } from '~/Core/Forms/CreateSongInfo'
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

  public static async FromInfoAsync(form: CreateSongInfo): Promise<CreateSongRequestInterface> {
    const request = CreateSongRequest.Empty()

    request.Titles = form.Titles
    request.ReleaseDate = form.ReleaseDate ?? new Date()
    request.Singers = form.Singers // [string] of Ids
    request.Albums = form.Albums
    request.Tags = form.Tags

    // Note(Mikyan): This will never be null at this point.
    request.ThumbnailFile = {
      File: await ToBase64(form.ThumbnailFile.File as File),
      FileType: form.ThumbnailFile.File!.type ?? 'image/png',
      Language: '', // We don't need language for thumbnail
      FileName: form.ThumbnailFile.File!.name,
    }

    // Note(Mikyan): This will never be null at this point.
    request.PreviewFile = {
      File: await ToBase64(form.PreviewFile.File as File),
      FileType: form.PreviewFile.File!.type ?? 'audio/ogg',
      Language: '', // We don't need language for preview
      FileName: form.PreviewFile.File!.name,
    }

    // Note(Mikyan): This will never be null at this point.
    request.VoiceFile = {
      File: await ToBase64(form.VoiceFile.File as File),
      FileType: form.VoiceFile.File!.type ?? 'audio/ogg',
      Language: '', // We don't need language for voice
      FileName: form.VoiceFile.File!.name,
    }

    // Note(Mikyan): This will never be null at this point.
    request.InstrumentalFile = {
      File: await ToBase64(form.InstrumentalFile.File as File),
      FileType: form.InstrumentalFile.File!.type ?? 'audio/ogg',
      Language: '',
      FileName: form.InstrumentalFile.File!.name,
    }

    // Note(Mikyan): This will never be null at this point.
    request.LyricsFiles = (await Promise.allSettled(form.LyricsFiles.map(async (f: CreateFileInfo) => {
      return {
        File: await ToBase64(f.File as File),
        FileType: f.File!.type ?? 'text/plain',
        Language: f.Language,
        FileName: f.File!.name,
      }
    }))).map((e: any) => e.value as LocalizedFileInterface)

    // Note(Mikyan): This will never be null at this point.
    request.KaraokeFiles = (await Promise.allSettled(form.KaraokeFiles.map(async (f: CreateFileInfo) => {
      return {
        File: await ToBase64(f.File as File),
        FileType: f.File!.type ?? 'subtitles/ass',
        Language: f.Language,
        FileName: f.File!.name,
      }
    }))).map((e: any) => e.value as LocalizedFileInterface)

    return request
  }
}
