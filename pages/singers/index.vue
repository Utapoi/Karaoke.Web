<script setup lang="ts">
import ArtistCard from '~/components/artists/ArtistCard.vue'
import { Singer, type SingerInterface } from '~/core/models/Singer'

const AoiYuukiInterface: SingerInterface = {
  Id: '1',
  Names: [
    {
      Language: 'English',
      Text: 'Yuuki Aoi',
    },
    {
      Language: 'Japanese',
      Text: '悠木碧',
    },
  ],
  Albums: [],
  Songs: [],
  ProfilePicture: 'https://s4.anilist.co/file/anilistcdn/staff/large/n101686-PTd0lQZMsmcv.png',
}

const NanaMizukiInterface: SingerInterface = {
  Id: '2',
  Names: [
    {
      Language: 'English',
      Text: 'Mizuki Nana',
    },
    {
      Language: 'Japanese',
      Text: '水樹奈々',
    },
  ],
  Albums: [],
  Songs: [],
  ProfilePicture: 'https://s4.anilist.co/file/anilistcdn/staff/large/n95081-qto4UanYkpQT.png',
}

const AoiYuuki = new Singer(AoiYuukiInterface)
const NanaMizuki = new Singer(NanaMizukiInterface)
</script>

<template>
  <div class="mx-auto max-w-10xl w-full px-8 py-16">
    <div class="grid grid-cols-3 mx-auto mx-auto max-w-10xl w-full gap-4 2xl:grid-cols-7 3xl:grid-cols-8 lg:grid-cols-4 lg:grid-cols-5 md:grid-cols-4 xl:grid-cols-6">
      <ArtistCard :singer="AoiYuuki" />
      <ArtistCard :singer="NanaMizuki" />
    </div>
  </div>
</template>
