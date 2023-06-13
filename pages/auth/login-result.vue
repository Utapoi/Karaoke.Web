<script setup lang="ts">
import { useUsersService } from '~/composables/services/UsersService'
import { useAuthStore } from '~/composables/stores/AuthStore'

definePageMeta({
  layout: 'none',
  middleware: ['authorize'],
  AuthMiddlewareOptions: {
    GuestOnly: true,
    AuthenticatedRedirectionUrl: '/',
  },
})

const AuthStore = useAuthStore()
const UsersService = useUsersService()
const Router = useRouter()

const IsLoading = ref<boolean>(true)
const IsSuccess = ref<boolean>(false)

onMounted(async () => {
  IsLoading.value = true

  const u = await UsersService.GetCurrentUser()

  if (u === undefined) {
    IsSuccess.value = false
    IsLoading.value = false

    await Router.push('/auth/login')
  }
  else {
    IsSuccess.value = true
    IsLoading.value = false
    AuthStore.SetCurrentUser(u)

    await Router.push('/')
  }
})
</script>

<template>
  <div class="h-full min-h-screen min-w-screen w-full flex flex-col items-center justify-center bg-[#222]">
    <div v-if="!IsLoading">
      <div v-if="IsSuccess === false">
        <div class="flex flex-col items-center gap-2">
          <span class="i-fluent:error-circle-24-regular text-5xl text-red-600" />
          <p class="text-gray-200">
            An error occured while logging in.
          </p>
          <p class="text-sm text-gray-400">
            Please close this page and <span class="underline">retry the login process from start</span>.
          </p>
        </div>
      </div>
      <div v-else>
        <div class="flex flex-col items-center gap-2">
          <span class="i-fluent:checkmark-circle-48-regular text-5xl text-green-600" />
          <p class="text-gray-400">
            You can close this page now.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
