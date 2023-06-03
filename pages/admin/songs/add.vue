<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

useHead({
  title: 'Add Song - Admin',
})

interface SongInfo {
  Title: string
  ReleaseDate: Date
  SongCoverFile: File | null
  KaraokeFiles: File[]
}

const Info: SongInfo = reactive({
  Title: '',
  ReleaseDate: new Date(Date.now()),
  SongCoverFile: null,
  KaraokeFiles: Array<File>(),
})

function RemoveFile(index: number) {
  Info.KaraokeFiles.splice(index, 1)
}

function OnSongCoverSelected(e: Event) {
  const i = e.target as HTMLInputElement

  if (i.files !== null)
    Info.SongCoverFile = i.files[0]
}

function OnFileSelected(e: Event) {
  const i = e.target as HTMLInputElement

  if (i.files !== null)
    Info.KaraokeFiles.push(...Array.from(i.files))
}
</script>

<template>
  <div class="w-full px-12 pt-8">
    <div class="mb-8 inline-flex items-center gap-4">
      <div class="h-0.75 w-14 rounded-full dark:bg-white" />

      <h2 class="text-2xl font-semibold">
        Create · Song <span v-if="Info.Title !== ''">· {{ Info.Title }}</span>
      </h2>
    </div>
    <div class="max-w-xl w-full rounded-lg bg-[#222] p-6 shadow">
      <form class="max-w-lg w-full">
        <div class="mb-6 flex flex-wrap -mx-3">
          <div class="mb-6 w-full px-3 md:mb-0 md:w-2/3">
            <label class="mb-2 block text-xs font-bold tracking-wide uppercase text-gray-200" for="song-title">
              Title
            </label>
            <input id="song-title" v-model="Info.Title" class="mb-2 block w-full appearance-none border border-red-500 rounded bg-[#444] px-4 py-3 leading-tight text-gray-100 transition-all duration-200 focus:bg-[#666] focus:outline-none" type="text" placeholder="Title">
            <p class="text-xs italic text-red-500">
              Please fill out this field.
            </p>
          </div>
        </div>
        <div class="mb-6 flex flex-wrap -mx-3">
          <div class="mb-6 w-full px-3 md:mb-0 md:w-2/3">
            <label class="mb-2 block text-xs font-bold tracking-wide uppercase text-gray-200" for="song-release-date">
              Release date
            </label>
            <input id="song-release-date" v-model="Info.ReleaseDate" class="mb-2 block w-full appearance-none border border-red-500 rounded bg-[#444] px-4 py-3 leading-tight text-gray-100 transition-all duration-200 focus:bg-[#666] focus:outline-none" type="date">
            <p class="text-xs italic text-red-500">
              Please fill out this field.
            </p>
          </div>
        </div>

        <div class="flex flex-wrap -mx-3">
          <div class="mb-6 w-full px-3 md:mb-0 md:w-2/3">
            <label class="mb-2 block text-xs font-bold tracking-wide uppercase text-gray-200" for="song-release-date">
              Song Cover
            </label>
            <div>
              <input id="song_cover_file" class="sr-only" type="file" @change="OnSongCoverSelected">
              <div class="mb-2 block w-full py-3 leading-tight text-gray-100 transition-all duration-200 focus:outline-none">
                <label for="song_cover_file" class="rounded bg-[#666] px-4 py-3 hover:cursor-pointer">Choose file</label>
              </div>
            </div>
          </div>
        </div>

        <div v-if="Info.SongCoverFile !== null" class="mb-4 inline-flex items-center gap-3 rounded bg-gray-700 px-2 py-0.5">
          <span>{{ Info.SongCoverFile.name }} </span>
          <span class="i-fluent:delete-24-filled hover:cursor-pointer" @click="Info.SongCoverFile = null" />
        </div>

        <div class="flex flex-wrap -mx-3">
          <div class="mb-6 w-full px-3 md:mb-0 md:w-2/3">
            <label class="mb-2 block text-xs font-bold tracking-wide uppercase text-gray-200" for="song-release-date">
              Karaoke file
            </label>
            <div>
              <input id="multiple_files" class="sr-only" type="file" multiple @change="OnFileSelected">
              <div class="mb-2 block w-full py-3 leading-tight text-gray-100 transition-all duration-200 focus:outline-none">
                <label for="multiple_files" class="rounded bg-[#666] px-4 py-3 hover:cursor-pointer">Choose file</label>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex flex-wrap items-center gap-2">
          <div v-for="(file, idx) in Info.KaraokeFiles" :key="file.name">
            <div class="inline-flex items-center gap-3 rounded bg-gray-700 px-2 py-0.5">
              <span>{{ file.name }} </span>
              <span class="i-fluent:delete-24-filled hover:cursor-pointer" @click="RemoveFile(idx)" />
            </div>
          </div>
        </div>

        <button class="mt-6 rounded bg-green-700 px-4 py-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
