import { nanoid } from 'nanoid'
import { useAuthStore } from './stores/AuthStore'

export function useHttpClient() {
  const RuntimeConfig = useRuntimeConfig()

  async function TryRefreshToken() {
    if (process.env.NODE_ENV === 'development') {
      await useFetch(`${RuntimeConfig.public.API_URL}/Auth/RefreshToken`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${useAuthStore().Token}`,
        },
        credentials: 'include',
        key: nanoid(), // No cache for this request.
      })
    }
    else {
    // Should update cookies automatically.
      await useFetch(`${RuntimeConfig.public.API_URL}/Auth/RefreshToken`, {
        method: 'POST',
        credentials: 'include',
        key: nanoid(), // No cache for this request.
      })
    }
  }

  async function Get<T>(url: string, headers: HeadersInit | undefined = undefined) {
    if (headers === undefined)
      headers = {}

    if (process.env.NODE_ENV === 'development') {
      headers = {
        ...headers,
        Authorization: `Bearer ${useAuthStore().Token}`,
      }
    }

    const { data: r0, error: e0 } = await useFetch(`${RuntimeConfig.public.API_URL}${url}`, {
      method: 'GET',
      headers,
      credentials: 'include',
      key: nanoid(), // No cache for this request.
    })

    if (e0.value === undefined || e0.value === null)
      return r0.value as T

    if (e0.value.statusCode !== 401)
      return undefined

    await TryRefreshToken()

    const { data: r1, error: e1 } = await useFetch(`${RuntimeConfig.public.API_URL}${url}`, {
      method: 'GET',
      headers,
      credentials: 'include',
      key: nanoid(), // No cache for this request.
    })

    if (e1.value === undefined || e1.value === null)
      return undefined

    return r1.value as T
  }

  async function Post<T>(url: string, headers: HeadersInit | undefined = undefined, body: any = undefined): Promise<T | undefined> {
    if (headers === undefined)
      headers = {}

    if (process.env.NODE_ENV === 'development') {
      headers = {
        ...headers,
        Authorization: `Bearer ${useAuthStore().Token}`,
      }
    }

    if (body === undefined)
      body = {}

    const { data: r0, error: e0 } = await useFetch(`${RuntimeConfig.public.API_URL}${url}`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body,
      key: nanoid(), // No cache for this request.
    })

    if (e0.value === undefined || e0.value === null)
      return r0.value as T

    if (e0.value.status !== 401)
      return undefined

    await TryRefreshToken()

    const { data: r1, error: e1 } = await useFetch(`${RuntimeConfig.public.API_URL}${url}`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body,
      key: nanoid(), // No cache for this request.
    })

    if (e1.value === undefined || e1.value === null)
      return undefined

    return r1.value as T
  }

  return {
    Get,
    Post,
  }
}
