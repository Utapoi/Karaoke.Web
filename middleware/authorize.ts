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
    return info.AuthenticatedRedirectionUrl !== null
      ? navigateTo(info.AuthenticatedRedirectionUrl)
      : abortNavigation()
  }
  else if (info.GuestOnly === true && !Auth.IsConnected) {
    return // Allow access to the route since this is a guest only route.
  }

  // Redirect to the login page if the user is not connected.
  if (!Auth.IsConnected)
    return navigateTo('/auth/login')

  // Force the role to be User if it's not specified.
  if (info.Role === null)
    info.Role = 'User'

  const RuntimeConfig = useRuntimeConfig()

  // Note(Mikyan): I don't know if this really the best way to do this.
  if (process.env.NODE_ENV === 'development') {
    const { error } = await useFetch(`${RuntimeConfig.public.API_URL}/Auth/Verify/${info.Role}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Auth.State!.Token}`,
      },
      key: nanoid(), // No cache for this request.
    })

    if (error.value !== undefined && error.value !== null && error.value.statusCode !== 200)
      return abortNavigation()
  }
  else {
    const { error } = await useFetch(`${RuntimeConfig.public.API_URL}/Auth/Verify/${info.Role}`, {
      method: 'POST',
      credentials: 'include',
      key: nanoid(), // No cache for this request.
    })

    if (error.value !== undefined && error.value !== null && error.value.statusCode !== 200)
      return abortNavigation()
  }
})
