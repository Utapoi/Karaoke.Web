<script setup lang="ts">
const props = defineProps<{
  url: string
  title: string
  singer: string
}>()

const IsHovered = ref(false)

const BackgroundImage = computed(() => {
  return `background: url(${props.url});`
})
</script>

<template>
  <div class="aspect-ratio-1 h-52 w-52 transform-gpu overflow-hidden rounded-xl transition-transform duration-200 hover:scale-104" @mouseenter="IsHovered = true" @mouseleave="IsHovered = false">
    <div class="h-full w-full rounded-xl !bg-cover !bg-no-repeat" :style="BackgroundImage">
      <div v-show="IsHovered" v-motion-fade-visible class="h-full w-full inline-flex flex-col items-start justify-end bg-black/80 px-2 py-3">
        <div v-motion-slide-visible-left class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-main">
          {{ title }}
        </div>
        <div v-motion-slide-visible-left class="w-full overflow-hidden text-ellipsis whitespace-nowrap" :title="singer">
          <span class="mr-1 text-xs text-secondary">by</span>
          <span class="text-xs text-main">
            {{ singer }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
