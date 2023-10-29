<script setup lang="ts">
import { useAlbumsService } from '~/Composables/Services/AlbumsService'
import type { Album } from '~/Core/Models/Album'
import ActionConfirm from '~/components/Common/ActionConfirm.vue'

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

Albums.value = await AlbumsService.GetAlbumsForAdminAsync(0, 15)
</script>

<template>
  <div class="mx-auto max-w-10xl w-full">
    <div class="w-full px-12 pt-8">
      <div class="w-full rounded-xl bg-latte-crust p-3 shadow dark:bg-mocha-crust">
        <div class="flex items-center gap-2">
          <span class="text-sm text-latte-text dark:text-mocha-text">{{ Albums.length }} albums</span>
          <div class="mx-2 h-9 w-0.25 bg-latte-surface2 dark:bg-mocha-surface2" />

          <div class="border border-latte-overlay0 rounded-full dark:border-mocha-overlay0">
            <div class="w-64 inline-flex items-center justify-between gap-6 px-4 py-1.5 text-latte-subtext1 dark:text-mocha-subtext1">
              <span>Search an album...</span>
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
          <NuxtLink to="/admin/albums/add" class="ml-4">
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
                Title
              </th>
              <th scope="col" class="px-6 py-3">
                Singers
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
            <tr v-for="album in Albums" :key="album.Id" class="bg-latte-surface0 text-latte-text transition-all duration-100 dark:bg-mocha-surface0 hover:bg-latte-surface1 dark:text-mocha-text dark:hover:bg-mocha-surface1">
              <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium">
                {{ album.GetTitle('English') }}
              </th>
              <td class="px-6 py-4">
                <p v-for="singer in album.Singers" :key="singer.Id">
                  {{ singer.GetName('English') }}
                </p>
              </td>
              <td class="px-6 py-4">
                {{ album.Songs?.length ?? 0 }}
              </td>
              <td class="w-full inline-flex items-center justify-end gap-2 px-6 py-4">
                <NuxtLink :to="`/albums/${album.Id}`" class="font-medium text-latte-green dark:text-mocha-green" title="Details">
                  <div class="i-carbon:view" />
                </NuxtLink>
                <NuxtLink :to="`/admin/albums/edit/${album.Id}`" class="font-medium text-latte-lavender dark:text-mocha-lavender" title="Edit">
                  <div class="i-carbon:pen" />
                </NuxtLink>
                <ActionConfirm
                  :title="`Delete '${album.GetTitle()}'`"
                  message="Are you sure you want to delete this album?"
                  type="danger"
                  :on-confirm="async () => await AlbumsService.DeleteAsync(album.Id)"
                >
                  <template #button="slotProps">
                    <div class="font-medium text-latte-red hover:cursor-pointer dark:text-mocha-red" title="Delete" @click.prevent="slotProps.reveal">
                      <div class="i-carbon:delete" />
                    </div>
                  </template>
                </ActionConfirm>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
