export interface LocalizedStringInterface {
  Id: string
  Text: string
  Language: string
}

export class LocalizedString {
  Id: string
  Text: string
  Language: string

  constructor(localizedString: LocalizedStringInterface) {
    this.Id = localizedString.Id
    this.Text = localizedString.Text
    this.Language = localizedString.Language
  }

  public static FromResponse(info: LocalizedStringInterface): LocalizedString {
    return new LocalizedString(info)
  }
}
