<script setup lang="ts">
import ArtistCard from '~/components/Artists/ArtistCard.vue'
import { useSingersService } from '~/Composables/Services/SingersService'
import type { Singer } from '~/Core/Models/Singer'

const SingersService = useSingersService()
const Singers = ref<Singer[]>(await SingersService.GetSingersAsync())
</script>

<template>
  <div class="mx-auto max-w-10xl w-full px-8 py-16">
    <div class="grid grid-cols-3 mx-auto mx-auto max-w-10xl w-full gap-4 2xl:grid-cols-6 3xl:grid-cols-7 lg:grid-cols-4 lg:grid-cols-5 md:grid-cols-4 xl:grid-cols-6">
      <ArtistCard v-for="singer in Singers" :key="singer.Id" :singer="singer" />
    </div>
  </div>
</template>
