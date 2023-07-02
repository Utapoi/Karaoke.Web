<script setup lang="ts">
import { nanoid } from 'nanoid'
import { useSingersService } from '~/Composables/Services/SingersService'
import { type IEditSingerInfo, IEditSingerInfoFromSinger } from '~/Core/Forms/EditSingerInfo'
import type { ILocalizedString } from '~/Core/Models/LocalizedString'
import type { Singer } from '~/Core/Models/Singer'
import { EditSingerRequest } from '~/Core/Requests/Singers/EditSingerRequest'
import LanguageOptions from '~/Core/Forms/Options/LanguageOptions'
import BloodTypeOptions from '~/Core/Forms/Options/BloodTypeOptions'

definePageMeta({
  layout: 'admin',
  // middleware: ['authorize'],
  // AuthMiddlewareOptions: {
  //   Role: 'Admin',
  // },
})

const Config = useRuntimeConfig()
const Route = useRoute()
const Router = useRouter()

const SingersService = useSingersService()

const SingerId = ref<string>(Route.params.id.toString())
const CurrentSinger = ref<Singer | undefined>(await SingersService.GetAsync(SingerId.value))

if (CurrentSinger.value === undefined)
  await Router.push('/admin/singers')

const EditSingerInfo = ref<IEditSingerInfo>(IEditSingerInfoFromSinger(CurrentSinger.value!))

/**
 * Function called when the user adds a new name
 */
function OnAddName(): void {
  EditSingerInfo.value.Names.push(
    {
      Id: nanoid(),
      Text: '',
      Language: '',
    } as ILocalizedString)
}

/**
 * Function called when the user removes a name
 * @param id The id of the name to remove
 */
function OnRemoveName(id: string): void {
  const n = EditSingerInfo.value.Names
  const idx = n.findIndex((x: ILocalizedString) => x.Id === id)

  n.splice(idx, 1)

  EditSingerInfo.value.Names = n
}

/**
 * Function called when the user adds a new nickname
 */
function OnAddNickname(): void {
  EditSingerInfo.value.Nicknames.push(
    {
      Text: '',
      Language: '',
    } as ILocalizedString)
}

/**
 * Function called when the user removes a nickname
 * @param id The id of the nickname to remove
 */
function OnRemoveNickname(id: string): void {
  const n = EditSingerInfo.value.Nicknames
  const idx = n.findIndex((x: ILocalizedString) => x.Id === id)

  n.splice(idx, 1)

  EditSingerInfo.value.Nicknames = n
}

/**
 * Function called when the user adds a new description
 */
function OnAddDescription(): void {
  EditSingerInfo.value.Descriptions.push(
    {
      Id: nanoid(),
      Text: '',
      Language: '',
    } as ILocalizedString)
}

/**
 * Function called when the user removes a description
 * @param id The id of the description to remove
 */
function OnRemoveDescription(id: string): void {
  const n = EditSingerInfo.value.Descriptions
  const idx = n.findIndex((x: ILocalizedString) => x.Id === id)

  n.splice(idx, 1)

  EditSingerInfo.value.Descriptions = n
}

/**
 * Function called when the user adds a new activity
 */
function OnAddActivity(): void {
  EditSingerInfo.value.Activities.push(
    {
      Id: nanoid(),
      Text: '',
      Language: '',
    } as ILocalizedString)
}

/**
 * Function called when the user removes a activity
 * @param id The id of the activity to remove
 */
function OnRemoveActivity(id: string): void {
  const n = EditSingerInfo.value.Activities
  const idx = n.findIndex((x: ILocalizedString) => x.Id === id)

  n.splice(idx, 1)

  EditSingerInfo.value.Activities = n
}

/**
 * Function called when the user submits the form
 */
async function OnSubmit() {
  if (EditSingerInfo.value === undefined)
    return

  await SingersService.EditAsync(
    SingerId.value,
    await EditSingerRequest.FromInfoAsync(EditSingerInfo.value),
  )
}
</script>

<template>
  <div v-if="CurrentSinger" class="mx-auto h-full max-w-6xl px-12 py-8 container">
    <div class="mb-8">
      <div class="inline-flex items-center gap-4">
        <div class="h-0.75 w-14 rounded-full bg-mocha-surface2 dark:bg-latte-surface2" />

        <h2 class="text-2xl font-semibold text-latte-text dark:text-mocha-text">
          Edit {{ CurrentSinger.GetName() }}
        </h2>
      </div>
      <div class="mb-4 mt-2 text-sm text-latte-subtext1 dark:text-mocha-subtext1">
        Edit information about {{ CurrentSinger.GetName() }}.
      </div>
    </div>
    <div>
      <div class="p-5">
        <form
          class="w-full flex flex-col items-start justify-start gap-2"
          @submit.prevent="OnSubmit"
        >
          <!-- Names -->
          <div class="w-full flex rounded-xl bg-latte-surface0 p-5 shadow dark:bg-mocha-surface0 dark:shadow-none">
            <div class="w-full flex flex-col gap-2">
              <div v-for="(name, idx) in EditSingerInfo.Names" :key="name.Id" v-motion-pop class="w-full flex items-center justify-start gap-2">
                <TextInputField
                  v-model="name.Text"
                  :value="name.Text"
                  class="w-1/2"
                  label="Name"
                  placeholder="Singer name"
                  :name="`singer-name-${name.Id}`"
                  :show-label="idx === 0"
                />

                <SelectInputField
                  v-model="name.Language"
                  :value="LanguageOptions.find((x) => x.value === name.Language)?.value ?? ''"
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
          </div>

          <!-- Personal Information -->
          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <div class="flex items-center gap-2">
              <SelectInputField
                label="Nationality"
                :value="LanguageOptions.find((x) => x.value === EditSingerInfo.Nationality)?.value ?? ''"
                placeholder="Select the nationality"
                name="singer-nationality"
                :options="LanguageOptions"
                @update:model-value="(v: string) => EditSingerInfo.Nationality = v"
              />
              <TextInputField
                :value="EditSingerInfo.Height.toString()"
                class="w-28"
                label="Height"
                placeholder="150"
                name="singer-height"
                @update:model-value="(v: string) => EditSingerInfo.Height = Number(v)"
              />
              <SelectInputField
                :value="BloodTypeOptions.find((x) => x.value === EditSingerInfo.BloodType)?.value ?? ''"
                label="Blood Type"
                placeholder="Select a blood type"
                name="singer-bloodtype"
                :options="BloodTypeOptions"
                @update:model-value="(v: string) => EditSingerInfo.BloodType = v"
              />
            </div>
            <!-- Birthday -->
            <div class="flex gap-2">
              <TextInputField
                :value="EditSingerInfo.BirthdayYear.toString()"
                class="w-28"
                label="Year"
                placeholder="2000"
                name="singer-birthday-year"
                @update:model-value="(v: string) => EditSingerInfo.BirthdayYear = Number(v)"
              />
              <TextInputField
                :value="(EditSingerInfo.BirthdayMonth + 1).toString()"
                class="w-28"
                label="Month"
                placeholder="01"
                name="singer-birthday-month"
                @update:model-value="(v: string) => EditSingerInfo.BirthdayMonth = Number(v) - 1"
              />
              <TextInputField
                :value="EditSingerInfo.BirthdayDay.toString()"
                class="w-28"
                label="Day"
                placeholder="01"
                name="singer-birthday-day"
                @update:model-value="(v: string) => EditSingerInfo.BirthdayDay = Number(v)"
              />
            </div>
          </div>

          <!-- Nicknames -->
          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <div class="w-full flex flex-col gap-2">
              <div v-for="(nickname, idx) in EditSingerInfo.Nicknames" :key="nickname.Id" v-motion-pop class="w-full flex items-center justify-start gap-2">
                <TextInputField
                  v-model="nickname.Text"
                  :value="nickname.Text"
                  class="w-1/2"
                  label="Nickname"
                  placeholder="Singer nickname"
                  :name="`singer-nickname-${nickname.Id}`"
                  :show-label="idx === 0"
                />

                <SelectInputField
                  v-model="nickname.Language"
                  :value="LanguageOptions.find((x) => x.value === nickname.Language)?.value ?? ''"
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

          <!-- Activities -->
          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <div class="w-full flex flex-col gap-2">
              <div v-for="(activity, idx) in EditSingerInfo.Activities" :key="activity.Id" v-motion-pop class="w-full flex items-center justify-start gap-2">
                <TextInputField
                  v-model="activity.Text"
                  :value="activity.Text"
                  class="w-1/2"
                  label="Activity"
                  placeholder="Singer, Voice Actress, etc..."
                  :name="`singer-activity-${activity.Id}`"
                  :show-label="idx === 0"
                />

                <SelectInputField
                  v-model="activity.Language"
                  :value="LanguageOptions.find((x) => x.value === activity.Language)?.value ?? ''"
                  label="Language"
                  placeholder="Select language"
                  :name="`singer-activity-language-${idx}`"
                  :show-label="idx === 0"
                  :options="LanguageOptions"
                />

                <div
                  class="h-full flex items-center justify-center gap-3" :class="{
                    'mt-7': idx === 0,
                    'mt-1': idx > 0,
                  }"
                >
                  <div v-if="idx > 0" class="text-lg text-latte-red hover:cursor-pointer dark:text-mocha-red" @click="OnRemoveActivity(activity.Id)">
                    <div class="i-fluent:delete-16-filled" />
                  </div>
                  <div class="text-lg text-latte-green hover:cursor-pointer dark:text-mocha-green" @click="OnAddActivity()">
                    <div class="i-fluent:add-16-filled" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Descriptions -->
          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <div class="w-full flex flex-col gap-2">
              <div v-for="(description, idx) in EditSingerInfo.Descriptions" :key="description.Id" v-motion-pop class="w-full flex items-center justify-start gap-2">
                <TextAreaInputField
                  v-model="description.Text"
                  :value="description.Text"
                  class="w-1/2"
                  label="Description"
                  placeholder="About the singer"
                  :name="`singer-description-${description.Id}`"
                  :show-label="idx === 0"
                />

                <SelectInputField
                  v-model="description.Language"
                  :value="LanguageOptions.find((x) => x.value === description.Language)?.value ?? ''"
                  label="Language"
                  placeholder="Select language"
                  :name="`singer-description-language-${idx}`"
                  :show-label="idx === 0"
                  :options="LanguageOptions"
                />

                <div
                  class="h-full flex items-center justify-center gap-3" :class="{
                    'mt-7': idx === 0,
                    'mt-1': idx > 0,
                  }"
                >
                  <div v-if="idx > 0" class="text-lg text-latte-red hover:cursor-pointer dark:text-mocha-red" @click="OnRemoveDescription(description.Id)">
                    <div class="i-fluent:delete-16-filled" />
                  </div>
                  <div class="text-lg text-latte-green hover:cursor-pointer dark:text-mocha-green" @click="OnAddDescription()">
                    <div class="i-fluent:add-16-filled" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile Picture -->
          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <div class="w-full flex flex-col items-start gap-2 lg:flex-row lg:gap-6">
              <div class="w-1/2 flex flex-col gap-2">
                <FileInputField
                  class="w-full"
                  label="Profile Picture"
                  name="singer-profile-picture-file"
                  placeholder="Select a new profile picture"
                  @update:model-value="(v: Array<File>) => {
                    EditSingerInfo.ProfilePictureFile = v[0]
                  }"
                />
                <div v-if="CurrentSinger.ProfilePicture !== null" class="w-min flex items-center gap-1 whitespace-nowrap rounded-full bg-latte-surface2 px-2 py-0.5 text-latte-green dark:bg-mocha-surface2 dark:text-mocha-green">
                  <div class="i-fluent:checkmark-12-filled text-lg" />
                  <div>{{ `${CurrentSinger.GetName()} already have a profile picture` }}</div>
                </div>
                <div v-else class="w-min flex items-center gap-1 whitespace-nowrap rounded-full bg-latte-surface2 px-2 py-0.5 text-latte-red dark:bg-mocha-surface2 dark:text-mocha-red">
                  <div class="i-fluent:error-circle-12-filled text-lg" />
                  <div>{{ `${CurrentSinger.GetName()} must have a profile picture. If you see this, then we have a bug.` }}</div>
                </div>
              </div>
              <div v-if="CurrentSinger.ProfilePicture !== null" class="flex flex-col items-start justify-items-start gap-2">
                <img :src="`${Config.public.API_URL}${CurrentSinger.ProfilePicture}`" class="h-36 w-36 rounded-xl object-cover">
              </div>
            </div>
          </div>

          <!-- Cover -->
          <div class="w-full flex flex-col justify-between gap-2 rounded-xl bg-latte-surface0 p-5 shadow xl:flex-row dark:bg-mocha-surface0 dark:shadow-none">
            <div class="w-full flex flex-col items-start gap-2 lg:flex-row lg:gap-6">
              <div class="w-1/2 flex flex-col gap-2">
                <FileInputField
                  class="w-full"
                  label="Cover"
                  name="singer-cover"
                  placeholder="Select a new cover image"
                  @update:model-value="(v: Array<File>) => {
                    EditSingerInfo.CoverFile = v[0]
                  }"
                />
                <div v-if="CurrentSinger.Cover !== null && CurrentSinger.Cover !== ''" class="w-min flex items-center gap-1 whitespace-nowrap rounded-full bg-latte-surface2 px-2 py-0.5 text-latte-green dark:bg-mocha-surface2 dark:text-mocha-green">
                  <div class="i-fluent:checkmark-12-filled text-lg" />
                  <div>{{ `${CurrentSinger.GetName()} already have a cover image.` }}</div>
                </div>
                <div v-else class="w-min flex items-center gap-1 whitespace-nowrap rounded-full bg-latte-surface2 px-2 py-0.5 text-latte-red dark:bg-mocha-surface2 dark:text-mocha-red">
                  <div class="i-fluent:error-circle-12-filled text-lg" />
                  <div>{{ `${CurrentSinger.GetName()} must have a cover. If you see this, then we have a bug.` }}</div>
                </div>
              </div>
              <div v-if="CurrentSinger.Cover !== null && CurrentSinger.Cover !== ''" class="flex flex-col items-start justify-items-start gap-2">
                <img :src="`${Config.public.API_URL}${CurrentSinger.Cover}`" class="h-36 w-36 rounded-xl object-cover">
              </div>
            </div>
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
