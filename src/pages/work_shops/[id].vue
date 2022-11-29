<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios'
import { useWorkshopStore } from '@/stores/workshop'
import type { IWorkshop } from '@/interfaces'
import VueMarkdown from 'vue-markdown-render'
import { useRoute } from 'vue-router'
import { useDateFormat, useNow } from '@vueuse/core'

const route = useRoute()

const wStore = useWorkshopStore()
const workshops = wStore.getAllWorkshops
const formatter = 'YYYY-MM-DD HH:mm:ss:SSS'
const formatted = useDateFormat(useNow(), formatter)

const md = '# header'

//const workshopUrl = `https://workshop.genesys.com/workshops-gdemo/workshop-${route.params.id}/`
const workshopUrl = `https://workshop.genesys.com/workshops-gdemo/workshop-cxAsCodeDevlab/`
//const workshopUrl = `/ws/gride-demo/public/index.html`

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
function workshopDefaultName(workshop: IWorkshop) {
  if (workshop.name && workshop.name.length > 0) {
    return workshop.name;
  } else {
    const idname = workshop.title.replace(/\s/g, "-");
    return idname;
  }
}

wStore.loadWorkshop(route.params.id)

//https://workshop.genesys.com/workshops-gdemo/workshop-cxAsCodeDevlab/ . --> ok
// https://workshop.genesys.com/workshops-gdemo/workshop-Automation-with-CX-as-Code/ --> ko
</script>

<template>
  <div>
    <!-- {{$route.params.id}} -->

    <div>
    <div class="row">
      <div class="col-12 col-md-8 pr-0 workshop">
        <div class="left-side common-layout">
          <el-container>

            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
              <el-breadcrumb-item>promotion list</el-breadcrumb-item>
              <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
            </el-breadcrumb>

            <el-header>Glide-Demo workshop</el-header>

            <el-steps :space="200" :active="1" finish-status="success">
              <el-step title="Done" />
              <el-step title="Processing" />
              <el-step title="Step 3" />
            </el-steps>

            <el-container>

              <el-aside width="300px">
                <h5 class="mb-2">Default colors</h5>
                <ul>
                  <li v-for="(item, index) in wStore.getWorkshopMenu">
                    {{item.name}}
                    <ul>
                      <li v-for="(subitem, subindex) in item.menus" >{{subitem.name}}
                      </li>
                    </ul>

                  </li>
                </ul>

                <!--el-menu default-active="2" class="el-menu--vertical" @open="handleOpen" @close="handleClose">
                  <el-menu-item v-for="(item, index) in wStore.getWorkshopMenu" >{{item.name}}
                    <span v-for="(subitem, subindex) in item.menus" >{{subitem.name}}</span>
                  </el-menu-item>
                </el-menu -->
              </el-aside>

              <el-main>
                <vue-markdown :source="wStore.getWorkshopPage" />
              </el-main>

            </el-container>

          </el-container>
        </div>
      </div>

      <div class="col-12 col-md-4 px-0">
        <div class="right-side">
          <div class="workshop-layout">
            <div class="container-fluid my-5">
              <div class="row mt-5">
                <div class="col-12">
                  <div class="text-3xl font-semibold text-gray-9000 pb-2 mr-2">
                    <div class="row">
                      <div class="col">
                        <h1 class="mb-4 p-1 text-left">Environments</h1>
                      </div>
                      <div class="col-auto">
                      </div>
                    </div>

                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  </div>

<!-- <p>Loading: {{ isLoading.toString() }}</p>
  <p>Finished: {{ isFinished.toString() }}</p>
  <p>Error: {{ error?.toString() }}</p> -->


</template>

<style lang="scss">
.workshop {
    height: "100%";
    width: "100%";
    background-color: white;
}
</style>

<route lang="yaml">
meta:
  layout: BasicTopNavigationLayout
</route>
