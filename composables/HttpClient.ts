import { nanoid } from 'nanoid'
import { useAuthStore } from './stores/AuthStore'

export function useHttpClient() {
  const RuntimeConfig = useRuntimeConfig()

  // TODO: Maybe create a utility method to check for production/development.

  function TryFetch(url: string,
    method: 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace',
    headers: HeadersInit,
    body: any,
  ) {
    if (body === undefined) {
      return useFetch(`${RuntimeConfig.public.API_URL}${url}`, {
        method,
        headers,
        credentials: 'include',
        key: nanoid(), // No cache for this request.
      })
    }

    return useFetch(`${RuntimeConfig.public.API_URL}${url}`, {
      method,
      headers,
      credentials: 'include',
      body,
      key: nanoid(), // No cache for this request.
    })
  }

  async function TryRefreshToken() {
    // TODO:  Call /Auth/RefreshToken and update stored token if necessary.
  }

  async function Get<T>(url: string, headers: HeadersInit | undefined = undefined) {
    const Auth = useAuthStore()

    if (headers === undefined && process.env.NODE_ENV === 'development') {
      headers = {
        Authorization: `Bearer ${Auth.State!.Token}`,
      }
    }
    else if (headers !== undefined && process.env.NODE_ENV === 'development') {
      headers = {
        ...headers,
        Authorization: `Bearer ${Auth.State!.Token}`,
      }
    }

    if (headers === undefined)
      headers = {}

    const { data: r0, error: e0 } = await TryFetch(url, 'GET', headers, undefined)

    if (e0.value === undefined || e0.value === null)
      return r0.value as T

    if (e0.value.status !== 401)
      return undefined

    await TryRefreshToken()

    const { data: r1, error: e1 } = await TryFetch(url, 'GET', headers, undefined)

    if (e1.value === undefined || e1.value === null)
      return undefined

    return r1.value as T
  }

  async function Post<T>(url: string, headers: HeadersInit | undefined = undefined, body: any = undefined): Promise<T | undefined> {
    const Auth = useAuthStore()

    if (headers === undefined && process.env.NODE_ENV === 'development') {
      headers = {
        Authorization: `Bearer ${Auth.State!.Token}`,
      }
    }
    else if (headers !== undefined && process.env.NODE_ENV === 'development') {
      headers = {
        ...headers,
        Authorization: `Bearer ${Auth.State!.Token}`,
      }
    }

    if (headers === undefined)
      headers = {}

    if (body === undefined)
      body = ''

    const { data: r0, error: e0 } = await TryFetch(url, 'GET', headers, body)

    if (e0.value === undefined || e0.value === null)
      return r0.value as T

    if (e0.value.status !== 401)
      return undefined

    await TryRefreshToken()

    const { data: r1, error: e1 } = await TryFetch(url, 'GET', headers, body)

    if (e1.value === undefined || e1.value === null)
      return undefined

    return r1.value as T
  }

  return {
    Get,
    Post,
  }
}
