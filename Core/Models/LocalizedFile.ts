export interface LocalizedFileInterface {
  File: string | ArrayBuffer | null
  Language: string
  FileType: string
  FileName: string
}

export const EmptyLocalizedFileInterface: LocalizedFileInterface = {
  File: null,
  Language: '',
  FileType: '',
  FileName: '',
}
