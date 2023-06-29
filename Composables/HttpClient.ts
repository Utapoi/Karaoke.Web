import { createFetch } from '@vueuse/core'
import { useAuthStore } from '~/Composables/Stores/AuthStore'

export function useHttpClient() {
  const RuntimeConfig = useRuntimeConfig()
  const Auth = useAuthStore()

  const ApiFetcher = createFetch({
    baseUrl: RuntimeConfig.public.API_URL,
    fetchOptions: {
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

  async function Delete(url: string, options?: RequestInit): Promise<void> {
    if (options === undefined)
      options = {}

    await ApiFetcher(url, options).delete()
  }

  async function Get<T>(url: string, options?: RequestInit): Promise<T | undefined> {
    if (options === undefined)
      options = {}

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

    if (body === undefined)
      body = {}

    const { data: r0 } = await ApiFetcher(url, options).post(body).json()

    if (r0.value !== null)
      return r0.value as T

    return undefined
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

    return undefined
  }

  return {
    Delete,
    Get,
    Post,
    Patch,
  }
}
