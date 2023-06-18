import type { AlbumInterface } from '~/core/Models/Album'
import { Album } from '~/core/Models/Album'
import type { CreateAlbumRequest } from '~/core/Requests/Albums/CreateAlbumRequest'
import type { GetAlbumsResponse } from '~/core/Responses/Albums/GetAlbumsResponse'

/**
 * Provides a service for managing albums.
 * @returns The albums service.
 */
export function useAlbumsService() {
  const Client = useHttpClient()

  /**
   * Create a new album.
   * @param request The request to create an album.
   * @returns The created album.
   */
  async function CreateAsync(request: CreateAlbumRequest): Promise<Album | undefined> {
    const response = await Client.Post<AlbumInterface>('/Albums', {}, {
      ...request,
    })

    if (response === undefined)
      return undefined

    return Album.FromResponse(response)
  }

  /**
   * Get a paginated list of albums.
   * @param skip The number of items to skip.
   * @param take The number of items to take.
   * @returns A list of albums.
   */
  async function GetAlbumsAsync(skip = 0, take = 10): Promise<Album[]> {
    const response = await Client.Get<GetAlbumsResponse>(`/Albums?skip=${skip}&take=${take}`)

    if (response === undefined)
      return []

    return response.Items.map(album => Album.FromResponse(album))
  }

  /**
   * Search for albums.
   * @param query The query to search for.
   * @returns A list of albums.
   */
  async function SearchAsync(query: string): Promise<Album[]> {
    const response = await Client.Post<Album[]>(`/Albums/Search?input=${query}`)

    if (response === undefined)
      return []

    return response.map(album => Album.FromResponse(album))
  }

  return {
    CreateAsync,
    GetAlbumsAsync,
    SearchAsync,
  }
}