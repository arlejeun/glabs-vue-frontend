<script setup lang="ts">
  // import { useState } from "vue-gtag-next";
  // const { isEnabled } = useState();
  // const enableTracking = () => {
  //   //isEnabled.value = true;
  // };
  // onMounted(() => {
  //   enableTracking()
  // })

</script>

<template>
  <notifications />
  <RouterView />
</template>

<style lang="scss">

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

}
</style>
