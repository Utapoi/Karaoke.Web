import { acceptHMRUpdate, defineStore } from 'pinia'
import { StorageSerializers, useLocalStorage, useStorage } from '@vueuse/core'
import type { User } from '~/api/models/User'
import type { GetCurrentUserResponse } from '~/api/responses/GetCurrentUserResponse'

export enum TokenSource {
  None = 0,
  Google = 1,
  Discord = 2,
}

export interface GetTokenResponse {
  token: string
  refreshToken: string
  tokenExpiryTime: Date
  refreshTokenExpiryTime: Date
  tokenSource: TokenSource
}

/**
 * The user store.
 * Used to manage the state of the current user.
 */
export const useUserStore = defineStore('user-store', () => {
  // Utils
  const RuntimeConfig = useRuntimeConfig()

  // Refs
  const WindowHandle = ref<Window | null>(null)

  // Variables
  const CurrentUser = useStorage<User | null>('current-user', null, localStorage, {
    serializer: StorageSerializers.object,
  })
  const Token = useLocalStorage<string | undefined>('token', undefined)
  const RefreshToken = useLocalStorage<string | undefined>('refresh-token', undefined)
  const TokenExpiryTime = useLocalStorage<Date | undefined>('token-expiry-time', undefined)
  const RefreshTokenExpiryTime = useLocalStorage<Date | undefined>('refresh-token-expiry-time', undefined)
  const TokenProviderSource = useLocalStorage<TokenSource>('token-source', TokenSource.None)

  /**
   * Starts the Google OAuth2 login process.
   */
  async function GoogleLogin() {
    ClearCookies()
    WindowHandle.value = window.open(`${RuntimeConfig.public.API_URL}/Auth/Google/Authorize`, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
  }

  /**
   * Starts the Discord OAuth2 login process.
   */
  async function DiscordLogin() {
    // TODO: Get OAuth2 URL from API.
    // TODO: Open URL in new tab.
  }

  /**
   * Logs out the current user.
   */
  function LogOut() {
    ClearCookies()
  }

  /**
   * Gets the current connected user.
   * @returns A promise that resolves when the user is fetched.
   */
  async function GetUser(): Promise<void> {
    if (Token.value === undefined || Token.value === null || Token.value === '')
      return

    const { data: response } = await useFetch<GetCurrentUserResponse>(`${RuntimeConfig.public.API_URL}/Users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token.value}`,
      },
    })

    if (response.value === undefined || response.value === null)
      return

    CurrentUser.value = response.value.user
  }

  async function GetRefreshToken(): Promise<void> {
    if (RefreshToken.value === undefined || RefreshToken.value === null || RefreshToken.value === '')
      return

    const { data: response } = await useFetch<GetTokenResponse>(`${RuntimeConfig.public.API_URL}/Auth/RefreshToken`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify({
        token: Token.value,
        refreshToken: RefreshToken.value,
      }),
    })

    if (response.value === undefined || response.value === null)
      return

    OnLoginSuccess(response.value)
  }

  /**
   * Called when the login is successful.
   * @param info An object containing the token, the refresh token and the refresh token expiry time.
   */
  function OnLoginSuccess(info: GetTokenResponse): void {
    Token.value = info.token
    RefreshToken.value = info.refreshToken
    TokenExpiryTime.value = info.tokenExpiryTime
    RefreshTokenExpiryTime.value = info.refreshTokenExpiryTime
    TokenProviderSource.value = info.tokenSource
  }

  /**
   * Checks whether the current user is connected.
   * @returns Whether the user is connected or not.
   */
  function IsConnected(): boolean {
    return Token.value !== undefined && Token.value !== null
      && Token.value !== '' && RefreshToken.value !== undefined
      && RefreshToken.value !== null && RefreshToken.value !== ''
      && TokenExpiryTime.value !== undefined && TokenExpiryTime.value !== null
      && RefreshTokenExpiryTime.value !== undefined && RefreshTokenExpiryTime.value !== null
  }

  /**
   * Checks whether the current user is in the specified role.
   * @param role  The role to check.
   * @returns Whether the user is in the specified role or not.
   */
  function IsInRole(role: string): boolean {
    if (!IsConnected() || CurrentUser.value === undefined || CurrentUser.value === null)
      return false

    return CurrentUser.value?.roles?.includes(role) ?? false
  }

  /**
   * Clears the cookies.
   */
  function ClearCookies(): void {
    Token.value = undefined
    RefreshToken.value = undefined
    TokenExpiryTime.value = undefined
    RefreshTokenExpiryTime.value = undefined
    TokenProviderSource.value = TokenSource.None
    CurrentUser.value = null
  }

  watch(CurrentUser, async (v) => {
    if (v !== null)
      return

    if (!IsConnected())
      return

    await GetUser()
  })

  return {
    CurrentUser,
    Token,
    RefreshToken,
    TokenExpiryTime,
    RefreshTokenExpiryTime,
    GoogleLogin,
    DiscordLogin,
    LogOut,
    GetRefreshToken,
    OnLoginSuccess,
    IsConnected,
    IsInRole,
    GetUser,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
