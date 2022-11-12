<script setup lang="ts">
import { getRandomInt } from '@/utils/number'
import { useAxios } from '@vueuse/integrations/useAxios'


const x = ref(2)
const url = computed (() => {return `https://jsonplaceholder.typicode.com/todos/${x.value}`})
const { data, isLoading, isFinished, execute, error } = useAxios(url.value)

function test() {
  x.value = getRandomInt(10);
  execute(url.value)
}


</script>

<template>

  <button @click="test()">
    Execute
  </button>
  <p>Loading: {{ isLoading.toString() }}</p>
  <p>Finished: {{ isFinished.toString() }}</p>
  <p>Error: {{ error?.toString() }}</p>
  <pre lang="json">{{ data }}</pre>
</template>

<route lang="yaml">
meta:
  layout: BasicTopNavigationLayout
</route>
