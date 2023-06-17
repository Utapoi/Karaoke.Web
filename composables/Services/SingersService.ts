import { Singer } from '~/core/Models/Singer'
import type { GetSingersResponse } from '~/core/Responses/Singers/GetSingersResponse'

export function useSingersService() {
  const Client = useHttpClient()

  /**
   * Get a paginated list of singers.
   * @param skip The number of items to skip.
   * @param take The number of items to take.
   * @returns A list of singers.
   */
  async function GetSingersAsync(skip = 0, take = 10): Promise<Singer[]> {
    const response = await Client.Get<GetSingersResponse>(`/singers?skip=${skip}&take=${take}`)

    if (response === undefined)
      return []

    return response.Items.map(singer => Singer.FromResponse(singer))
  }

  /**
   * Search for singers.
   * @param query The query to search for.
   * @returns A list of singers.
   */
  async function SearchAsync(query: string): Promise<Singer[]> {
    const response = await Client.Post<Singer[]>(`/Singers/Search?input=${query}`)

    if (response === undefined)
      return []

    return response.map(singer => Singer.FromResponse(singer))
  }

  return {
    GetSingersAsync,
    SearchAsync,
  }
}
