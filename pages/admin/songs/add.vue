<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import { useAlbumsService } from '~/Composables/Services/AlbumsService'
import { useSingersService } from '~/Composables/Services/SingersService'
import { useSongsService } from '~/Composables/Services/SongsService'
import type { LocalizedStringInterface } from '~/core/Models/LocalizedString'
import { CreateSongRequest } from '~/core/Requests/Songs/CreateSongRequest'

definePageMeta({
  layout: 'admin',
  // middleware: ['authorize'],
  // AuthMiddlewareOptions: {
  //   Role: 'Admin',
  // },
})

const AlbumsService = useAlbumsService()
const SingersService = useSingersService()
const SongsService = useSongsService()

interface TagOption {
  label: string
  value: string
}

const Titles = ref<LocalizedStringInterface[]>([{
  Text: '',
  Language: 'Japanese',
}])

const KaraokeFiles = ref<any[]>([{
  Files: [] as File[],
  Language: 'Japanese',
}])

const LyricsFiles = ref<any[]>([{
  Files: [] as File[],
  Language: 'Japanese',
}])

const Tags = ref<TagOption[]>([])
const TagsOptions = ref<TagOption[]>([])
const Singers = ref<TagOption[]>([])
const Albums = ref<TagOption[]>([])

async function SearchSingers(query: string): Promise<TagOption[]> {
  const response = await SingersService.SearchAsync(query)

  return response.map(singer => ({
    label: `${singer.Names[0].Text} (${singer.Names[1].Text})`,
    value: singer.Id,
  }))
}

async function SearchAlbums(query: string): Promise<TagOption[]> {
  const response = await AlbumsService.SearchAsync(query)

  return response.map(album => ({
    label: `${album.Titles[0].Text} (${album.Titles[1].Text})`,
    value: album.Id,
  }))
}

async function OnSubmit(content: any): Promise<void> {
  content.tags = Tags.value.map(t => t.value)
  content.singers = Singers.value.map(s => s.value)
  content.albums = Albums.value.map(a => a.value)

  const r = await CreateSongRequest.FromInfoAsync(content)

  await SongsService.CreateAsync(r)
}
</script>

<template>
  <div class="mx-auto h-full max-w-6xl px-12 py-8 container">
    <div class="mb-8">
      <div class="inline-flex items-center gap-4">
        <div class="h-0.75 w-14 rounded-full dark:bg-white" />

        <h2 class="text-2xl font-semibold">
          Create Song
        </h2>
      </div>
      <div class="mb-4 mt-2 text-sm text-gray-400">
        Add a new song to the catalog of Utapoi Karaoke.<br>
        <span class="font-semibold text-red-400">Don't forget to create a new singer and a new album before if necessary.</span>
      </div>
    </div>
    <div>
      <div>
        <FormKit
          v-slot="{ state: { valid } }"
          type="form"
          :actions="false"
          @submit="OnSubmit"
        >
          <div class="flex items-start justify-end gap-6 rounded-xl bg-secondary p-5">
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
                        input: 'text-white',
                        inner: 'rounded-full px-2 bg-tertiary',
                        label: 'mb-1',
                        wrapper: 'w-xs',
                      }"
                      :label="index === 0 ? 'Title' : ''"
                      :validation-messages="{
                        required: 'This field is required.',
                      }"
                      name="text"
                      placeholder="Song title"
                      type="text"
                      validation="required"
                    />
                    <FormKit
                      v-motion-pop
                      :classes="{
                        input: 'text-white',
                        inner: 'rounded-full bg-tertiary',
                        label: 'mb-1',
                        option: 'bg-tertiary text-white',
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
                          input: '!text-red-400 !text-lg !p-0.5 !bg-transparent',
                        }"
                        type="button"
                        @click="() => node.input(value.filter((_: any, i: number) => i !== index))"
                      >
                        <span class="i-fluent:delete-16-filled" />
                      </FormKit>
                      <FormKit
                        v-motion-pop
                        :classes="{
                          input: '!text-green-400 !text-lg !p-0.5 !bg-transparent',
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
                      inner: 'rounded-full px-2 bg-tertiary',
                      input: 'text-white',
                      label: 'mb-1',
                      wrapper: 'max-w-36',
                    }"
                    :validation-messages="{
                      between: '1900~2050 only.',
                      required: 'Required.',
                    }"
                    name="year"
                    label="Year"
                    placeholder="2000"
                    type="text"
                    validation="between:1900,2050|required"
                  />
                  <FormKit
                    :classes="{
                      inner: 'rounded-full px-2 bg-tertiary',
                      input: 'text-white',
                      label: 'mb-1',
                      wrapper: 'max-w-36',
                    }"
                    :validation-messages="{
                      between: '1~12 only.',
                      required: 'Required.',
                    }"
                    name="month"
                    label="Month"
                    placeholder="06"
                    type="text"
                    validation="between:1,12|required"
                  />
                  <FormKit
                    :classes="{
                      inner: 'rounded-full px-2 bg-tertiary',
                      input: 'text-white',
                      label: 'mb-1',
                      wrapper: 'max-w-36',
                    }"
                    :validation-messages="{
                      between: '1~31 only.',
                      required: 'Required.',
                    }"
                    name="day"
                    label="Day"
                    placeholder="14"
                    type="text"
                    validation="between:1,31|required"
                  />
                </div>
                <div class="text-sm text-gray-400 -mt-3">
                  The release date of the song.
                </div>
              </FormKit>
            </div>
          </div>

          <!-- Singers / Albums -->
          <div class="mt-2 flex items-center justify-between gap-4 rounded-xl bg-secondary p-5">
            <!-- Singers -->
            <div w-full>
              <div
                class="mb-2 text-sm font-semibold text-white"
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
                  return await SearchSingers(query)
                }"
                :resolve-on-load="false"
                :searchable="true"
                class="multiselect-dark !border-gray-400 !rounded-full"
                mode="tags"
                placeholder="Select singers"
              />
            </div>

            <!-- Albums -->
            <div w-full>
              <div
                class="mb-2 text-sm font-semibold text-white"
              >
                Albums
              </div>
              <Multiselect
                v-model="Albums"
                :close-on-select="false"
                :delay="150"
                :filter-results="false"
                :min-chars="3"
                :options="async (query: string) => {
                  return await SearchAlbums(query)
                }"
                :resolve-on-load="false"
                :searchable="true"
                class="multiselect-dark !border-gray-400 !rounded-full"
                mode="tags"
                placeholder="Select albums"
              />
            </div>
          </div>

          <!-- Tags -->
          <div class="mt-2 rounded-xl bg-secondary p-5">
            <div
              class="mb-2 text-sm font-semibold text-white"
            >
              Tags
            </div>
            <Multiselect
              v-model="Tags"
              :close-on-select="false"
              :create-option="true"
              :options="TagsOptions"
              :searchable="true"
              class="multiselect-dark !border-gray-400 !rounded-full"
              mode="tags"
              placeholder="Select tags"
            />
          </div>

          <div class="mt-2 flex items-start justify-between gap-4 rounded-xl bg-secondary p-5">
            <!-- Thumbnail -->
            <div w-full>
              <FormKit
                :classes="{
                  fileItem: 'text-white',
                  fileRemoveIcon: 'text-white',
                  help: 'text-gray-400 pt-1',
                  inner: 'rounded-full px-2 bg-tertiary',
                  input: 'text-white',
                  label: 'mb-1',
                  wrapper: '!max-w-full',
                }"
                :validation-messages="{
                  required: 'This field is required.',
                }"
                accept=".jpg,.jpeg,.png,.webp"
                name="thumbnailFiles"
                help="Accepted formats: jpg, jpeg, png, webp. Max size: 100 KB."
                label="Thumbnail File"
                multiple="false"
                type="file"
                validation="required"
              />
            </div>
            <div w-full>
              <!-- Preview File -->
              <FormKit
                :classes="{
                  fileItem: 'text-white',
                  fileRemoveIcon: 'text-white',
                  help: 'text-gray-400 pt-1',
                  inner: 'rounded-full px-2 bg-tertiary',
                  input: 'text-white',
                  label: 'mb-1',
                  wrapper: '!max-w-full',
                }"
                :validation-messages="{
                  required: 'This field is required.',
                }"
                accept=".opus,.ogg"
                name="previewFiles"
                multiple="false"
                help="The duration must be 15 seconds."
                label="Preview File"
                type="file"
                validation="required"
              />
            </div>
          </div>

          <div class="mt-2 flex items-start justify-between gap-4 rounded-xl bg-secondary p-5">
            <!-- Voice File -->
            <div w-full>
              <FormKit
                :classes="{
                  fileItem: 'text-white',
                  fileRemoveIcon: 'text-white',
                  help: 'text-gray-400 pt-1',
                  inner: 'rounded-full px-2 bg-tertiary',
                  input: 'text-white',
                  label: 'mb-1',
                  wrapper: '!max-w-full',
                }"
                :validation-messages="{
                  required: 'This field is required.',
                }"
                accept=".opus,.ogg"
                name="voiceFiles"
                help="Accepted formats: opus, ogg. Max size: 1 MB."
                label="Voice File"
                multiple="false"
                type="file"
                validation="required"
              />
            </div>

            <!-- Instrumental File -->
            <div w-full>
              <FormKit
                :classes="{
                  fileItem: 'text-white',
                  fileRemoveIcon: 'text-white',
                  help: 'text-gray-400 pt-1',
                  inner: 'rounded-full px-2 bg-tertiary',
                  input: 'text-white',
                  label: 'mb-1',
                  wrapper: '!max-w-full',
                }"
                :validation-messages="{
                  required: 'This field is required.',
                }"
                accept=".opus,.ogg"
                name="intrumentalFiles"
                help="Accepted formats: opus, ogg. Max size: 1 MB."
                label="Instrumental File"
                multiple="false"
                type="file"
                validation="required"
              />
            </div>
          </div>

          <!-- Lyrics Files -->
          <div class="mt-2 rounded-xl bg-secondary p-5">
            <FormKit v-slot="{ items, node, value }" :value="LyricsFiles" type="list" dynamic name="lyricsFiles">
              <div v-for="(item, index) in items" :key="item as any" class="flex gap-4">
                <FormKit
                  type="group"
                  :index="index"
                >
                  <FormKit
                    v-motion-pop
                    :classes="{
                      fileItem: 'text-white',
                      fileRemoveIcon: 'text-white',
                      help: 'text-gray-400 pt-1',
                      input: 'text-white',
                      inner: 'rounded-full px-2 bg-tertiary',
                      label: 'mb-1',
                      wrapper: 'w-sm',
                    }"
                    :help="index === items.length - 1 ? 'Accepted formats: txt. Max size: 1 MB.' : ''"
                    :index="index"
                    :label="index === 0 ? 'Lyrics File' : ''"
                    :validation-messages="{
                      required: 'This field is required.',
                    }"
                    accept=".txt"
                    multiple="false"
                    name="files"
                    type="file"
                    validation="required"
                  />
                  <FormKit
                    v-motion-pop
                    :classes="{
                      input: 'text-white',
                      inner: 'rounded-full px-2 bg-tertiary',
                      label: 'mb-1',
                    }"
                    type="select"
                    :label="index === 0 ? 'Language' : ''"
                    name="language"
                    placeholder="Select language"
                    :options="['English', 'French', 'Japanese', 'Chinese']"
                    validation="required"
                    :validation-messages="{
                      required: 'This field is required.',
                    }"
                  />

                  <div class="h-full w-16 flex items-center justify-start" :class="{ 'pt-8.5': index === 0, 'pt-2.25': index !== 0 }">
                    <FormKit
                      v-if="index > 0"
                      v-motion-pop
                      :classes="{
                        input: '!text-red-400 !text-lg !p-0.5 !bg-transparent',
                      }"
                      type="button"
                      @click="() => node.input(value.filter((_: any, i: number) => i !== index))"
                    >
                      <span class="i-fluent:delete-16-filled" />
                    </FormKit>
                    <FormKit
                      v-motion-pop
                      :classes="{
                        input: '!text-green-400 !text-lg !p-0.5 !bg-transparent',
                      }"
                      type="button"
                      @click="() => node.input(value.concat({ Files: [], Language: 'Japanese' }))"
                    >
                      <span class="i-fluent:add-16-filled" />
                    </FormKit>
                  </div>
                </FormKit>
              </div>
            </FormKit>
          </div>

          <!-- Karaoke Files -->
          <div class="mt-2 rounded-xl bg-secondary p-5">
            <FormKit v-slot="{ items, node, value }" :value="KaraokeFiles" type="list" dynamic name="karaokeFiles">
              <div v-for="(item, index) in items" :key="item as any" class="flex gap-4">
                <FormKit
                  type="group"
                  :index="index"
                >
                  <FormKit
                    v-motion-pop
                    :classes="{
                      fileItem: 'text-white',
                      fileRemoveIcon: 'text-white',
                      help: 'text-gray-400 pt-1',
                      input: 'text-white',
                      inner: 'rounded-full px-2 bg-tertiary',
                      label: 'mb-1',
                      wrapper: 'w-sm',
                    }"
                    :help="index === items.length - 1 ? 'Accepted formats: ass.' : ''"
                    :index="index"
                    :label="index === 0 ? 'Karaoke File' : ''"
                    type="file"
                    name="files"
                    accept=".ass"
                    validation="required"
                    :validation-messages="{
                      required: 'This field is required.',
                    }"
                    multiple="false"
                  />
                  <FormKit
                    v-motion-pop
                    :classes="{
                      input: 'text-white',
                      inner: 'rounded-full px-2 bg-tertiary',
                      label: 'mb-1',
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
                        input: '!text-red-400 !text-lg !p-0.5 !bg-transparent',
                      }"
                      type="button"
                      @click="() => node.input(value.filter((_: any, i: number) => i !== index))"
                    >
                      <span class="i-fluent:delete-16-filled" />
                    </FormKit>
                    <FormKit
                      v-motion-pop
                      :classes="{
                        input: '!text-green-400 !text-lg !p-0.5 !bg-transparent',
                      }"
                      type="button"
                      @click="() => node.input(value.concat({ Files: [], Language: 'Japanese' }))"
                    >
                      <span class="i-fluent:add-16-filled" />
                    </FormKit>
                  </div>
                </FormKit>
              </div>
            </FormKit>
          </div>

          <div class="mt-4 w-full inline-flex justify-end">
            <FormKit
              type="submit"
              :disabled="!valid"
              :classes="{
                input: '!rounded-full px-2 !bg-green-700 uppercase font-semibold',
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
  --ms-bg: #2b2b2b;
  --ms-dropdown-bg: #2b2b2b;
  --ms-border-color: #444;
  --ms-tag-bg: #555;
  --ms-tag-color: #fff;
  --ms-option-bg-pointed: #555;
  --ms-option-color-pointed: #fff;
  --ms-option-bg-selected: #555;
  --ms-option-bg-selected-pointed: #555;
}

.multiselect-search {
  border-radius: 9999px;
}

.multiselect-tags-search {
  background-color: #2b2b2b!important;
}

.multiselect-tag  {
  border-radius: 9999px;
}
</style>
