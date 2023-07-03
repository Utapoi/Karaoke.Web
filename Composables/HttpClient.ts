import { createFetch } from '@vueuse/core'

export function useHttpClient() {
  const RuntimeConfig = useRuntimeConfig()

  const ApiFetcher = createFetch({
    baseUrl: RuntimeConfig.public.API_URL,
  })

  async function Delete(url: string, options?: RequestInit): Promise<void> {
    if (options === undefined)
      options = {}

    await ApiFetcher(url, options).delete()
  }

  async function Get<T>(url: string, options?: RequestInit): Promise<T | undefined> {
    if (options === undefined)
      options = {}

    const { data: r } = await ApiFetcher(url, options)
      .get()
      .json<T>()

    if (r.value !== null)
      return r.value

    return undefined
  }

  async function Post<T>(url: string, options?: RequestInit, body: any = undefined): Promise<T | undefined> {
    if (options === undefined)
      options = {}

    if (body === undefined)
      body = {}

    const { data: r } = await ApiFetcher(url, options).post(body).json()

    if (r.value !== null)
      return r.value as T

    return undefined
  }

  async function Patch<T>(url: string, options?: RequestInit, body: any = undefined): Promise<T | undefined> {
    if (options === undefined)
      options = {}

    if (body === undefined)
      body = {}

    const { data: r } = await ApiFetcher(url, options).patch(body)

    if (r.value !== null)
      return r.value as T

    return undefined
  }

  return {
    Delete,
    Get,
    Post,
    Patch,
  }
}
