<script setup lang="ts">
</script>

<template>
  <div class="h-min rounded-xl bg-latte-surface0 p-5 sm:mb-2 sm:mt-6 dark:bg-mocha-surface0">
    <div class="mb-6 w-full flex items-center justify-between gap-2">
      <h2 class="text-2xl text-latte-text dark:text-mocha-text">
        Karaoke
      </h2>
    </div>

    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <div class="flex flex-col gap-4 rounded-xl bg-latte-surface1 p-3 text-latte-text dark:bg-mocha-surface1 dark:text-mocha-text">
        <div class="w-full flex items-start justify-between">
          <div class="flex flex-col items-start gap-1">
            <div class="flex items-center gap-2">
              <span>WALK WITH MOMENTS</span>
              <span class="rounded-full bg-latte-green px-2 text-sm font-semibold text-latte-base dark:bg-mocha-green dark:text-mocha-base">Verified</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="i-fluent:calendar-20-filled" />
              <div class="text-sm text-latte-subtext1 dark:text-mocha-subtext1">
                07/07/2023
              </div>
            </div>
          </div>
          <div class="flex flex-col items-start gap-2">
            <div class="flex items-center gap-2">
              <span class="i-circle-flags:jp text-lg" />
            </div>
          </div>
        </div>
        <div class="w-full flex items-center gap-0">
          <div class="i-fluent:star-20-filled h-5 w-5 bg-latte-overlay2 dark:bg-mocha-overlay2" title="Very Easy" />
          <div class="i-fluent:star-20-filled h-5 w-5 bg-latte-lavender dark:bg-mocha-lavender" title="Easy" />
          <div class="i-fluent:star-20-filled h-5 w-5 bg-latte-mauve dark:bg-mocha-mauve" title="Normal" />
          <div class="i-fluent:star-20-filled h-5 w-5 bg-latte-green dark:bg-mocha-green" title="Hard" />
          <div class="i-fluent:star-20-filled h-5 w-5 bg-latte-yellow dark:bg-mocha-yellow" title="Expert" />
          <div class="i-fluent:star-20-filled h-5 w-5 bg-latte-red dark:bg-mocha-red" title="Master" />
        </div>
      </div>

      <div class="flex gap-8 rounded-xl bg-latte-surface1 p-3 text-latte-text dark:bg-mocha-surface1 dark:text-mocha-text">
        <div class="flex flex-col items-start gap-2">
          <div class="flex items-center gap-2">
            <span class="i-circle-flags:earth text-lg" />
            <span>Romanized</span>
            <!-- <span class="rounded-full bg-latte-lavender px-2 text-sm font-semibold text-latte-base dark:bg-mocha-lavender dark:text-mocha-base">Community</span> -->
          </div>
          <div class="flex items-center gap-1">
            <span class="i-fluent:calendar-20-filled" />
            <div class="text-sm text-latte-subtext1 dark:text-mocha-subtext1">
              07/07/2023
            </div>
          </div>
        </div>

        <div class="flex items-center">
          <div>
            <div class="i-mdi:star-four-points" />
            <div class="i-mdi:star-four-points" />
          </div>
          <div>
            <div class="i-mdi:star-four-points-outline" />
            <div class="i-mdi:star-four-points-outline" />
          </div>
        </div>

        <div class="flex items-center gap-1">
          <span class="i-fluent:mic-20-filled" />
          <div class="text-sm text-latte-subtext1 dark:text-mocha-subtext1">
            1
          </div>
        </div>

        <div class="h-full flex items-center justify-center gap-2">
          <span>AUTHOR</span>
        </div>
      </div>
    </div>
  </div>
</template>
