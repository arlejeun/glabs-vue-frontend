<script setup lang="ts">

import { useGtag } from "vue-gtag-next";

const { event } = useGtag()
const trackWorkshopStart = () => {
  event('workshop_start', {
    'ws_category' : 'cloud',
    'ws_tags' : ['cx', 'gdemo'],
    'ws_name': 'CX as a code',
    'user_id': 314
  })
};

const trackWorkshopProgress = () => {
  event('workshop_progress', {
    'ws_category' : 'cloud',
    'ws_tags' : ['cx', 'gdemo'],
    'ws_name': 'CX as a code',
    'ws_chapter': 'Pre-requisites',
    'ws_section': 'Install Terraform',
    'progress': 10,
    'user_id': 314
  })
};

const trackSectionComplete = () => {
  event('section_complete', {
    'ws_name': 'CX as a code',
    'ws_chapter': 'Pre-requisites',
    'ws_section': 'Install Terraform',
    'user_id': 314
  })
};

const trackWorkshopComplete = () => {
  event('workshop_complete', {
    'ws_category' : 'cloud',
    'ws_tags' : ['cx', 'gdemo'],
    'ws_name': 'CX as a code',
    'user_id': 314
  })
};


</script>
<template>
  <!-- Header END -->

  <!-- **************** MAIN CONTENT START **************** -->
  <main>

    <!-- =======================
  Content START -->
    <section class="pt-3">
      <div class="container">
        <el-row>
          <el-button @click="trackWorkshopStart">Start Workshop</el-button>
          <el-button @click="trackWorkshopProgress">Progress Workshop</el-button>
          <el-button @click="trackSectionComplete">Complete Section</el-button>
          <el-button @click="trackWorkshopComplete">Complete Workshop</el-button>
        </el-row>

      </div>
    </section>
    <!-- =======================
  Content END -->

  </main>
  <!-- **************** MAIN CONTENT END **************** -->

</template>
  
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<route lang="yaml">
meta:
  layout: BasicTopNavigationLayout
</route>
