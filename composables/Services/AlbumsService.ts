import type { AlbumInterface } from '~/core/Models/Album'
import { Album } from '~/core/Models/Album'
import type { GetAlbumsResponse } from '~/core/Responses/Albums/GetAlbumsResponse'

export function useAlbumsService() {
  const Client = useHttpClient()

  async function GetAlbumsAsync(skip = 0, take = 10): Promise<Album[]> {
    const response = await Client.Get<GetAlbumsResponse>(`/Albums?skip=${skip}&take=${take}`)

    if (response === undefined)
      return []

    return response.Items.map(album => Album.FromResponse(album))
  }

  async function CreateAsync(album: AlbumInterface): Promise<Album> {
    const response = await Client.Post<AlbumInterface>('/Albums', {}, album)

    if (response === undefined)
      return Album.Empty()

    return Album.FromResponse(response)
  }

  return {
    GetAlbumsAsync,
    CreateAsync,
  }
}
