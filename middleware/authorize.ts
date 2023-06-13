import { nanoid } from 'nanoid'
import { useAuthStore } from '~/composables/stores/AuthStore'

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

  const RuntimeConfig = useRuntimeConfig()

  const fetchOptions: any = {
    method: 'POST',
    headers: {},
    credentials: undefined,
    key: nanoid(), // Pas de mise en cache pour cette requête.
  }

  if (process.env.NODE_ENV === 'development') {
    fetchOptions.headers = {
      Authorization: `Bearer ${Auth.Token}`,
    }
  }
  else {
    fetchOptions.credentials = 'include'
  }

  const { data, error } = await useFetch(`${RuntimeConfig.public.API_URL}/Auth/Verify/${info.Role}`, {
    method: fetchOptions.method,
    headers: fetchOptions.headers,
    credentials: fetchOptions.credentials,
    key: fetchOptions.key,
  })

  if (error.value?.statusCode === null && data.value !== null)
    return abortNavigation()
})
