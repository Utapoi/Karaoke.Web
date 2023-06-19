<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import { useAlbumsService } from '~/Composables/Services/AlbumsService'
import { useSingersService } from '~/Composables/Services/SingersService'
import type { LocalizedStringInterface } from '~/Core/Models/LocalizedString'
import { CreateAlbumRequest } from '~/Core/Requests/Albums/CreateAlbumRequest'

definePageMeta({
  layout: 'admin',
  // middleware: ['authorize'],
  // AuthMiddlewareOptions: {
  //   Role: 'Admin',
  // },
})

interface TagOption {
  label: string
  value: string
}

const ColorMode = useColorMode()

const AlbumsService = useAlbumsService()
const SingersService = useSingersService()

const Titles = ref<LocalizedStringInterface[]>([
  {
    Text: '',
    Language: 'Japanese',
  },
])

const Singers = ref<TagOption[]>([])

async function SearchSingersAsync(query: string) {
  const response = await SingersService.SearchAsync(query)

  return response.map(singer => ({
    label: `${singer.Names[0].Text} (${singer.Names[1].Text})`,
    value: singer.Id,
  }))
}

async function OnSubmit(content: any) {
  content.singers = Singers.value.map(s => s.value)

  const request = await CreateAlbumRequest.FromInfoAsync(content)

  await AlbumsService.CreateAsync(request)
}
</script>

<template>
  <div class="mx-auto h-full max-w-6xl px-12 py-8 container">
    <div class="mb-8">
      <div class="inline-flex items-center gap-4">
        <div class="bg-mocha-surface2 dark:bg-latte-surface2 h-0.75 w-14 rounded-full" />

        <h2 class="text-latte-text dark:text-mocha-text text-2xl font-semibold">
          Create Album
        </h2>
      </div>
      <div class="text-latte-subtext1 dark:text-mocha-subtext1 mb-4 mt-2 text-sm">
        Add a new album to the catalog of Utapoi Karaoke.
      </div>
    </div>
    <div>
      <div class="w-full flex items-start justify-end gap-6 rounded-xl p-5">
        <FormKit
          v-slot="{ state: { valid } }"
          type="form"
          :actions="false"
          @submit="OnSubmit"
        >
          <div class="bg-latte-surface0 dark:bg-mocha-surface0 flex items-start justify-end gap-6 rounded-xl p-5 shadow dark:shadow-none">
            <!-- Titles -->
            <div w-full>
              <FormKit v-slot="{ items, node, value }" :value="Titles" type="list" dynamic name="titles">
                <div v-for="(item, index) in items" :key="item as any" class="flex gap-4">
                  <FormKit
                    :index="index"
                    type="group"
                  >
                    <FormKit
                      v-motion-pop
                      :classes="{
                        input: 'text-latte-subtext1 dark:text-mocha-subtext1 font-sans',
                        inner: 'rounded-full px-2 bg-latte-crust dark:bg-mocha-crust',
                        label: 'mb-1 text-latte-text dark:text-mocha-text font-sans',
                        wrapper: 'w-xs',
                      }"
                      :label="index === 0 ? 'Name' : ''"
                      :validation-messages="{
                        required: 'This field is required.',
                      }"
                      name="text"
                      placeholder="Singer name"
                      type="text"
                      validation="required"
                    />
                    <FormKit
                      v-motion-pop
                      :classes="{
                        input: 'text-latte-subtext1 dark:text-mocha-subtext1 font-sans',
                        inner: 'rounded-full px-2 bg-latte-crust dark:bg-mocha-crust',
                        label: 'mb-1 text-latte-text dark:text-mocha-text font-sans',
                        option: 'bg-latte-crust dark:bg-mocha-crust !text-latte-subtext1 !dark:text-mocha-subtext1 font-sans',
                      }"
                      :label="index === 0 ? 'Language' : ''"
                      :options="['English', 'French', 'Japanese', 'Chinese']"
                      :validation-messages="{
                        required: 'This field is required.',
                      }"
                      name="language"
                      placeholder="Select language"
                      type="select"
                      validation="required"
                    />

                    <div class="h-full w-16 flex items-center justify-start" :class="{ 'pt-8.5': index === 0, 'pt-2.25': index !== 0 }">
                      <FormKit
                        v-if="index > 0"
                        v-motion-pop
                        :classes="{
                          input: '!text-latte-red !dark:text-mocha-red !text-lg !p-0.5 !bg-transparent',
                        }"
                        type="button"
                        @click="() => node.input(value.filter((_: any, i: number) => i !== index))"
                      >
                        <span class="i-fluent:delete-16-filled" />
                      </FormKit>
                      <FormKit
                        v-motion-pop
                        :classes="{
                          input: '!text-latte-green !dark:text-mocha-green !text-lg !p-0.5 !bg-transparent',
                        }"
                        type="button"
                        @click="() => node.input(value.concat({ Text: '', Language: 'Japanese' }))"
                      >
                        <span class="i-fluent:add-16-filled" />
                      </FormKit>
                    </div>
                  </FormKit>
                </div>
              </FormKit>
            </div>

            <!-- Release Date -->
            <div>
              <FormKit type="group" name="releaseDate">
                <div class="w-full flex items-start justify-end gap-4">
                  <FormKit
                    :classes="{
                      input: 'text-latte-subtext1 dark:text-mocha-subtext1 font-sans',
                      inner: 'rounded-full px-2 bg-latte-crust dark:bg-mocha-crust',
                      label: 'mb-1 text-latte-text dark:text-mocha-text font-sans',
                      wrapper: 'max-w-36',
                    }"
                    :validation-messages="{
                      between: '1900~2050 only.',
                    }"
                    name="year"
                    label="Year"
                    placeholder="2000"
                    type="text"
                    validation="between:1900,2050"
                  />
                  <FormKit
                    :classes="{
                      input: 'text-latte-subtext1 dark:text-mocha-subtext1 font-sans',
                      inner: 'rounded-full px-2 bg-latte-crust dark:bg-mocha-crust',
                      label: 'mb-1 text-latte-text dark:text-mocha-text font-sans',
                      wrapper: 'max-w-36',
                    }"
                    :validation-messages="{
                      between: '1~12 only.',
                    }"
                    name="month"
                    label="Month"
                    placeholder="06"
                    type="text"
                    validation="between:1,12"
                  />
                  <FormKit
                    :classes="{
                      input: 'text-latte-subtext1 dark:text-mocha-subtext1 font-sans',
                      inner: 'rounded-full px-2 bg-latte-crust dark:bg-mocha-crust',
                      label: 'mb-1 text-latte-text dark:text-mocha-text font-sans',
                      wrapper: 'max-w-36',
                    }"
                    :validation-messages="{
                      between: '1~31 only.',
                    }"
                    name="day"
                    label="Day"
                    placeholder="14"
                    type="text"
                    validation="between:1,31"
                  />
                </div>
                <div class="text-latte-subtext1 dark:text-mocha-subtext1 text-sm -mt-3">
                  The release date of the album.
                </div>
              </FormKit>
            </div>
          </div>

          <div class="bg-latte-surface0 dark:bg-mocha-surface0 mt-2 flex items-center justify-between gap-4 rounded-xl p-5">
            <!-- Singers -->
            <div class="w-full lg:w-1/2">
              <div
                class="text-latte-subtext1 dark:text-mocha-subtext1 mb-2 font-sans text-sm font-semibold"
              >
                Singers
              </div>
              <Multiselect
                v-model="Singers"
                :close-on-select="false"
                :delay="150"
                :filter-results="false"
                :min-chars="3"
                :options="async (query: string) => {
                  return await SearchSingersAsync(query)
                }"
                :resolve-on-load="false"
                :searchable="true"
                :class="{
                  'multiselect-dark': ColorMode.value === 'dark',
                  'multiselect-light': ColorMode.value === 'light',
                }"
                class="!border-latte-overlay1 !dark:border-mocha-overlay1 text-latte-text dark:text-mocha-text font-sans !rounded-full"
                mode="tags"
                placeholder="Select singers"
              />
            </div>
          </div>

          <div class="bg-latte-surface0 dark:bg-mocha-surface0 mt-2 flex items-start justify-between gap-4 rounded-xl p-5">
            <!-- Cover -->
            <div class="w-1/2">
              <FormKit
                :classes="{
                  fileItem: 'text-latte-subtext1 dark:text-mocha-subtext1 font-sans',
                  fileRemoveIcon: 'text-latte-subtext1 dark:text-mocha-subtext1',
                  help: 'text-latte-subtext1 dark:text-mocha-subtext1 pt-1 font-sans',
                  inner: 'rounded-full px-2 bg-latte-crust dark:bg-mocha-crust',
                  label: 'mb-1 text-latte-text dark:text-mocha-text font-sans',
                  wrapper: '!max-w-full',
                }"
                :validation-messages="{
                  required: 'This field is required.',
                }"
                accept=".jpg,.jpeg,.png,.webp"
                name="coverFiles"
                help="Accepted formats: jpg, jpeg, png, webp. Max size: 100 KB."
                label="Profile Picture File"
                multiple="false"
                type="file"
                validation="required"
              />
            </div>
          </div>

          <div class="mt-4 w-full inline-flex justify-end">
            <FormKit
              type="submit"
              :disabled="!valid"
              :classes="{
                input: '!rounded-full px-2 !bg-latte-green !dark:bg-mocha-green uppercase font-semibold font-sans',
              }"
            />
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css">
</style>

<style>
.multiselect-dark {
  --ms-bg: #171727;
  --ms-dropdown-bg: #171727;
  --ms-border-color: #444;
  --ms-tag-bg: #7f849c;
  --ms-tag-color: #fff;
  --ms-option-bg-pointed: #171727;
  --ms-option-color-pointed: #fff;
  --ms-option-bg-selected: #7f849c;
  --ms-option-bg-selected-pointed: #7f849c;
  --ms-ring-color: #b4befe;
  --ms-ring-width: 1px;
}

.multiselect-light {
  --ms-bg: #dce0e8;
  --ms-dropdown-bg: #dce0e8;
  --ms-border-color: #444;
  --ms-tag-bg: #8c8fa1;
  --ms-tag-color: #4c4f69;
  --ms-option-bg-pointed: #dce0e8;
  --ms-option-color-pointed: #4c4f69;
  --ms-option-bg-selected: #dce0e8;
  --ms-option-bg-selected-pointed: #dce0e8;
  --ms-ring-color: #7287fd;
  --ms-ring-width: 1px;
}

.multiselect-dark .multiselect-tags-search {
  background-color: #171727!important;
}

.multiselect-light .multiselect-tags-search {
  background-color: #dce0e8!important;
}

.multiselect-tag {
  border-radius: 9999px;
}

.multiselect-search {
  border-radius: 9999px;
}
</style>
