import { Singer } from '~/core/models/Singer'
import type { GetSingersResponse } from '~/core/responses/singers/GetSingersResponse'

export function SingersService() {
  const Client = useHttpClient()

  async function GetSingers(skip = 0, take = 10): Promise<Singer[]> {
    // TODO: Dynamic skip and take
    const response = await Client.Get<GetSingersResponse>(`/singers?skip=${skip}&take=${take}`)

    if (response === undefined)
      return []

    return response.Items.map(singer => Singer.FromResponse(singer))
  }

  return {
    GetSingers,
  }
}
