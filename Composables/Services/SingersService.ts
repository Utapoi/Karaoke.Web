import { Singer } from '~/Core/Models/Singer'
import type { CreateSingerRequest } from '~/Core/Requests/Singers/CreateSingerRequest'
import type { GetSingersResponse } from '~/Core/Responses/Singers/GetSingersResponse'

/**
 * Provides a service for managing singers.
 * @returns The singers service.
 */
export function useSingersService() {
  const Client = useHttpClient()

  /**
   * Create a new singer.
   * @param request The request to create a singer.
   * @returns The created singer.
   */
  async function CreateAsync(request: CreateSingerRequest): Promise<Singer | undefined> {
    const response = await Client.Post<Singer>('/Singers', {}, {
      ...request,
    })

    if (response === undefined)
      return undefined

    return Singer.FromResponse(response)
  }

  /**
   * Get a singer by id.
   * @param id The id of the singer.
   * @returns The singer.
   */
  async function GetAsync(id: string): Promise<Singer | undefined> {
    const response = await Client.Get<Singer>(`/Singers/${id}`)

    if (response === undefined)
      return undefined

    return Singer.FromResponse(response)
  }

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
    CreateAsync,
    GetAsync,
    GetSingersAsync,
    SearchAsync,
  }
}
