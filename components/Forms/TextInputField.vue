<script setup lang="ts">
/**
 * The props for the text input field
 */
export interface TextInputFieldProps {
  name: string
  label: string
  value?: string
  placeholder: string
  showLabel?: boolean
  type?: string
}

// Properties
const props = withDefaults(defineProps<TextInputFieldProps>(), {
  placeholder: 'Enter text here',
  showLabel: true,
  type: 'text',
})

// Events
const events = defineEmits<{
  'update:modelValue': [value: string]
}>()

/**
 * The text in the input
 */
const Text = ref<string>(props.value ?? '')

/**
 * Function called when the input changes
 */
function OnInputChanged(e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.value

  events('update:modelValue', value)
}
</script>

<template>
  <div class="my-1 inline-flex flex-col">
    <label v-if="showLabel" :for="name" class="mb-2 text-sm font-semibold text-latte-text dark:text-mocha-text"> {{ label }}</label>
    <input
      v-model="Text"
      class="w-full transform-gpu appearance-none rounded-full bg-latte-crust px-4 py-2 text-latte-text ring-1.5 ring-latte-overlay0 transition-all duration-150 dark:bg-mocha-crust dark:text-mocha-text placeholder:text-latte-subtext0 focus:outline-none dark:ring-mocha-overlay0 focus:ring-latte-lavender placeholder:dark:text-mocha-subtext0 focus:dark:ring-mocha-lavender"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @input="OnInputChanged"
    >
  </div>
</template>
