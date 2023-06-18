export interface LocalizedStringInterface {
  Text: string
  Language: string
}

export class LocalizedString {
  Text: string
  Language: string

  constructor(localizedString: LocalizedStringInterface) {
    this.Text = localizedString.Text
    this.Language = localizedString.Language
  }

  public static FromResponse(info: LocalizedStringInterface): LocalizedString {
    return new LocalizedString(info)
  }
}
