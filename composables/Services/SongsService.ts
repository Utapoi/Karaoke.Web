import type { CreateSongRequest } from '~/core/Requests/Songs/CreateSongRequest'

export function useSongsService() {
  const Client = useHttpClient()

  async function CreateAsync(request: CreateSongRequest) {

  }

  return {
    CreateAsync,
  }
}
