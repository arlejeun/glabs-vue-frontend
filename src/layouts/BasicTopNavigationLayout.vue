<script setup lang="ts">
import BasicFooter from '@/components/layouts/BasicFooter.vue';
</script>

<template>
  <div class="main-layout">
    <el-container class="pt-0">
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

.main-layout {
  position: relative;
  min-height: 100vh;
}
.main-content {
  padding: 0 0 0 0;
}

.footer {
  background-color: var(--el-color-info);
  font-family: AmazonEmberBold, Helvetica, Arial, "Sans-Serif";
  padding: 15px 0;
  position: absolute;
  bottom: 5px;
  width: 100%;
  height: 2.5 rem;
}
</style>
