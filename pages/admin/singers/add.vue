<script setup lang="ts">
import type { LocalizedStringInterface } from '~/core/models/LocalizedString'

definePageMeta({
  layout: 'admin',
  middleware: ['authorize'],
  AuthMiddlewareOptions: {
    Role: 'Admin',
  },
})

const HttpClient = useHttpClient()

const Names = ref<LocalizedStringInterface[]>([
  {
    Text: '',
    Language: 'Japanese',
  },
])

const Nicknames = ref<LocalizedStringInterface[]>([
  {
    Text: '',
    Language: 'Japanese',
  },
])

async function OnSubmit(content: any) {
  await HttpClient.Post<string>('/Singers',
    {},
    {
      Names: content.names,
      Nicknames: content.nicknames,
      Birthday: new Date(content.birthday.year, content.birthday.month, content.birthday.day),
      Image: {
        File: await ToBase64(content.images[0].file as File),
        FileType: (content.images[0].file as File).type,
        FileName: (content.images[0].file as File).name,
      },
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
          Create · Singer
        </h2>
      </div>
      <div class="mb-4 mt-2 text-sm text-gray-400">
        Add a new singer to the catalog of Utapoi Karaoke.
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
          <div class="flex items-start justify-end gap-6 rounded-xl bg-secondary p-5">
            <!-- Names -->
            <div w-full>
              <FormKit v-slot="{ items, node, value }" :value="Names" type="list" dynamic name="names">
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
                        input: 'text-white',
                        inner: 'rounded-full bg-tertiary',
                        label: 'mb-1',
                        option: 'bg-tertiary !text-white',
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

            <!-- Birthday -->
            <div>
              <FormKit type="group" name="birthday">
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
                    }"
                    name="year"
                    label="Year"
                    placeholder="2000"
                    type="text"
                    validation="between:1900,2050"
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
                    }"
                    name="month"
                    label="Month"
                    placeholder="06"
                    type="text"
                    validation="between:1,12"
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
                    }"
                    name="day"
                    label="Day"
                    placeholder="14"
                    type="text"
                    validation="between:1,31"
                  />
                </div>
                <div class="text-sm text-gray-400 -mt-3">
                  The birthday of the singer.
                </div>
              </FormKit>
            </div>
          </div>

          <div class="mt-2 flex items-start justify-end gap-6 rounded-xl bg-secondary p-5">
            <!-- Nicknames -->
            <div w-full>
              <FormKit v-slot="{ items, node, value }" :value="Nicknames" type="list" dynamic name="nicknames">
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
                      :label="index === 0 ? 'Name' : ''"
                      :validation-messages="{
                        required: 'This field is required.',
                      }"
                      name="text"
                      placeholder="Singer nickname"
                      type="text"
                      validation="required"
                    />
                    <FormKit
                      v-motion-pop
                      :classes="{
                        input: 'text-white',
                        inner: 'rounded-full bg-tertiary',
                        label: 'mb-1',
                        option: 'bg-tertiary !text-white',
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
          </div>

          <div class="mt-2 flex items-start justify-between gap-4 rounded-xl bg-secondary p-5">
            <!-- Thumbnail -->
            <div class="w-1/2">
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
                name="images"
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
                input: '!rounded-full px-2 !bg-green-700 uppercase font-semibold',
              }"
            />
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>
