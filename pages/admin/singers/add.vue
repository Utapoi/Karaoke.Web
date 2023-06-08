<script setup lang="ts">
interface LocalizedString {
  text: string
  language: string
}

definePageMeta({
  layout: 'admin',
  middleware: ['admin-only'],
})

const HttpClient = useHttpClient()

const Names = ref<LocalizedString[]>([
  {
    text: '',
    language: 'Japanese',
  },
])

const Nicknames = ref<LocalizedString[]>([
  {
    text: '',
    language: 'Japanese',
  },
])

async function OnSubmit(content: any) {
  await HttpClient.Post<string>('/Singers', {
    headers: {
      Accept: '*/*',
    },
    body: {
      Names: content.names,
      Nicknames: content.nicknames,
      Birthday: content.birthday,
      Image: {
        File: await ToBase64(content.images[0].file as File),
        FileType: (content.images[0].file as File).type,
        FileName: (content.images[0].file as File).name,
      },
    },
  })
}
</script>

<template>
  <div class="mx-auto h-full w-full px-12 py-8 container">
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
      <div class="w-full rounded-xl bg-[#222] p-5 shadow">
        <FormKit
          type="form"
          @submit="OnSubmit"
        >
          <FormKit v-slot="{ items, node, value }" :value="Names" type="list" dynamic name="names">
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
                  label="Name"
                  name="text"
                  placeholder="Name"
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
              Add Name
            </FormKit>
            <pre wrap>{{ value }}</pre>
          </FormKit>

          <div class="my-5 h-0.5 w-full rounded-full px-8 dark:bg-gray-500" />

          <FormKit v-slot="{ items, node, value }" :value="Nicknames" type="list" dynamic name="nicknames">
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
                  label="Nickname"
                  name="text"
                  placeholder="Nickname"
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

          <FormKit
            :classes="{
              input: 'text-white',
            }"
            type="date"
            name="birthday"
            label="Birthday"
          />
          <FormKit
            :classes="{
              input: 'text-white',
              fileItem: 'text-white',
            }"
            type="file"
            label="Profile picture"
            name="images"
            accept=".jpg,.jpeg,.png,.webp"
            validation="required"
            :validation-messages="{
              required: 'This field is required.',
            }"
            multiple="false"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
