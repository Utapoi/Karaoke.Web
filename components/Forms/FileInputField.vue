<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import type { ValidationArgs } from '@vuelidate/core'

export interface FileInputFieldProps {
  label: string
  multiple?: boolean
  name: string
  placeholder?: string
  showLabel?: boolean
  rules?: ValidationArgs<IValidationType>
}

interface IValidationType {
  value: Array<File>
}

const Props = withDefaults(defineProps<FileInputFieldProps>(), {
  label: 'File',
  multiple: false,
  placeholder: 'Select a file',
  showLabel: true,
})

const Events = defineEmits<{
  'update:modelValue': [value: Array<File>]
}>()

/**
 * The validation rules for the file input field
 */
const Rules = {
  value: {},
}

/**
 * The state of the file input field
 */
const State = reactive<IValidationType>({
  value: [],
})

if (Props.rules !== undefined && Props.rules !== null)
  Rules.value = Props.rules

/**
 * Vuelidate validation
 */
const v = useVuelidate<IValidationType>(Rules, State)

/**
 * The HTML element of the file input
 */
const InputRef = ref<HTMLInputElement | null>(null)

function OnInputChanged(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target.files

  if (files === null)
    return

  v.value.value.$model = []

  for (let i = 0; i < files.length; i++) {
    const f = files.item(i)

    // Note(Mikyan): I don't know why this would happen, but just in case
    if (f === null)
      continue

    v.value.value.$model.push(f)
  }

  Events('update:modelValue', v.value.value.$model)
}

function OnRemoveFileClicked() {
  v.value.value.$model = []
  InputRef.value!.value = ''
}
</script>

<template>
  <div class="my-1 inline-flex flex-col">
    <label class="mb-2 text-sm font-semibold text-latte-text dark:text-mocha-text">{{ label }}</label>
    <label>
      <div
        class="flex items-center justify-between gap-2 rounded-full bg-latte-crust px-4 py-2 text-latte-subtext0 ring-1.5 transition-all duration-150 hover:cursor-pointer dark:bg-mocha-crust dark:text-mocha-subtext0"
        :class="{
          'ring-latte-overlay0 dark:ring-mocha-overlay0': !v.$invalid,
          'ring-latte-red dark:ring-mocha-red': v.$invalid,
        }"
      >
        <div class="flex items-center gap-2">
          <div class="i-fluent:document-16-regular" />
          <span v-if="v.value.$model.length === 0" class="">{{ placeholder }}</span>
          <div v-for="file in v.value.$model" v-else :key="file.name" class="">
            <div class="w-full inline-flex items-center gap-2 rounded-full bg-latte-surface2 px-2 text-sm text-latte-text dark:bg-mocha-surface0 dark:text-mocha-text">
              <span class="truncate">{{ file.name }}</span>
            </div>
          </div>
        </div>
        <div v-if="v.value.$model.length > 0" class="inline-flex items-center justify-self-end" @click.prevent="OnRemoveFileClicked">
          <span class="i-fluent:document-dismiss-16-filled" />
        </div>
      </div>
      <span
        v-if="v.$invalid && v.$silentErrors"
        class="ml-2 mt-1 text-xs text-red-400"
      >
        {{ v.$silentErrors.at(0)?.$message }}.
      </span>
      <input
        ref="InputRef"
        type="file"
        class="hidden"
        :multiple="multiple"
        :name="name"
        @input="OnInputChanged"
      >
    </label>
  </div>
</template>
