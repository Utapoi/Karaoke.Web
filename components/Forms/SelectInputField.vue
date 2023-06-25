<script setup lang="ts">
import type { SelectInputFieldOptions } from '~/Core/Forms/Options/SelectInputFieldOptions'

/**
 * The props for the select input field
 */
export interface SelectInputFieldProps {
  name: string
  label: string
  showLabel?: boolean
  placeholder?: string
  options: Array<SelectInputFieldOptions>
}

// Properties
withDefaults(defineProps<SelectInputFieldProps>(), {
  showLabel: true,
  placeholder: 'Select an option',
})

// Events
const events = defineEmits<{
  'update:modelValue': [value: string]
}>()

/**
 * The HTML element of the select
 */
const SelectRef = ref<HTMLElement | null>(null)

/**
 * The selected option from the select
 */
const Selected = ref<string>('')

/**
 * The state of the select
 */
const IsOpen = ref<boolean>(false)

/**
 * Function called when the input changes
 */
function OnInputChanged(e: SelectInputFieldOptions) {
  const value = e.value

  Selected.value = value
  events('update:modelValue', value)

  IsOpen.value = false
}
</script>

<template>
  <div ref="SelectRef" class="my-1 inline-flex flex-col">
    <div v-if="showLabel" :for="name" class="mb-2 text-sm font-semibold text-latte-text dark:text-mocha-text">
      {{ label }}
    </div>
    <div
      class="rounded-full bg-latte-crust px-4 py-2 text-latte-text ring-1.5 transition-all duration-150 dark:bg-mocha-crust dark:text-mocha-text focus:outline-none"
      :class="{
        'ring-latte-lavender dark:ring-mocha-lavender': IsOpen,
        'ring-latte-overlay0 dark:ring-mocha-overlay0': !IsOpen,
      }"
      @click="IsOpen = !IsOpen"
    >
      <div class="flex items-center justify-between gap-4 hover:cursor-pointer">
        <div
          class="w-32 overflow-hidden text-ellipsis whitespace-nowrap"
          :class="{
            'text-latte-subtext0 dark:text-mocha-subtext0': Selected === '',
            'text-latte-text dark:text-mocha-text': Selected !== '',
          }"
        >
          {{ Selected !== '' ? Selected : placeholder }}
        </div>
        <div class="mt-1 text-xs text-latte-text dark:text-mocha-text">
          <div v-if="IsOpen" class="i-fluent:chevron-up-16-filled" />
          <div v-else class="i-fluent:chevron-down-16-filled" />
        </div>
      </div>
    </div>
    <Teleport v-if="IsOpen && SelectRef" to="body" class="relative">
      <div
        class="absolute top-2 w-full rounded-xl bg-latte-surface1 shadow dark:bg-mocha-surface1" :style="{
          left: `${SelectRef.getBoundingClientRect().left}px`,
          top: `${SelectRef.getBoundingClientRect().bottom + useWindowScroll().y.value ?? 0 + 20}px`,
          width: `${SelectRef.getBoundingClientRect().width}px`,
        }"
        @mouseleave="IsOpen = false"
      >
        <div class="flex flex-col justify-between p-2 text-latte-text dark:text-mocha-text">
          <div v-for="option in options" :key="option.value" class="w-full text-ellipsis whitespace-nowrap rounded-2xl px-3 py-1 transition-all duration-150 hover:cursor-pointer hover:bg-latte-surface2 hover:dark:bg-mocha-surface2" @click.prevent="OnInputChanged(option)">
            <div>
              {{ option.text }}
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
