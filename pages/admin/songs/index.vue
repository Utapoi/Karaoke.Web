<script setup lang="ts">
import { useSongsService } from '~/Composables/Services/SongsService'
import type { Song } from '~/Core/Models/Song'

definePageMeta({
  layout: 'admin',
  // middleware: ['authorize'],
  // AuthMiddlewareOptions: {
  //   Role: 'Admin',
  // },
})

const SongsService = useSongsService()

const Songs = ref<Song[]>([])

Songs.value = await SongsService.GetSongsAsync(0, 15)
</script>

<template>
  <div class="mx-auto max-w-10xl w-full">
    <div class="w-full px-12 pt-8">
      <div class="w-full rounded-xl bg-latte-crust p-3 shadow dark:bg-mocha-surface0 dark:shadow-none">
        <div class="flex items-center gap-2">
          <span class="text-sm text-latte-text dark:text-mocha-text">0 songs</span>
          <div class="mx-2 h-9 w-0.25 bg-latte-surface2 dark:bg-mocha-surface2" />

          <div class="border border-latte-overlay0 rounded-full dark:border-mocha-overlay0">
            <div class="w-64 inline-flex items-center justify-between gap-6 px-4 py-1.5 text-latte-subtext1 dark:text-mocha-subtext1">
              <span>Search a song...</span>
              <span class="i-fluent:search-20-filled text-lg" />
            </div>
          </div>
          <div
            border="~ dark:mocha-olverlay0 latte-overlay0"
            flex="inline items-center justify-start gap-1"
            hover="bg-mocha-overlay2 bg-latte-overlay2 text-latte-base dark:text-mocha-base"
            text="dark:mocha-subtext1 latte-subtext1 lg"
            class="rounded-full px-4 py-0.95 transition-all duration-200 hover:cursor-pointer"
          >
            <span class="i-fluent:filter-12-filled" />
            <span>Filter</span>
          </div>
          <NuxtLink to="/admin/songs/add" class="ml-4">
            <div
              border="~ dark:mocha-red latte-red"
              hover="dark:bg-mocha-red bg-latte-red text-latte-base dark:text-mocha-base"
              text="dark:mocha-red latte-red lg"
              class="inline-flex items-center justify-start gap-1 border border-[#f90b31] rounded-full px-4 py-0.95 text-lg text-[#f90b31] transition-all duration-200 hover:cursor-pointer hover:bg-[#f90b31] hover:text-white"
            >
              <span class="i-fluent:add-circle-12-filled" />
              <span>Add</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="w-full px-12 pt-4">
      <div class="relative overflow-x-auto shadow-md sm:rounded-xl">
        <table class="w-full text-left text-sm" aria-describedby="Songs">
          <thead class="bg-latte-crust text-xs uppercase text-latte-text dark:bg-mocha-crust dark:text-mocha-text">
            <tr>
              <th scope="col" class="px-6 py-3">
                Title
              </th>
              <th scope="col" class="px-6 py-3">
                Album
              </th>
              <th scope="col" class="px-6 py-3">
                Artist
              </th>
              <th scope="col" class="px-6 py-3">
                Duration
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="song in Songs" :key="song.Id" class="bg-latte-surface0 text-latte-text transition-all duration-100 dark:bg-mocha-surface0 hover:bg-latte-surface1 dark:text-mocha-text dark:hover:bg-mocha-surface1">
              <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-800 dark:text-white">
                {{ song.GetTitle('English') }}
              </th>
              <td class="px-6 py-4">
                {{ song.GetAlbum().GetTitle('English') }}
              </td>
              <td class="px-6 py-4">
                {{ song.GetSinger().GetName('English') }}
              </td>
              <td class="px-6 py-4">
                {{ song.Duration }}
              </td>
              <td class="px-6 py-4 text-right">
                <NuxtLink :to="`/admin/songs/edit/${song.Id}`" class="font-medium text-latte-lavender dark:text-mocha-lavender hover:underline">
                  Edit
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
