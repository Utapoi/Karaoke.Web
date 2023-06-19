import { createFetch } from '@vueuse/core'
import { useAuthStore } from '~/Composables/Stores/AuthStore'

export function useHttpClient() {
  const RuntimeConfig = useRuntimeConfig()
  const Auth = useAuthStore()

  const ApiFetcher = createFetch({
    baseUrl: RuntimeConfig.public.API_URL,
    fetchOptions: {
      credentials: 'include',
      cache: 'no-cache',
    },
    options: {
      async onFetchError(ctx) {
        if (ctx.response?.status === 401) {
          await Auth.TryRefreshToken()
          ctx.data = null
        }

        return ctx
      },
    },

  })

  async function Get<T>(url: string, options?: RequestInit): Promise<T | undefined> {
    if (options === undefined)
      options = {}

    options.credentials = 'include'

    const { data: r0 } = await ApiFetcher(url, options)
      .get()
      .json<T>()

    if (r0.value !== null)
      return r0.value

    const { data: r1 } = await ApiFetcher(url, options)
      .get()
      .json<T>()

    if (r1.value === null)
      return undefined

    return r1.value
  }

  async function Post<T>(url: string, options?: RequestInit, body: any = undefined): Promise<T | undefined> {
    if (options === undefined)
      options = {}

    options.credentials = 'include'

    if (body === undefined)
      body = {}

    const { data: r0 } = await ApiFetcher(url, options).post(body).json()

    if (r0.value !== null)
      return r0.value as T

    const { data: r1 } = await ApiFetcher(url, options).post(body).json()

    if (r1.value === null)
      return undefined

    return r1.value as T
  }

  async function Patch<T>(url: string, options?: RequestInit, body: any = undefined): Promise<T | undefined> {
    if (options === undefined)
      options = {}

    options.credentials = 'include'

    if (body === undefined)
      body = {}

    const { data: r0 } = await ApiFetcher(url, options).patch(body)

    if (r0.value !== null)
      return r0.value as T

    const { data: r1 } = await ApiFetcher(url, options).patch(body)

    if (r1.value === null)
      return undefined

    return r1.value as T
  }

  return {
    Get,
    Post,
    Patch,
  }
}
