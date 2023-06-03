<script setup lang="ts">
import type { SongDTO } from '~/api/models/SongDTO'
import SongCard from '~/components/songs/SongCard.vue'

const TakeThis: SongDTO = {
  id: '1',
  title: 'Take This! All Loaded!',
  artist: 'Yukine Chris (CV: Takagaki Ayahi)',
  album: {
    id: '1',
    title: 'Symphogear XV Character Song 4',
    albumArt: 'https://static.wikia.nocookie.net/senkizesshousymphogear/images/2/2d/Symphogear_XV_Character_Song_4.png',
    artist: 'Yukine Chris (CV: Takagaki Ayahi)',
    songs: [],
    tags: [],
  },
  duration: '4:20',
  tags: ['Anime', 'Symphogear', '???'],
  previewUrl: 'https://static.wikia.nocookie.net/senkizesshousymphogear/images/9/91/Take_this%21_All_loaded.ogg',
}

const Shinjidai: SongDTO = {
  id: '2',
  title: 'Shinjidai',
  artist: 'Uta (CV: Ado)',
  album: {
    id: '2',
    title: 'UTA from ONE PIECE FILM RED',
    albumArt: ' https://www.lyrical-nonsense.com/wp-content/uploads/2022/06/Ado-New-Genesis-UTA-from-ONE-PIECE-FILM-RED.jpg',
    artist: 'Uta (CV: Ado)',
    songs: [],
    tags: [],
  },
  duration: '3:58',
  tags: ['Movie', 'One Piece', '???'],
  previewUrl: 'https://youtu.be/1FliVTcX8bQ',
}

const RainbowFlower: SongDTO = {
  id: '3',
  title: 'Rainbow Flower',
  artist: 'Tachibana Hibiki (CV: Yuuki Aoi)',
  album: {
    id: '3',
    title: 'Symphogear G Character Song 2',
    albumArt: 'https://static.wikia.nocookie.net/senkizesshousymphogear/images/a/a5/Symphogear_G_Character_Song_2.jpg',
    artist: 'Tachibana Hibiki (CV: Yuuki Aoi)',
    songs: [],
    tags: [],
  },
  duration: '3:58',
  tags: ['Anime', 'Symphogear', '???'],
  previewUrl: 'https://static.wikia.nocookie.net/senkizesshousymphogear/images/f/f5/Rainbow_Flower.ogg',
}

// TODO: Remove this.
function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length
  let randomIndex

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}

const songs: SongDTO[] = shuffle([TakeThis, Shinjidai, RainbowFlower, TakeThis, Shinjidai, RainbowFlower])
</script>

<template>
  <div class="4xl:grid-cols-5 grid grid-cols-1 mx-auto w-full content-start gap-2 px-12 pt-8 3xl:grid-cols-3 lg:grid-cols-2">
    <div
      v-for="(song, idx) in songs"
      :key="idx"
    >
      <SongCard
        :song="song"
      />
    </div>
  </div>
</template>
