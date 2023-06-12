<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import type { Singer } from '~/core/models/Singer'

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

const Tags = ref<[]>([])
const TagsOptions = ref<TagOption[]>([])
const Singers = ref<[]>([])

async function SearchSinger(query: string) {
  const response = await HttpClient.Post<Singer[]>(`/Singers/Search?input=${query}`)

  if (response === undefined)
    return []

  return response.map(singer => ({
    label: `${singer.Names[0].Text} (${singer.Names[1].Text})`,
    value: singer.Id,
  }))
}

async function OnSubmit(content: any) {
  await HttpClient.Post<string>('/Songs',
    undefined,
    {
      Titles: content.titles,
      Singers: Singers.value, // [string]
      Tags: Tags.value, // [string]
      Birthday: content.birthday,
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
  <div class="mx-auto h-full max-w-7xl w-full px-12 py-8 container">
    <div class="mb-8">
      <div class="inline-flex items-center gap-4">
        <div class="h-0.75 w-14 rounded-full dark:bg-white" />

        <h2 class="text-2xl font-semibold">
          Create · Song
        </h2>
      </div>
      <div class="mb-4 mt-2 text-sm text-gray-400">
        Add a new song to the catalog of Utapoi Karaoke.<br>
        <span class="font-semibold text-red-400">Don't forget to create a new singer and a new album before if necessary.</span>
      </div>
    </div>
    <div>
      <div class="w-full rounded-xl bg-[#222] p-5 shadow">
        <FormKit
          type="form"
          @submit="OnSubmit"
        >
          <!-- Titles -->
          <FormKit v-slot="{ items, node, value }" :value="Titles" type="list" dynamic name="titles">
            <div v-for="(item, index) in items" :key="item" class="double w-full flex gap-4">
              <FormKit
                type="group"
                :index="index"
              >
                <FormKit
                  :classes="{
                    input: 'text-white',
                  }"
                  type="text"
                  label="Title"
                  name="text"
                  placeholder="Song title"
                  validation="required"
                  :validation-messages="{
                    required: 'This field is required.',
                  }"
                />
                <FormKit
                  :classes="{
                    input: 'text-white',
                  }"
                  type="select"
                  label="Language"
                  name="language"
                  placeholder="Select language"
                  :options="['English', 'French', 'Japanese', 'Chinese']"
                  validation="required"
                  :validation-messages="{
                    required: 'This field is required.',
                  }"
                />

                <FormKit
                  v-if="index > 0"
                  :classes="{
                    outer: 'pt-7.5',
                    input: 'text-white !text-sm !p-0.5 !bg-transparent',
                  }"
                  type="button"
                  @click="() => node.input(value.filter((_: any, i: number) => i !== index))"
                >
                  <span class="i-fluent:delete-16-filled" />
                </FormKit>
              </FormKit>
            </div>

            <FormKit
              :classes="{
                input: 'text-white uppercase !text-xs !px-2 !py-1 !bg-red-500',
              }"
              type="button"
              @click="() => node.input(value.concat({ text: '', language: 'Japanese' }))"
            >
              Add Title
            </FormKit>
            <pre wrap>{{ value }}</pre>
          </FormKit>

          <div class="my-5 h-0.5 w-full rounded-full px-8 dark:bg-gray-500" />

          <!-- Singers -->
          <div
            class="mb-1 mt-6 text-sm font-semibold text-white"
          >
            Singers
          </div>
          <div class="mb-4 max-w-md">
            <Multiselect
              v-model="Singers"
              class="multiselect-dark"
              mode="multiple"
              :close-on-select="false"
              :filter-results="false"
              :min-chars="3"
              :resolve-on-load="false"
              :delay="0"
              :searchable="true"
              :options="async (query: string) => {
                return await SearchSinger(query)
              }"
            />
            <pre wrap>{{ Singers }}</pre>
          </div>

          <!-- Tags -->
          <div
            class="mb-1 mt-6 text-sm font-semibold text-white"
          >
            Tags
          </div>
          <div class="mb-4 max-w-md">
            <Multiselect
              v-model="Tags"
              :options="TagsOptions"
              mode="tags"
              :close-on-select="false"
              :searchable="true"
              :create-option="true"
              class="multiselect-dark"
            />
            <pre wrap>{{ Tags }}</pre>
          </div>

          <!-- Release Date -->
          <FormKit
            :classes="{
              input: 'text-white',
            }"
            type="date"
            name="releaseDate"
            label="Release date"
          />

          <!-- Thumbnail -->
          <FormKit
            :classes="{
              input: 'text-white',
              fileItem: 'text-white',
            }"
            type="file"
            label="Thumbnail"
            name="thumbnails"
            accept=".jpg,.jpeg,.png,.webp"
            validation="required"
            :validation-messages="{
              required: 'This field is required.',
            }"
            multiple="false"
          />

          <!-- Voice File -->
          <FormKit
            :classes="{
              input: 'text-white',
              fileItem: 'text-white',
            }"
            type="file"
            label="Voice file"
            name="voiceFiles"
            accept=".opus,.ogg"
            validation="required"
            :validation-messages="{
              required: 'This field is required.',
            }"
            multiple="false"
          />

          <!-- Instrumental File -->
          <FormKit
            :classes="{
              input: 'text-white',
              fileItem: 'text-white',
            }"
            type="file"
            label="Instrumental file"
            name="intrumentalFiles"
            accept=".opus,.ogg"
            validation="required"
            :validation-messages="{
              required: 'This field is required.',
            }"
            multiple="false"
          />

          <!-- Preview File -->
          <FormKit
            :classes="{
              input: 'text-white',
              fileItem: 'text-white',
              help: 'text-gray-400 font-semibold italic',
            }"
            type="file"
            label="Preview file"
            name="intrumentalFiles"
            accept=".opus,.ogg"
            validation="required"
            :validation-messages="{
              required: 'This field is required.',
            }"
            help="The duration must be 15 seconds."
            multiple="false"
          />

          <!-- Karaoke Files -->
          <FormKit v-slot="{ items, node, value }" :value="KaraokeFiles" type="list" dynamic name="karaokeFiles">
            <div v-for="(item, index) in items" :key="item" class="double w-full flex gap-4 pt-6">
              <FormKit
                type="group"
                :index="index"
              >
                <FormKit
                  :classes="{
                    input: 'text-white',
                    fileItem: 'text-white',
                  }"
                  type="file"
                  :index="index"
                  label="Karaoke file"
                  name="files"
                  accept=".ass"
                  validation="required"
                  :validation-messages="{
                    required: 'This field is required.',
                  }"
                  multiple="false"
                />
                <FormKit
                  :classes="{
                    input: 'text-white',
                  }"
                  type="select"
                  label="Language"
                  name="language"
                  placeholder="Select language"
                  :options="['English', 'French', 'Japanese', 'Chinese']"
                  validation="required"
                  :validation-messages="{
                    required: 'This field is required.',
                  }"
                />

                <FormKit
                  v-if="index > 0"
                  :classes="{
                    outer: 'pt-7.5',
                    input: 'text-white !text-sm !p-0.5 !bg-transparent',
                  }"
                  type="button"
                  @click="() => node.input(value.filter((_: any, i: number) => i !== index))"
                >
                  <span class="i-fluent:delete-16-filled" />
                </FormKit>
              </FormKit>
            </div>

            <FormKit
              :classes="{
                input: 'text-white uppercase !text-xs !px-2 !py-1 !bg-red-500',
              }"
              type="button"
              @click="() => node.input(value.concat({ files: [], language: 'Japanese' }))"
            >
              Add Karaoke
            </FormKit>
            <pre wrap>{{ value }}</pre>
          </FormKit>

          <div class="my-5 h-0.5 w-full rounded-full px-8 dark:bg-gray-500" />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css">
</style>

<style>
.multiselect-dark {
  --ms-bg: #222;
  --ms-dropdown-bg: #222;
  --ms-border-color: #444;
  --ms-tag-bg: #555;
  --ms-tag-color: #fff;
  --ms-option-bg-pointed: #555;
  --ms-option-color-pointed: #fff;
  --ms-option-bg-selected: #555;
  --ms-option-bg-selected-pointed: #555;
}

.multiselect-tags-search {
  background-color: #222!important;
}
</style>
