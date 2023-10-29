<script setup lang="ts">
import type { Singer } from '~/Core/Models/Singer'

defineProps<{
  singer: Singer
}>()

// TODO: Get Stats from Backend or calculate them here?
// I don't know if it's better to calculate them here or in the backend.
</script>

<template>
  <div>
    <!-- Singer Popularity -->
    <div class="mb-2 mt-6 rounded-xl bg-latte-surface0 p-5 dark:bg-mocha-surface0">
      <div class="mb-6 flex items-center gap-2">
        <h2 class="text-2xl text-latte-text dark:text-mocha-text">
          Popularity
        </h2>
        <span class="text-lg text-latte-subtext0 dark:text-mocha-subtext0"> / Month</span>
        <div class="ml-auto cursor-help rounded-full bg-latte-lavender p-0.5 text-sm text-latte-base dark:bg-mocha-lavender dark:text-mocha-base" title="The popularity of the singer on the platform.">
          <div class="i-fluent:question-16-filled" />
        </div>
      </div>
      <div class="grid grid-cols-2 w-full items-center gap-5 text-latte-text lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-4 dark:text-mocha-text" />
    </div>

    <!-- Players Score -->
    <div class="my-2 rounded-xl bg-latte-surface0 p-5 dark:bg-mocha-surface0">
      <div class="mb-6 flex items-center gap-2">
        <h2 class="text-2xl text-latte-text dark:text-mocha-text">
          Player Scores
        </h2>
        <span class="text-lg text-latte-subtext0 dark:text-mocha-subtext0"> / Month</span>
        <div class="ml-auto cursor-help rounded-full bg-latte-lavender p-0.5 text-sm text-latte-base dark:bg-mocha-lavender dark:text-mocha-base" title="The median value of the score per day.">
          <div class="i-fluent:question-16-filled" />
        </div>
      </div>
      <div class="grid grid-cols-2 w-full items-center gap-5 text-latte-text lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-4 dark:text-mocha-text" />
    </div>

    <!-- Albums / Year (Release) -->
    <div class="mb-2 mt-6 rounded-xl bg-latte-surface0 p-5 dark:bg-mocha-surface0">
      <div class="mb-6 flex items-end gap-2">
        <h2 class="text-2xl text-latte-text dark:text-mocha-text">
          Albums
        </h2>
        <span class="text-lg text-latte-subtext0 dark:text-mocha-subtext0"> / Year</span>
      </div>
      <div class="grid grid-cols-2 w-full items-center gap-5 text-latte-text lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-4 dark:text-mocha-text" />
    </div>
    <!-- Songs / Year (Release) -->
    <div class="my-2 rounded-xl bg-latte-surface0 p-5 dark:bg-mocha-surface0">
      <div class="mb-6 flex items-end gap-2">
        <h2 class="text-2xl text-latte-text dark:text-mocha-text">
          Songs
        </h2>
        <span class="text-lg text-latte-subtext0 dark:text-mocha-subtext0"> / Year</span>
      </div>
      <div class="grid grid-cols-2 w-full items-center gap-5 text-latte-text lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-4 dark:text-mocha-text" />
    </div>
  </div>
</template>
