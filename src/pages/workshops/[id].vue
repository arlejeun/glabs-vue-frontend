<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios'
import { useWorkshopStore } from '@/stores/workshop'

const wStore = useWorkshopStore()
const formatter = 'YYYY-MM-DD HH:mm:ss:SSS'
const formatted = useDateFormat(useNow(), formatter)

</script>

<template>
  <div>
    <!-- {{$route.params.id}} -->

    <div>
    <div class="row">
      <div
        class="col-12 col-md-8 pr-0">
        <div class="left-side">
          <iframe
            ref="workshopIframe"
            class="iframe-worshop"
            src="https://workshop.genesys.com/workshops-gdemo/workshop-Build-a-Bot/"
            height="100%"
            width="100%"
          >
            <!-- 'https://workshop.genesys.com/workshops/' + workshopId + '/' -->
          </iframe>

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

  iframe {
    height:100vh
  }

</style>

<route lang="yaml">
meta:
  layout: BasicTopNavigationLayout
</route>
