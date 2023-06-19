<script setup lang="ts">
import { useSingersService } from '~/Composables/Services/SingersService'
import type { Singer } from '~/Core/Models/Singer'

definePageMeta({
  layout: 'admin',
  // middleware: ['authorize'],
  // AuthMiddlewareOptions: {
  //   Role: 'Admin',
  // },
})

const Route = useRoute()
const Router = useRouter()

const SingersService = useSingersService()

const Id = ref<string>(Route.params.id.toString())

if (Id.value === 'undefined')
  await Router.push('/admin/singers')

const CurrentSinger = ref<Singer | undefined>(await SingersService.GetAsync(Id.value))

if (CurrentSinger.value === undefined)
  await Router.push('/admin/singers')
</script>

<template>
  <div />
</template>
