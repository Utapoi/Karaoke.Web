<script setup lang="ts">
import { useAlbumsService } from '~/Composables/Services/AlbumsService'
import type { Album } from '~/core/Models/Album'

definePageMeta({
  layout: 'admin',
  // middleware: ['authorize'],
  // AuthMiddlewareOptions: {
  //   Role: 'Admin',
  // },
})

const AlbumsService = useAlbumsService()

// Refs
const Albums = ref<Album[]>([])

Albums.value = await AlbumsService.GetAlbumsAsync(0, 15)
</script>

<template>
  <div class="w-full">
    <div class="w-full px-12 pt-8">
      <div class="w-full rounded-xl bg-[#222] p-3 shadow">
        <div class="flex items-center gap-2">
          <span class="text-sm">{{ Albums.length }} albums</span>
          <div class="mx-2 h-9 w-0.25 bg-gray-500" />

          <div class="border border-gray-700 rounded-full">
            <div class="w-64 inline-flex items-center justify-between gap-6 px-4 py-1.5 dark:text-gray-400">
              <span>Search an album...</span>
              <span class="i-fluent:search-20-filled text-lg" />
            </div>
          </div>
          <div class="inline-flex items-center justify-start gap-1 border border-gray-600 rounded-full px-4 py-0.95 text-lg text-gray-400 transition-all duration-200 hover:cursor-pointer hover:bg-gray-600 hover:text-white">
            <span class="i-fluent:filter-12-filled" />
            <span>Filter</span>
          </div>
          <NuxtLink to="/admin/albums/add" class="ml-4">
            <div class="inline-flex items-center justify-start gap-1 border border-[#f90b31] rounded-full px-4 py-0.95 text-lg text-[#f90b31] transition-all duration-200 hover:cursor-pointer hover:bg-[#f90b31] hover:text-white">
              <span class="i-fluent:add-circle-12-filled" />
              <span>Add</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="w-full px-12 pt-4">
      <div class="relative overflow-x-auto shadow-md sm:rounded-xl">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400" aria-describedby="Singers">
          <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-[#222] dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Title
              </th>
              <th scope="col" class="px-6 py-3">
                Singer
              </th>
              <th scope="col" class="px-6 py-3">
                Songs
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody v-if="Albums.length > 0">
            <tr v-for="album in Albums" :key="album.Id" class="bg-white transition-all duration-100 dark:bg-[#333] hover:bg-gray-50 dark:hover:bg-[#474747]">
              <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-800 dark:text-white">
                {{ album.GetTitle('English') }}
              </th>
              <td class="px-6 py-4 text-gray-800 dark:text-white">
                {{ album.Singers[0]?.GetName('English') ?? 'Unknown' }}
              </td>
              <td class="px-6 py-4 text-gray-800 dark:text-white">
                {{ album.Songs?.length ?? 0 }}
              </td>
              <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-purple-400 hover:underline">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
