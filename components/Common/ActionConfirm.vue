<script setup lang="ts">
import { useConfirmDialog } from '@vueuse/core'

export interface ActionConfirmProps {
  title: string
  message: string
  icon?: string
  type?: 'danger' | 'warning' | 'info'
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

const props = withDefaults(defineProps<ActionConfirmProps>(), {
  icon: 'carbon:information',
  type: 'info',
  confirmText: 'Yes',
  cancelText: 'No',
  onConfirm: () => {},
  onCancel: () => {},
})

const Target = ref<HTMLElement | null>(null)

const { isRevealed, reveal, confirm, cancel } = useConfirmDialog()

function OnConfirmed() {
  props.onConfirm()
  confirm()
}

function GetBackgroundFromType(type: string) {
  switch (type) {
    case 'danger':
      return 'bg-latte-red/50 dark:bg-mocha-red/50'
    case 'warning':
      return 'bg-latte-yellow/50 dark:bg-mocha-yellow/50'
    case 'info':
      return 'bg-latte-blue/50 dark:bg-mocha-blue/50'
    default:
      return 'bg-latte-blue/50 dark:bg-mocha-blue/50'
  }
}

function GetIconFromType(type: string) {
  switch (type) {
    case 'danger':
      return 'i-carbon:warning'
    case 'warning':
      return 'i-carbon:warning-square'
    case 'info':
      return 'i-carbon:information'
    default:
      return 'i-carbon:help'
  }
}
</script>

<template>
  <div ref="Target">
    <slot name="button" :reveal="reveal">
      <button @click.prevent="reveal">
        Show
      </button>
    </slot>
    <Teleport
      v-if="isRevealed && Target !== null"
      to="body"
      class="relative"
    >
      <div
        class="absolute w-full border-2 border-latte-surface0 rounded-xl bg-latte-surface1 p-5 shadow-md dark:border-mocha-surface0 dark:bg-mocha-surface1" :style="{
          top: `${Target.getBoundingClientRect().top + 25}px`,
          left: `${Target.getBoundingClientRect().left - 405}px`,
          width: `450px`,
        }"
      >
        <div class="flex flex-col items-start gap-3 text-latte-text dark:text-mocha-text">
          <div :class="`rounded-xl w-min p-3 ${GetBackgroundFromType(type)}`">
            <div :class="`text-lg ${GetIconFromType(type)}`" />
          </div>
          <h2 class="font-sans text-lg font-semibold">
            {{ title }}
          </h2>
        </div>

        <p class="mt-6 font-sans text-latte-subtext1 dark:text-mocha-subtext1">
          {{ message }}
        </p>
        <div class="mt-4 w-full flex items-center justify-end gap-4 border-t border-latte-surface2 pt-4 text-latte-text dark:border-mocha-surface2 dark:text-mocha-text">
          <slot name="cancel">
            <button
              border="2 latte-red dark:mocha-red"
              font="semibold"
              hover="text-latte-text dark:text-mocha-base bg-latte-red dark:bg-mocha-red"
              p="x6 y1"
              rounded="full"
              text="latte-red dark:mocha-red"
              @click.prevent="cancel"
            >
              {{ cancelText }}
            </button>
          </slot>
          <slot name="confirm">
            <button
              bg="hover:"
              border="2 latte-green dark:mocha-green"
              font="semibold"
              hover="text-latte-text dark:text-mocha-base bg-latte-green dark:bg-mocha-green"
              p="x6 y1"
              rounded="full"
              text="latte-green dark:mocha-green"
              transition="all 150"
              @click.prevent="OnConfirmed"
            >
              {{ confirmText }}
            </button>
          </slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>
