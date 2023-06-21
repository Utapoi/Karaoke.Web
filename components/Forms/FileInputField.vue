<script setup lang="ts">
export interface FileInputFieldProps {
  label: string
  multiple?: boolean
  name: string
  placeholder?: string
  showLabel?: boolean
}

withDefaults(defineProps<FileInputFieldProps>(), {
  label: 'File',
  multiple: false,
  placeholder: 'Select a file',
  showLabel: true,
})

const events = defineEmits<{
  'update:modelValue': [value: Array<File>]
}>()

const InputRef = ref<HTMLInputElement | null>(null)

const SelectedFiles = ref<Array<File>>([])

function OnInputChanged(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target.files

  if (files === null)
    return

  SelectedFiles.value = []

  for (let i = 0; i < files.length; i++) {
    const f = files.item(i)

    // Note(Mikyan): I don't know why this would happen, but just in case
    if (f === null)
      continue

    SelectedFiles.value.push(f)
  }

  events('update:modelValue', SelectedFiles.value)
}

function OnRemoveFileClicked() {
  SelectedFiles.value = []
  InputRef.value!.value = ''
}
</script>

<template>
  <div class="my-1 inline-flex flex-col">
    <label class="mb-2 text-sm font-semibold text-latte-text dark:text-mocha-text">{{ label }}</label>
    <label>
      <div class="flex items-center justify-between gap-2 rounded-full bg-latte-crust px-4 py-2 text-latte-subtext0 ring-1.5 ring-latte-overlay0 transition-all duration-150 hover:cursor-pointer dark:bg-mocha-crust dark:text-mocha-subtext0 dark:ring-mocha-overlay0">
        <div class="flex items-center gap-2">
          <div class="i-fluent:document-16-regular" />
          <span v-if="SelectedFiles.length === 0" class="">{{ placeholder }}</span>
          <div v-for="file in SelectedFiles" v-else :key="file.name" class="">
            <div class="w-full inline-flex items-center gap-2 rounded-full bg-latte-surface2 px-2 text-sm text-latte-text dark:bg-mocha-surface0 dark:text-mocha-text">
              <span class="truncate">{{ file.name }}</span>
            </div>
          </div>
        </div>
        <div v-if="SelectedFiles.length > 0" class="inline-flex items-center justify-self-end" @click.prevent="OnRemoveFileClicked">
          <span class="i-fluent:document-dismiss-16-filled" />
        </div>
      </div>
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
