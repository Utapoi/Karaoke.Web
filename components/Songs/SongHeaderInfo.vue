<script setup lang="ts">
import type { Song } from '~/Core/Models/Song'
import { GetUrl } from '~/Utils/ImageUtils'

defineProps<{
  song: Song
}>()

function GetNationalityFlag(nationality: string) {
  switch (nationality) {
    case 'Japanese':
      return 'i-circle-flags:jp'
    case 'Chinese':
      return 'i-circle-flags:cn'
    case 'English':
      return 'i-circle-flags:gb'
    case 'French':
      return 'i-circle-flags:fr'
    default:
      return 'i-circle-flags:jp'
  }
}
</script>

<template>
  <div class="w-full rounded-t-xl bg-latte-surface0/75 p-3 backdrop-blur-md -mt-46 dark:bg-mocha-surface0/65">
    <div class="relative flex flex-col">
      <div class="max-w-5xl flex flex-col items-start justify-start gap-4 lg:flex-row">
        <!-- Artist Image -->
        <div class="h-46 min-w-46 rounded-xl">
          <img class="h-full w-full rounded-xl object-cover object-top" :src="GetUrl(song.GetCover())">
        </div>
        <div class="mt-2 h-full flex flex-col items-start">
          <!-- Names / Nicknames -->
          <div class="flex flex-col items-start gap-0">
            <div class="flex items-center gap-4">
              <h1 class="text-3xl font-semibold text-latte-text dark:text-mocha-text">
                {{ song.GetTitle() }}
              </h1>
              <!-- TODO: v-if="CurrentUser === Roles.Admin" or something like this. -->
              <NuxtLink :to="`/admin/singers/${song.Id}/edit`" class="i-carbon:pen cursor-pointer text-sm text-latte-lavender dark:text-mocha-lavender" />
            </div>

            <p class="text-latte-text dark:text-mocha-text">
              <span class="text-xs text-latte-subtext1 dark:text-mocha-subtext1">by</span> <span class="underline">{{ `${song.GetSinger().GetName()}` }}</span>
            </p>
          </div>
          <div class="mt-6 w-full flex flex-wrap items-center gap-2 text-sm text-latte-text dark:text-mocha-text">
            <!-- Buttons ? -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
