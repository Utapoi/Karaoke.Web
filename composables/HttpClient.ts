import type { FetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'

const Fetcher = ofetch.create({
  async onRequest({ options }) {
    const UserStore = useUserStore()

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${UserStore.Token}`,
    }
  },
  async onResponse({ response }) {
    if (response.status === 401) {
      const UserStore = useUserStore()
      await UserStore.GetRefreshToken()
    }
  },
})

export function useHttpClient() {
  const RuntimeConfig = useRuntimeConfig()

  async function Get<T>(url: string, options?: FetchOptions | undefined): Promise<T | undefined> {
    if (options === undefined)
      options = {}

    options.method = 'GET'

    try {
      const { _data: response } = await Fetcher.raw(`${RuntimeConfig.public.API_URL}${url}`, options)

      return response as T
    }
    catch (error: any) {
      if (error.response?.status === 401) {
        const { _data: response } = await Fetcher.raw(`${RuntimeConfig.public.API_URL}${url}`, options)
        return response as T
      }

      return error.response._data as T
    }
  }

  async function Post<T>(url: string, options?: FetchOptions | undefined): Promise<T | undefined> {
    if (options === undefined)
      options = {}

    options.method = 'POST'

    try {
      const { _data: response } = await Fetcher.raw(`${RuntimeConfig.public.API_URL}${url}`, options)

      return response as T
    }
    catch (error: any) {
      if (error.response?.status === 401) {
        const { _data: response } = await Fetcher.raw(`${RuntimeConfig.public.API_URL}${url}`, options)
        return response as T
      }

      return error.response._data as T
    }
  }

  return {
    Get,
    Post,
  }
}
