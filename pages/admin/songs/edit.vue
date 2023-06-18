<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import type { Singer } from '~/Core/Models/Singer'
import type { Song } from '~/Core/Models/Song'

definePageMeta({
  layout: 'admin',
  middleware: ['authorize'],
  AuthMiddlewareOptions: {
    Role: 'Admin',
  },
})

interface LocalizedString {
  text: string
  language: string
}

interface LocalizedFile {
  files: File[]
  language: string
}

interface TagOption {
  label: string
  value: string
}

const HttpClient = useHttpClient()

const Titles = ref<LocalizedString[]>([{
  text: '',
  language: 'Japanese',
}])

const KaraokeFiles = ref<LocalizedFile[]>([{
  files: [] as File[],
  language: 'Japanese',
}])

const Values = ref<any>()

const Tags = ref<[]>([])
const TagsOptions = ref<TagOption[]>([])
const Singers = ref<[]>([])
const Albums = ref<[]>([])

async function GetSong(id: string) {
  const response = await HttpClient.Get<Song>(`/Songs/${id}`)

  if (response === undefined)
    return

  Values.value = {
    titles: response.Titles.map((t) => {
      return {
        text: t.Text,
        language: t.Language,
      }
    }),
    singers: response.Singers.map((s) => {
      return {
        label: `${s.Names[0].Text} (${s.Names[1].Text})`,
        value: s.Id,
      }
    }),
    albums: response.Albums.map((a) => {
      return {
        label: `${a.Titles[0].Text} (${a.Titles[1].Text})`,
        value: a.Id,
      }
    }),
    tags: response.Tags.map((t) => {
      return {
        label: t.Name,
        value: t.Id,
      }
    }),
    releaseDate: {
      year: response.ReleaseDate.getFullYear(),
      month: response.ReleaseDate.getMonth(),
      day: response.ReleaseDate.getDate(),
    },
  }
}

async function SearchSingers(query: string) {
  const response = await HttpClient.Post<Singer[]>(`/Singers/Search?input=${query}`)

  if (response === undefined)
    return []

  return response.map(singer => ({
    label: `${singer.Names[0].Text} (${singer.Names[1].Text})`,
    value: singer.Id,
  }))
}

async function SearchAlbums(query: string) {
  // TODO: AlbumsService.Search
}

async function OnSubmit(content: any) {
  // TODO: Only send the necessary data
  await HttpClient.Patch<string>('/Songs',
    {},
    {
      Titles: content.titles,
      Singers: Singers.value, // [string]
      Tags: Tags.value, // [string]
      ReleaseDate: new Date(content.releaseDate.year, content.releaseDate.month, content.releaseDate.day),
      Thumbnail: {
        File: await ToBase64(content.thumbnails[0].file as File),
        FileType: (content.thumbnails[0].file as File).type,
        FileName: (content.thumbnails[0].file as File).name,
      },
      VoiceFile: {
        File: await ToBase64(content.voiceFiles[0] as File),
        FileType: (content.voiceFiles[0] as File).type,
        FileName: (content.voiceFiles[0] as File).name,
      },
      InstrumentalFile: {
        File: await ToBase64(content.instrumentalFiles[0] as File),
        FileType: (content.instrumentalFiles[0] as File).type,
        FileName: (content.instrumentalFiles[0] as File).name,
      },
      PreviewFile: {
        File: await ToBase64(content.previewFiles[0] as File),
        FileType: (content.previewFiles[0] as File).type,
        FileName: (content.previewFiles[0] as File).name,
      },
      KaraokeFiles: (await Promise.allSettled(content.karaokeFiles.map(async (k: any) => {
        return {
          File: await ToBase64(k.files[0].file as File),
          FileType: (k.files[0].file as File).type ?? 'subtitle/ass',
          Language: k.language,
          FileName: (k.files[0].file as File).name,
        }
      }))).map((e: any) => e.value),
    },
  )
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
                        @click="() => node.input(value.concat({ text: '', language: 'Japanese' }))"
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
                <!-- <FormKit
                  :classes="{
                    inner: 'rounded-full px-2 bg-tertiary',
                    input: 'text-white',
                    label: 'mb-1',
                    suffixIcon: 'text-white',
                  }"
                  type="date"
                  name="releaseDate"
                  label="Release date"
                /> -->
              </FormKit>
            </div>
          </div>

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
                name="thumbnails"
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
                name="intrumentalFiles"
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
                    :index="index"
                    type="file"
                    :label="index === 0 ? 'Karaoke File' : ''"
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
                      @click="() => node.input(value.concat({ files: [], language: 'Japanese' }))"
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
