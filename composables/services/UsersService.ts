import type { User } from '~/core/models/User'

export function useUsersService() {
  const HttpClient = useHttpClient()

  async function GetCurrentUser(): Promise<User | undefined> {
    const u = await HttpClient.Get<User>('/Users/me')

    return u
  }

  return {
    GetCurrentUser,
  }
}
