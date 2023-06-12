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

  // State
  // This is only used during local development.
  // We cannot send http-only cookies on localhost.
  const State = useCookie<AuthState | null>('AuthToken', {
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
  function GoogleLogin() {
    window.open(`${RuntimeConfig.public.API_URL}/Auth/Google/Authorize`, '_self')
  }

  function IsInRole(role: string): boolean {
    if (CurrentUser.value === null)
      return false

    return CurrentUser.value.Roles.includes(role)
  }

  /**
   * Called when the user has successfully logged in.
   * @param user The user that has logged in.
   */
  function OnLoginSuccess(user: User) {
    CurrentUser.value = user
  }

  /**
   * Clears the cookies.
   */
  function Clear() {
    State.value = null // Should do nothing in prod.
    CurrentUser.value = null
  }

  return {
    State,
    CurrentUser,
    IsConnected,
    GoogleLogin,
    IsInRole,
    OnLoginSuccess,
    Clear,
  }
})
