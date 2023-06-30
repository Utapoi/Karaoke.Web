<script setup lang="ts">
import type { Singer } from '~/Core/Models/Singer'
import { GetUrl } from '~/Utils/ImageUtils'

defineProps<{
  singer: Singer
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
          <img class="h-full w-full rounded-xl object-cover object-top" :src="GetUrl(singer.ProfilePicture)">
        </div>
        <div class="mt-2 h-full flex flex-col items-start">
          <!-- Names / Nicknames -->
          <div class="flex flex-col items-start gap-0">
            <div class="flex items-center gap-4">
              <h1 class="text-3xl font-semibold text-latte-text dark:text-mocha-text">
                {{ singer.GetName() }}
              </h1>
              <!-- TODO: v-if="CurrentUser === Roles.Admin" or something like this. -->
              <NuxtLink :to="`/admin/singers/${singer.Id}/edit`" class="i-carbon:pen cursor-pointer text-sm text-latte-lavender dark:text-mocha-lavender" />
            </div>

            <p class="text-latte-text dark:text-mocha-text">
              <span class="text-xs text-latte-subtext1 dark:text-mocha-subtext1">or</span> {{ `${singer.Nicknames.map(x => x.Text).join(', ')}` }}
            </p>
          </div>
          <div class="mt-6 w-full flex flex-wrap items-center gap-2 text-sm text-latte-text dark:text-mocha-text">
            <p v-if="singer.Nationality !== null && singer.Nationality !== ''" class="inline-flex items-center gap-1 rounded-full bg-latte-surface2 px-3 py-1 shadow dark:bg-mocha-surface2">
              <span class="text-latte-lavender dark:text-mocha-lavender" :class="GetNationalityFlag(singer.Nationality)" />
              <span>{{ singer.Nationality }}</span>
            </p>
            <p v-if="singer.Birthday !== null" class="inline-flex items-center gap-1 rounded-full bg-latte-surface2 px-3 py-1 shadow dark:bg-mocha-surface2">
              <span class="i-fluent:food-cake-20-filled text-lg text-latte-lavender dark:text-mocha-lavender" />
              <span>{{ new Date(singer.Birthday).toLocaleDateString() }}</span>
            </p>
            <p v-if="singer.BloodType !== null && singer.BloodType !== undefined" class="inline-flex items-center gap-1 rounded-full bg-latte-surface2 px-3 py-1 shadow dark:bg-mocha-surface2">
              <span class="i-material-symbols:bloodtype text-lg text-latte-lavender dark:text-mocha-lavender" />
              <span>{{ singer.BloodType }}</span>
            </p>
            <p v-if="singer.Height !== 0 && singer.Height !== undefined" class="inline-flex items-center gap-1 rounded-full bg-latte-surface2 px-3 py-1 shadow dark:bg-mocha-surface2">
              <span class="i-fluent:ruler-20-filled text-lg text-latte-lavender dark:text-mocha-lavender" />
              <span>{{ singer.Height }} cm</span>
            </p>
            <p class="inline-flex items-center gap-1 rounded-full bg-latte-surface2 px-3 py-1 shadow dark:bg-mocha-surface2">
              <span class="i-fluent:briefcase-12-filled text-lg text-latte-lavender dark:text-mocha-lavender" />
              <span v-if="singer.HasActivities()">{{ singer.GetActivities().join(', ') }}</span>
              <span v-else>Singer</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
