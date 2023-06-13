import { defineStore } from 'pinia'
import type { User } from '~/core/models/User'

export enum TokenSource {
  None = 0,
  Google = 1,
  Discord = 2,
}

export interface AuthState {
  Token: string | null
  RefreshToken: string | null
  TokenExpiryTime: Date | null
  RefreshTokenExpiryTime: Date | null
  TokenSource: TokenSource
}

export const useAuthStore = defineStore('auth-store', () => {
  // Utils
  const RuntimeConfig = useRuntimeConfig()

  // Computed
  const IsProduction = computed(() => process.env.NODE_ENV === 'production')

  // Cookies
  const Token = useCookie<string | null>('Karaoke-Token', {
    httpOnly: IsProduction.value,
    sameSite: IsProduction.value ? 'strict' : 'lax',
    secure: IsProduction.value,
  })

  const RefreshToken = useCookie<string | null>('Karaoke-RefreshToken', {
    httpOnly: IsProduction.value,
    sameSite: IsProduction.value ? 'strict' : 'lax',
    secure: IsProduction.value,
  })

  const CurrentUser = useCookie<User | null>('current-user', {
    sameSite: IsProduction.value ? 'strict' : 'lax',
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
    Token.value = null
    RefreshToken.value = null
    CurrentUser.value = null
  }

  return {
    Token,
    RefreshToken,
    CurrentUser,
    IsConnected,
    GoogleLogin,
    IsInRole,
    SetCurrentUser,
    GetCurrentUser,
    Clear,
  }
})
