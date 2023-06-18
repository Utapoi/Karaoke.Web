import { Song } from '~/core/Models/Song'
import type { CreateSongRequest } from '~/core/Requests/Songs/CreateSongRequest'

/**
 * Provides a service for managing songs.
 * @returns The songs service.
 */
export function useSongsService() {
  const Client = useHttpClient()

  /**
   * Create a new song.
   * @param request The request to create a song.
   * @returns The created song.
   */
  async function CreateAsync(request: CreateSongRequest): Promise<Song | undefined> {
    const response = await Client.Post<Song>('/Songs', {}, {
      ...request,
    })

    if (response === undefined)
      return undefined

    return Song.FromResponse(response)
  }

  return {
    CreateAsync,
  }
}
