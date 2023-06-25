<script setup lang="ts">
import { nanoid } from 'nanoid'
import { useSingersService } from '~/Composables/Services/SingersService'
import type { LocalizedStringInterface } from '~/Core/Models/LocalizedString'
import { CreateSingerRequest } from '~/Core/Requests/Singers/CreateSingerRequest'
import type { CreateSingerInfo } from '~/Core/Forms/CreateSingerInfo'
import LanguageOptions from '~/Core/Forms/Options/LanguageOptions'

definePageMeta({
  layout: 'admin',
  // middleware: ['authorize'],
  // AuthMiddlewareOptions: {
  //   Role: 'Admin',
  // },
})

const SingersService = useSingersService()

const Info = ref<CreateSingerInfo>({
  Names: [{
    Id: nanoid(),
    Text: '',
    Language: 'Japanese',
  }],
  Nicknames: [{
    Id: nanoid(),
    Text: '',
    Language: 'Japanese',
  }],
  BirthdayYear: 0,
  BirthdayMonth: 0,
  BirthdayDay: 0,
  ProfilePictureFile: null,
})

/**
 * Function called when the user adds a new name
 */
function OnAddName() {
  Info.value.Names.push(
    {
      Id: nanoid(),
      Text: '',
      Language: '',
    } as LocalizedStringInterface)
}

/**
 * Function called when the user removes a name
 * @param id The id of the name to remove
 */
function OnRemoveName(id: string) {
  const n = Info.value.Names
  const idx = n.findIndex((x: LocalizedStringInterface) => x.Id === id)

  n.splice(idx, 1)

  Info.value.Names = n
}

/**
 * Function called when the user adds a new nickname
 */
function OnAddNickname() {
  Info.value.Nicknames.push(
    {
      Text: '',
      Language: '',
    } as LocalizedStringInterface)
}

/**
 * Function called when the user removes a nickname
 * @param id The id of the nickname to remove
 */
function OnRemoveNickname(id: string) {
  const n = Info.value.Nicknames
  const idx = n.findIndex((x: LocalizedStringInterface) => x.Id === id)

  n.splice(idx, 1)

  Info.value.Nicknames = n
}

/**
 * Function called when the user submits the form
 */
async function OnSubmit() {
  const request = await CreateSingerRequest.FromInfoAsync(Info.value)

  await SingersService.CreateAsync(request)
  // localStorage.removeItem('Utapoi-Form-CreateSinger')
}

// On Mounted
onMounted(() => {
  // const data = localStorage.getItem('Utapoi-Form-CreateSinger')

  // if (data !== null)
  //   Info.value = JSON.parse(data)
})

/**
 * Watch for changes in the form and save them to local storage
 * so that the user can continue where they left off.
 */
watchDeep(Info, () => {
  // const d = Info.value

  // Note(Mikyan): We can't save the file to local storage so we remove it
  // d.ProfilePictureFile = null

  // localStorage.setItem('Utapoi-Form-CreateSinger', JSON.stringify(d))
})
</script>

<template>
  <div class="mx-auto h-full max-w-6xl px-12 py-8 container">
    <div class="mb-8">
      <div class="inline-flex items-center gap-4">
        <div class="h-0.75 w-14 rounded-full bg-mocha-surface2 dark:bg-latte-surface2" />

        <h2 class="text-2xl font-semibold text-latte-text dark:text-mocha-text">
          Create Singer
        </h2>
      </div>
      <div class="mb-4 mt-2 text-sm text-latte-subtext1 dark:text-mocha-subtext1">
        Add a new singer to the catalog of Utapoi Karaoke.
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
              <div v-for="(name, idx) in Info.Names" :key="name.Id" v-motion-pop class="flex items-center justify-start gap-6">
                <TextInputField
                  v-model="name.Text"
                  label="Name"
                  placeholder="Singer name"
                  :name="`singer-name-${name.Id}`"
                  :show-label="idx === 0"
                />

                <SelectInputField
                  v-model="name.Language"
                  label="Language"
                  placeholder="Select language"
                  :name="`singer-name-language-${idx}`"
                  :show-label="idx === 0"
                  :options="LanguageOptions"
                />

                <div
                  class="h-full flex items-center justify-center gap-3" :class="{
                    'mt-7': idx === 0,
                    'mt-1': idx > 0,
                  }"
                >
                  <div v-if="idx > 0" class="text-lg text-latte-red hover:cursor-pointer dark:text-mocha-red" @click="() => OnRemoveName(name.Id)">
                    <div class="i-fluent:delete-16-filled" />
                  </div>
                  <div class="text-lg text-latte-green hover:cursor-pointer dark:text-mocha-green" @click="OnAddName">
                    <div class="i-fluent:add-16-filled" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <TextInputField
                class="w-28"
                label="Year"
                placeholder="2000"
                name="singer-birthday-year"
                @update:model-value="(v: string) => Info.BirthdayYear = Number(v)"
              />
              <TextInputField
                class="w-28"
                label="Month"
                placeholder="01"
                name="singer-birthday-year"
                @update:model-value="(v: string) => Info.BirthdayMonth = Number(v)"
              />
              <TextInputField
                class="w-28"
                label="Day"
                placeholder="01"
                name="singer-birthday-year"
                @update:model-value="(v: string) => Info.BirthdayDay = Number(v)"
              />
            </div>
          </div>

          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <div class="flex flex-col gap-2">
              <div v-for="(nickname, idx) in Info.Nicknames" :key="nickname.Id" v-motion-pop class="flex items-center justify-start gap-6">
                <TextInputField
                  v-model="nickname.Text"
                  label="Nickname"
                  placeholder="Singer nickname"
                  :name="`singer-nickname-${nickname.Id}`"
                  :show-label="idx === 0"
                />

                <SelectInputField
                  v-model="nickname.Language"
                  label="Language"
                  placeholder="Select language"
                  :name="`singer-nickname-language-${idx}`"
                  :show-label="idx === 0"
                  :options="LanguageOptions"
                />

                <div
                  class="h-full flex items-center justify-center gap-3" :class="{
                    'mt-7': idx === 0,
                    'mt-1': idx > 0,
                  }"
                >
                  <div v-if="idx > 0" class="text-lg text-latte-red hover:cursor-pointer dark:text-mocha-red" @click="OnRemoveNickname(nickname.Id)">
                    <div class="i-fluent:delete-16-filled" />
                  </div>
                  <div class="text-lg text-latte-green hover:cursor-pointer dark:text-mocha-green" @click="OnAddNickname()">
                    <div class="i-fluent:add-16-filled" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <FileInputField
              class="w-1/2"
              label="Profile Picture"
              name="singer-profile-picture-file"
              @update:model-value="(v: Array<File>) => {
                Info.ProfilePictureFile = v[0]
              }"
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
