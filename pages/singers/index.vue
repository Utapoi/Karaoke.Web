<script setup lang="ts">
import ArtistCard from '~/components/Artists/ArtistCard.vue'
import { useSingersService } from '~/Composables/Services/SingersService'
import type { Singer } from '~/Core/Models/Singer'

interface ISearchFilters {
  query?: string
  sorting?: string
}

const SingersService = useSingersService()

const Singers = ref<Singer[]>([])

Singers.value = await SingersService.GetSingersAsync()

const IsSearching = ref<boolean>(false)
const SearchFilters = ref<ISearchFilters>({
  query: '',
})

const HasSearchFilters = computed<boolean>(() => {
  return (SearchFilters.value.query !== undefined
    && SearchFilters.value.query !== '')
    || SearchFilters.value.sorting !== undefined
})

const SearchAsyncDebounced = useDebounceFn(async () => {
  try {
    IsSearching.value = true

    if (SearchFilters.value.query === undefined || SearchFilters.value.query === '') {
      Singers.value = await SingersService.GetSingersAsync()
      return
    }

    Singers.value = await SingersService.SearchAsync(SearchFilters.value.query)
  }
  finally {
    IsSearching.value = false
  }
}, 500, {
  maxWait: 2500,
})

async function OnSearchQueryChanged() {
  await SearchAsyncDebounced()
}
</script>

<template>
  <div v-if="Singers.length > 0" class="mx-auto max-w-9xl px-4 py-4 md:px-8 md:py-8">
    <h1 class="text-3xl font-bold text-latte-text dark:text-mocha-text">
      Singers
    </h1>
    <p class="text-sm text-latte-subtext1 dark:text-mocha-subtext1">
      Browse all singers.
    </p>
    <div class="mb-8 mt-12 w-full flex gap-2 text-latte-text dark:text-mocha-text">
      <div class="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-latte-surface1 px-3 py-1 shadow md:w-66 dark:bg-mocha-surface1 hover:bg-latte-surface2 hover:dark:bg-mocha-surface2">
        <span class="i-fluent:search-16-filled text-lg" />
        <input
          v-model="SearchFilters.query"
          class="w-full bg-transparent outline-none"
          placeholder="Search..."
          type="text"
          @input="OnSearchQueryChanged"
        >
      </div>
      <div v-if="HasSearchFilters" class="flex cursor-pointer items-center gap-1 rounded-full bg-latte-surface1 px-3 py-1 text-latte-text dark:bg-mocha-surface1 dark:text-mocha-text">
        <span>Name</span>
        <span class="i-fluent:arrow-down-16-filled text-sm" />
      </div>
    </div>

    <div v-if="!HasSearchFilters">
      <!-- Popular -->
      <div>
        <div class="flex items-center justify-between">
          <h2 class="mb-2 font-serif text-lg font-semibold uppercase text-latte-overlay0 dark:text-mocha-overlay0">
            Popular
          </h2>
          <NuxtLink to="/singers/popular" class="text-sm font-semibold text-latte-overlay0 transition-all duration-150 dark:text-mocha-overlay0 hover:underline">
            View All
          </NuxtLink>
        </div>
        <div class="grid grid-cols-3 max-w-10xl max-w-10xl w-full w-full gap-4 3xl:grid-cols-9 lg:grid-cols-5 md:grid-cols-4 xl:grid-cols-7">
          <ArtistCard v-for="singer in Singers" :key="singer.Id" :singer="singer" />
        </div>
      </div>

      <div class="mt-16">
        <div class="flex items-center justify-between">
          <h2 class="mb-2 font-serif text-lg font-semibold uppercase text-latte-overlay0 dark:text-mocha-overlay0">
            Latest Release
          </h2>
          <NuxtLink to="/singers/latest" class="text-sm font-semibold text-latte-overlay0 transition-all duration-150 dark:text-mocha-overlay0 hover:underline">
            View All
          </NuxtLink>
        </div>
        <div class="grid grid-cols-3 max-w-10xl max-w-10xl w-full w-full gap-4 3xl:grid-cols-9 lg:grid-cols-5 md:grid-cols-4 xl:grid-cols-7">
          <ArtistCard v-for="singer in Singers" :key="singer.Id" :singer="singer" />
        </div>
      </div>
    </div>
    <div v-else-if="HasSearchFilters && !IsSearching">
      <h2 class="mb-1 font-serif text-lg font-semibold uppercase text-latte-overlay0 dark:text-mocha-overlay0">
        Search Results
      </h2>
      <p class="mb-6 font-semibold text-latte-overlay0 dark:text-mocha-overlay0">
        for <span class="ml-1 rounded-full bg-latte-sky px-2 py-0.5 text-sm font-semibold text-latte-base dark:bg-mocha-sky dark:text-mocha-base">{{ SearchFilters.query }}</span>
      </p>
      <div class="grid grid-cols-3 max-w-10xl max-w-10xl w-full w-full gap-4 3xl:grid-cols-9 lg:grid-cols-5 md:grid-cols-4 xl:grid-cols-7">
        <ArtistCard v-for="singer in Singers" :key="singer.Id" :singer="singer" />
      </div>
    </div>
  </div>
</template>
