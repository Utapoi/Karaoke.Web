import { defineStore } from 'pinia'
import type { User } from '~/core/models/User'

export const useAuthStore = defineStore('auth-store', () => {
  // Utils
  const RuntimeConfig = useRuntimeConfig()
  const HttpClient = useHttpClient()

  // Cookies
  // Note(Mikyan): Move to local storage?
  const CurrentUser = useCookie<User | null>('current-user', {
    sameSite: 'strict',
    default: () => null,
  })

  const IsConnected = computed(() => CurrentUser.value !== null)

  /**
   * Starts the Google OAuth2 login process.
   */
  function GoogleLogin(): void {
    window.open(`${RuntimeConfig.public.API_URL}/Auth/Google/Authorize`, '_self')
  }

  /**
   * Checks if the current user is in the specified role.
   * @param role The role to check.
   * @returns True if the user is in the specified role, false otherwise.
   */
  function IsInRole(role: string): boolean {
    if (CurrentUser.value === null)
      return false

    return CurrentUser.value.Roles.includes(role)
  }

  /**
   * Sets the current user.
   * @param user The user that has logged in.
   */
  function SetCurrentUser(user: User): void {
    CurrentUser.value = user
  }

  /**
   * Gets the current user.
   * @returns The current user.
   */
  function GetCurrentUser(): User | null {
    return CurrentUser.value
  }

  /**
   * Clears the cookies.
   */
  function Clear(): void {
    CurrentUser.value = null
  }

  /**
   *  Tries to refresh the token.
   * @returns Nothing, we don't care about the result.
   */
  async function TryRefreshToken() {
    if (!IsConnected.value)
      return

    await HttpClient.Post('/Auth/RefreshToken')
  }

  return {
    CurrentUser,
    IsConnected,
    GoogleLogin,
    IsInRole,
    SetCurrentUser,
    GetCurrentUser,
    Clear,
    TryRefreshToken,
  }
})
