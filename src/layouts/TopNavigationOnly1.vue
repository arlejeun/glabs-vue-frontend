<script lang="ts"></script>

<template>
  <div class="main-layout">
    <el-container class="pt-0">
      <!-- <el-header class="main-header">
        <NavBar1></NavBar1>
      </el-header>
     -->
        <BasicNavBar></BasicNavBar>

      <el-main class="main-content">
        <RouterView />
      </el-main>
      <el-footer class="footer">
        <div class="container">
      <div class="row align-items-center">
  
        <!-- Widget -->
        <div class="col-md-4">
          <div class="text-center text-md-start mb-3 mb-md-0">
            <a href="index.html"> <img class="h-30px" src="@/assets/images/genesys_monogram_detail.svg" alt="logo"> </a>
          </div> 
        </div>
        
        <!-- Widget -->
        <div class="col-md-6">
          <div class="text-white text-primary-hover"> Copyrights <a href="#" class="text-white">©2022 Genesys Drive</a>. All rights reserved. </div>
        </div>
  
        <!-- Widget -->
        <div class="col-md-4">
          <ul class="list-inline mb-0 text-center text-md-end">
            <li class="list-inline-item ms-2"><a href="#"><i class="text-white fab fa-facebook"></i></a></li>
            <li class="list-inline-item ms-2"><a href="#"><i class="text-white fab fa-instagram"></i></a></li>
            <li class="list-inline-item ms-2"><a href="#"><i class="text-white fab fa-linkedin-in"></i></a></li>
            <li class="list-inline-item ms-2"><a href="#"><i class="text-white fab fa-twitter"></i></a></li>
          </ul>
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
