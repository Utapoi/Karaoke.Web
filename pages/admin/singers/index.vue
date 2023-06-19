<script setup lang="ts">
import { useSingersService } from '~/Composables/Services/SingersService'
import type { Singer } from '~/Core/Models/Singer'

definePageMeta({
  layout: 'admin',
  // middleware: ['authorize'],
  // AuthMiddlewareOptions: {
  //   Role: 'Admin',
  // },
})

const SingersService = useSingersService()

// Refs
const Singers = ref<Singer[]>([])

Singers.value = await SingersService.GetSingersAsync(0, 15)
</script>

<template>
  <div class="w-full">
    <div class="w-full px-12 pt-8">
      <div class="bg-mocha-surface0 w-full rounded-xl p-3 shadow">
        <div class="flex items-center gap-2">
          <span class="text-sm">{{ Singers.length }} artists</span>
          <div class="mx-2 h-9 w-0.25 bg-gray-500" />

          <div class="border border-gray-700 rounded-full">
            <div class="w-64 inline-flex items-center justify-between gap-6 px-4 py-1.5 dark:text-gray-400">
              <span>Search an artist...</span>
              <span class="i-fluent:search-20-filled text-lg" />
            </div>
          </div>
          <div class="inline-flex items-center justify-start gap-1 border border-gray-600 rounded-full px-4 py-0.95 text-lg text-gray-400 transition-all duration-200 hover:cursor-pointer hover:bg-gray-600 hover:text-white">
            <span class="i-fluent:filter-12-filled" />
            <span>Filter</span>
          </div>
          <NuxtLink to="/admin/singers/add" class="ml-4">
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
          <thead class="dark:bg-mocha-surface0 bg-gray-50 text-xs uppercase text-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Albums
              </th>
              <th scope="col" class="px-6 py-3">
                Songs
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody v-if="Singers.length > 0">
            <tr v-for="singer in Singers" :key="singer.Id" class="dark:bg-mocha-surface1 bg-white transition-all duration-100 hover:bg-gray-50 dark:hover:bg-[#474747]">
              <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-800 dark:text-white">
                {{ singer.GetName('English') }}
              </th>
              <td class="px-6 py-4 text-gray-800 dark:text-white">
                {{ singer.Albums?.length ?? 0 }}
              </td>
              <td class="px-6 py-4 text-gray-800 dark:text-white">
                {{ singer.Songs?.length ?? 0 }}
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
