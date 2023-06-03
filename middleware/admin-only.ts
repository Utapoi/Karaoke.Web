// TODO: API Request with Token to Validate the Admin Access.
export default defineNuxtRouteMiddleware(() => {
  // We only want to redirect on the client-side since we use localStorage to store the token
  if (process.server)
    return

  const UserStore = useUserStore()

  if (!UserStore.IsConnected())
    return navigateTo('/')
})
