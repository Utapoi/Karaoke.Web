export default defineNuxtRouteMiddleware((_to, from) => {
  // We only want to redirect on the client-side since we use localStorage to store the token
  if (process.server)
    return

  if (from.path === '/auth/login-result/')
    return

  const UserStore = useUserStore()

  if (UserStore.IsConnected())
    return navigateTo('/')
})
