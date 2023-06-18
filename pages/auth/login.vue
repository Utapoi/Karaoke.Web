<script setup lang="ts">
import { useAuthStore } from '~/Composables/stores/AuthStore'

definePageMeta({
  layout: 'none',
  middleware: ['authorize'],
  AuthMiddlewareOptions: {
    GuestOnly: true,
    AuthenticatedRedirectionUrl: '/',
  },
})

const Auth = useAuthStore()

function OnGoogleClicked() {
  Auth.GoogleLogin()
}

async function OnDiscordClicked() {
  // await DiscordLogin()
}
</script>

<template>
  <section class="overflow-hidden bg-gray-50 dark:bg-gray-900">
    <div class="h-screen flex items-start justify-start">
      <div class="h-full w-1/3 bg-[#222]">
        <div class="h-full w-full flex flex-col items-center justify-start pt-24">
          <div class="mb-6 flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-white">
            <div class="i-game-icons:microphone text-3xl text-[#f90b31]" />
            <!-- <img class="mr-2 h-12 w-12" src="UTAPOI_IMAGE_URL" alt="logo"> -->
            <h1 class="inline-flex items-start gap-2 text-3xl">
              Utapoi <span class="text-xs text-gray-400">Karaoke</span>
            </h1>
          </div>
          <div class="lg:mt-16">
            <div class="flex flex-col gap-4">
              <!-- Login with Google -->
              <button class="w-80 flex items-center justify-center gap-2 border border-gray-700 rounded-full px-6 py-3 text-white hover:bg-gray-700/50 focus:outline-none" @click="OnGoogleClicked">
                <span class="i-carbon:logo-google text-xl" />
                <span>Login with Google</span>
              </button>

              <!-- Login with Discord -->
              <button class="w-80 flex items-center justify-center gap-2 border border-gray-700 rounded-full px-6 py-3 text-white hover:bg-gray-700/50 focus:outline-none" @click="OnDiscordClicked">
                <span class="i-carbon:logo-discord text-xl" />
                <span>Login with Discord</span>
              </button>
            </div>
          </div>

          <div class="my-8 flex items-center justify-center gap-2">
            <div class="h-0.5 w-36 rounded-full bg-gray-400" />
            <div class="text-sm uppercase text-gray-300">
              or
            </div>
            <div class="h-0.5 w-36 rounded-full bg-gray-400" />
          </div>

          <!-- Register -->
          <button class="w-32 flex items-center justify-center gap-2 border border-gray-700 rounded-full px-4 py-2 text-white hover:bg-gray-700/50 focus:outline-none">
            <span>Register</span>
          </button>
        </div>
      </div>
      <div class="invisible h-full w-2/3 bg-[url(https://symphogear-xv.com/gears/key_190524x.jpg)] bg-cover bg-center lg:visible" />
    </div>
  </section>
</template>
