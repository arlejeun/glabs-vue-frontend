<script setup lang="ts">
// import page401 from '@/assets/images/pages/401.png'


</script>

<template>
  <div class="misc-wrapper">
    <div class="misc-center-content text-center mb-4">
      <!-- 👉 Title and subtitle -->
      <h1 class="text-h1 font-weight-medium">
        401
      </h1>
      <h5 class="text-h5 font-weight-medium mb-3">
        You are not authorized! 🔐
      </h5>
      <p>You don't have permission to access this page. Go Home!</p>
    </div>

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      
    </div>


  </div>
</template>

<style lang="scss">

.misc-footer-tree {
  inline-size: 8rem;
  inset-block-end: 3.5rem;
  inset-inline-start: 0.375rem;
}
</style>

<route lang="yaml">
meta:
  layout: BasicTopNavigationLayout
  title: Not Authorized
</route>
