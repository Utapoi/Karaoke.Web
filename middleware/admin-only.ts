import { useFetch } from '@vueuse/core'

// TODO: API Request with Token to Validate the Admin Access.
export default defineNuxtRouteMiddleware(async () => {
  const UserStore = useUserStore()

  if (!UserStore.IsConnected())
    return navigateTo('/')

  const RuntimeConfig = useRuntimeConfig()

  const { error } = await useFetch(`${RuntimeConfig.public.API_URL}/Admin/Verify`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UserStore.Token}`,
    },
  })

  if (error.value !== undefined && error.value !== null)
    return navigateTo('/')
})
