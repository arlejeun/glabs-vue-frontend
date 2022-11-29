<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios'
import { useWorkshopStore } from '@/stores/workshop'
import type { IWorkshop } from '@/interfaces'
import VueMarkdown from 'vue-markdown-render'
import { useRoute } from 'vue-router'
import { useDateFormat, useNow } from '@vueuse/core'
import { computed, ref } from 'vue'

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

const searchValue = ref('')
const wsName = computed(() => wStore.getWorkshopMenu.length > 0 && wStore.getWorkshopMenu[0].name || '')
const wsMenu = computed(()=>wStore.getWorkshopMenu.length > 0 && wStore.getWorkshopMenu[0].menus) 
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
          <el-container class="ws-body">

            <el-container class="ws-body">

              <el-aside width="300px" class="ws-side">
                <el-header class="ws-side-header ws-search">
                  <el-input v-model="searchValue" 
                    placeholder="Search..." clearable>
                  </el-input>
                </el-header>
                <div class="ws-side-body">
                  <ul>
                    <li v-for="(item, index) in wsMenu">
                      {{item.name}}
                      <ul>
                        <li v-for="(subitem, subindex) in item.pages" >{{subitem.name}}
                        </li>
                      </ul>

                    </li>
                  </ul>
                </div>

                <!--el-menu default-active="2" class="el-menu--vertical" @open="handleOpen" @close="handleClose">
                  <el-menu-item v-for="(item, index) in wStore.getWorkshopMenu" >{{item.name}}
                    <span v-for="(subitem, subindex) in item.menus" >{{subitem.name}}</span>
                  </el-menu-item>
                </el-menu -->
              </el-aside>

              <el-main>
                <el-header class="ws-header">
                  <h3 class="fs-3 ws-header">{{ wsName }}</h3>
                </el-header>
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
.ws-header {
  color: #ff6428;
  background-color: white;
}
.ws-side {
  color: #ccc;
  //  color: #ff6428;
  background-color: #23395D;
}
.ws-side-body {
  padding-top: 5ex;
}

.ws-side-header {
  height: 150px;
  font-size: 18px;
  background-color: #ff6428;
}
.ws-search {
  padding-top: 50px;
  color: #23395D
}

.ws-body {
  padding-top: 0px;
}
</style>

<route lang="yaml">
meta:
  layout: BasicTopNavigationLayout
</route>
