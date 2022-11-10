<script lang="ts">
import BasicFooter from '@/components/layouts/BasicFooter.vue';
</script>

<template>
  <div class="main-layout">
    <el-container class="pt-0">
      <!-- <el-header class="main-header">
        <NavBar1></NavBar1>
      </el-header>
     -->
      <BasicNavBar />

      <el-main class="main-content">
        <RouterView />
      </el-main>
      <el-footer class="footer">
        <BasicFooter />
      </el-footer>
    </el-container>
  </div>
</template>

<style>
.main-header {
  background-color: var(--el-color-primary);
  padding: 0 0 0 0;
  padding-right: 0;
  top: 0;
}

/* .main-content {
  padding: 0 0 0 0;
} */

.footer {
  background-color: var(--el-color-info);
  font-family: AmazonEmberBold, Helvetica, Arial, "Sans-Serif";
  padding: 15px 0;
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>
