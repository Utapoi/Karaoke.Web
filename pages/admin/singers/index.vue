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
  <div class="mx-auto max-w-10xl w-full w-full">
    <div class="w-full px-12 pt-8">
      <div class="w-full rounded-xl bg-latte-crust p-3 shadow dark:bg-mocha-crust">
        <div class="flex items-center gap-2">
          <span class="text-sm text-latte-text dark:text-mocha-text">{{ Singers.length }} artists</span>
          <div class="mx-2 h-9 w-0.25 bg-latte-surface2 dark:bg-mocha-surface2" />

          <div class="border border-latte-overlay0 rounded-full dark:border-mocha-overlay0">
            <div class="w-64 inline-flex items-center justify-between gap-6 px-4 py-1.5 text-latte-subtext1 dark:text-mocha-subtext1">
              <span>Search an artist...</span>
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
          <NuxtLink to="/admin/singers/add" class="ml-4">
            <div
              border="~ dark:mocha-red latte-red"
              hover="dark:bg-mocha-red bg-latte-red text-latte-text dark:text-mocha-text cursor-pointer"
              text="dark:mocha-red latte-red lg"
              flex="inline items-center justify-start gap-1"
              class="rounded-full px-4 py-0.95 transition-all duration-200"
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
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400" aria-describedby="Singers">
          <thead class="bg-latte-crust text-xs uppercase text-latte-text dark:bg-mocha-crust dark:text-mocha-text">
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
            <tr v-for="singer in Singers" :key="singer.Id" class="bg-latte-surface0 text-latte-text transition-all duration-100 dark:bg-mocha-surface0 hover:bg-latte-surface1 dark:text-mocha-text dark:hover:bg-mocha-surface1">
              <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium">
                {{ singer.GetName('English') }}
              </th>
              <td class="px-6 py-4">
                {{ singer.Albums?.length ?? 0 }}
              </td>
              <td class="px-6 py-4">
                {{ singer.Songs?.length ?? 0 }}
              </td>
              <td class="px-6 py-4 text-right">
                <NuxtLink :to="`/admin/singers/edit/${singer.Id}`" class="font-medium text-latte-lavender dark:text-mocha-lavender hover:underline">
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
