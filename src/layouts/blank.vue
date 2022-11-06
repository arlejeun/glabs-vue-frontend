<script lang="ts">
export default defineComponent({
  setup() {
    const routerView = resolveComponent('router-view')

    return () => h('div', { class: 'layout-wrapper layout-blank' }, h(routerView))
  },
})
</script>

<template>
  <RouterView />
</template>

