<script setup lang="ts">
import { nanoid } from 'nanoid'
import type { LocalizedStringInterface } from '~/Core/Models/LocalizedString'
import type { CreateAlbumInfo } from '~/Core/Forms/CreateAlbumInfo'
import { CreateAlbumRequest } from '~/Core/Requests/Albums/CreateAlbumRequest'
import { useAlbumsService } from '~/Composables/Services/AlbumsService'
import type { Singer } from '~/Core/Models/Singer'
import { useSingersService } from '~/Composables/Services/SingersService'

definePageMeta({
  layout: 'admin',
  // middleware: ['authorize'],
  // AuthMiddlewareOptions: {
  //   Role: 'Admin',
  // },
})

const AlbumsService = useAlbumsService()
const SingersService = useSingersService()

const Info = ref<CreateAlbumInfo>({
  Titles: [{
    Id: nanoid(),
    Text: '',
    Language: 'Japanese',
  }],
  Singers: [],
  ReleaseDate: null,
  CoverFile: null,
})

/**
 * Function called when the user adds a new title
 */
function OnAddTitle() {
  Info.value.Titles.push(
    {
      Id: nanoid(),
      Text: '',
      Language: '',
    } as LocalizedStringInterface)
}

/**
 * Function called when the user removes a title
 * @param id The id of the title to remove
 */
function OnRemoveTitle(id: string) {
  const n = Info.value.Titles
  const idx = n.findIndex((x: LocalizedStringInterface) => x.Id === id)

  n.splice(idx, 1)

  Info.value.Titles = n
}

/**
 * Function called when the user search for a singer
 * @param query The name of the singer to search for
 */
async function SearchSingersAsync(query: string) {
  const singers = await SingersService.SearchAsync(query)

  return singers.map((singer: Singer) => ({
    text: singer.GetName('English'),
    value: singer.Id,
  }))
}

/**
 * Function called when the user submits the form
 */
async function OnSubmit() {
  const request = await CreateAlbumRequest.FromInfoAsync(Info.value)

  await AlbumsService.CreateAsync(request)
  localStorage.removeItem('Utapoi-Form-CreateAlbum')
}

// On Mounted
onMounted(() => {
  const data = localStorage.getItem('Utapoi-Form-CreateAlbum')

  if (data !== null)
    Info.value = JSON.parse(data)
})

/**
 * Watch for changes in the form and save them to local storage
 * so that the user can continue where they left off.
 */
watchDeep(Info, () => {
  const d = Info.value

  // Note(Mikyan): We can't save the file to local storage so we remove it
  d.CoverFile = null

  localStorage.setItem('Utapoi-Form-CreateAlbum', JSON.stringify(d))
})
</script>

<template>
  <div class="mx-auto h-full max-w-6xl px-12 py-8 container">
    <div class="mb-8">
      <div class="inline-flex items-center gap-4">
        <div class="h-0.75 w-14 rounded-full bg-mocha-surface2 dark:bg-latte-surface2" />

        <h2 class="text-2xl font-semibold text-latte-text dark:text-mocha-text">
          Create Album
        </h2>
      </div>
      <div class="mb-4 mt-2 text-sm text-latte-subtext1 dark:text-mocha-subtext1">
        Add a new album to the catalog of Utapoi Karaoke.
      </div>
    </div>
    <div>
      <div class="p-5">
        <form
          class="w-full flex flex-col items-start justify-start gap-2"
          @submit.prevent="OnSubmit"
        >
          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <div class="flex flex-col gap-2">
              <div v-for="(name, idx) in Info.Titles" :key="name.Id" v-motion-pop class="w-full flex items-center justify-start gap-6">
                <TextInputField
                  v-model="name.Text"
                  label="Title"
                  placeholder="Album title"
                  :name="`album-title-${name.Id}`"
                  :show-label="idx === 0"
                  :value="name.Text"
                />

                <SelectInputField
                  v-model="name.Language"
                  label="Language"
                  placeholder="Select language"
                  :name="`singer-name-language-${idx}`"
                  :show-label="idx === 0"
                  :options="[
                    { text: 'English', value: 'English' },
                    { text: 'Japanese', value: 'Japanese' },
                    { text: 'Chinese', value: 'Chinese' },
                    { text: 'French', value: 'French' },
                  ]"
                />

                <div
                  class="h-full flex items-center justify-center gap-3" :class="{
                    'mt-7': idx === 0,
                    'mt-1': idx > 0,
                  }"
                >
                  <div v-if="idx > 0" class="text-lg text-latte-red hover:cursor-pointer dark:text-mocha-red" @click="() => OnRemoveTitle(name.Id)">
                    <div class="i-fluent:delete-16-filled" />
                  </div>
                  <div class="text-lg text-latte-green hover:cursor-pointer dark:text-mocha-green" @click="OnAddTitle">
                    <div class="i-fluent:add-16-filled" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <TextInputField
                class="w-28"
                label="Year"
                name="album-release-date-year"
                placeholder="2000"
                :value="Info.ReleaseDate?.getFullYear().toString()"
                @update:model-value="(v: string) => Info.ReleaseDate !== null ? Info.ReleaseDate.setFullYear(Number(v)) : Info.ReleaseDate = new Date(Number(v), 0, 1)"
              />
              <TextInputField
                class="w-28"
                label="Month"
                name="album-release-date-year"
                placeholder="01"
                :value="(!Info.ReleaseDate ? '' : Info.ReleaseDate.getMonth() + 1).toString()"
                @update:model-value="(v: string) => Info.ReleaseDate !== null ? Info.ReleaseDate.setMonth(Number(v) - 1) : Info.ReleaseDate = new Date(0, Number(v) - 1, 1)"
              />
              <TextInputField
                class="w-28"
                label="Day"
                name="album-release-date-year"
                placeholder="01"
                :value="Info.ReleaseDate?.getDate().toString()"
                @update:model-value="(v: string) => Info.ReleaseDate !== null ? Info.ReleaseDate.setDate(Number(v)) : Info.ReleaseDate = new Date(0, 0, Number(v))"
              />
            </div>
          </div>

          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <TagInputField
              class="w-1/2"
              label="Singers"
              name="album-singers"
              placeholder="Search singers..."
              :searchable="true"
              :search="async (v: string) => await SearchSingersAsync(v)"
              @update:model-value="(v: Array<string>) => Info.Singers = v"
            />
          </div>

          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <FileInputField
              class="w-1/2"
              label="Cover Image"
              name="album-cover-file"
              @update:model-value="(v: Array<File>) => Info.CoverFile = v[0]"
            />
          </div>

          <div class="mt-4 w-full inline-flex justify-end">
            <button type="submit" class="rounded-full bg-latte-green px-4 py-2 font-semibold uppercase text-latte-base hover:cursor-pointer dark:bg-mocha-green dark:text-mocha-base">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
