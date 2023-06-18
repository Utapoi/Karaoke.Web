import { useAuthStore } from '~/Composables/stores/AuthStore'

interface AuthMiddlewareOptions {
  Role: string | null
  GuestOnly?: boolean
  AuthenticatedRedirectionUrl?: string | null
}

export default defineNuxtRouteMiddleware(async (to) => {
  const info = to.meta.AuthMiddlewareOptions as AuthMiddlewareOptions

  if (info === undefined || info === null)
    return abortNavigation()

  const Auth = useAuthStore()

  if (info.GuestOnly === true && Auth.IsConnected) {
    return info.AuthenticatedRedirectionUrl
      ? navigateTo(info.AuthenticatedRedirectionUrl)
      : abortNavigation()
  }
  else if (info.GuestOnly === true && !Auth.IsConnected) {
    return // Autorise l'accès à la route car il s'agit d'une route accessible uniquement aux invités.
  }

  if (!Auth.IsConnected)
    return navigateTo('/auth/login')

  if (info.Role === null)
    info.Role = 'User'

  const response = await useHttpClient().Post(`/Auth/Verify/${info.Role}`)

  if (response === undefined)
    return abortNavigation()
})
