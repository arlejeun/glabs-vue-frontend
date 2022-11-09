<script lang="ts"></script>

<template>
  <div class="main-layout">
    <el-container>
      <el-header class="main-header">
        <NavBar></NavBar>
      </el-header>

      <el-main class="main-content">
        <RouterView />
      </el-main>
      <el-footer class="footer">
        <div class="container text-center">
          <div class="row">
            <div class="col align-self-center">
              <p>
                <a href="https://www.genesys.com/company/legal/privacy-policy">Privacy</a>
                |
                <a href="https://www.genesys.com/company/legal/terms-of-use">Site terms</a>
                | Copyright © 2022, Genesys. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<style>
.main-header {
  background-color: var(--el-color-primary);
  padding-left: 0;
  padding-right: 0;
  top: 0;
}

.main-content {
  background-color: var(--el-color-success);
  padding: 0 0 15px 0;
}

.footer {
  background-color: var(--el-color-info);
  font-family: AmazonEmberBold, Helvetica, Arial, "Sans-Serif";
  padding: 15px 0;
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>
