<script setup lang="ts">
//const theme = useStorage('data-theme', undefined)
// const root = document.documentElement
// if (theme.value === 'dark' && theme.value !== undefined)
//   root.classList.add('dark-mode')
// else
//   root.classList.remove('dark-mode')
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
// @import "@/assets/sass/workshops/home/site.scss";

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
