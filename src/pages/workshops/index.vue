<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios'
import { useWorkshopStore } from '@/stores/workshop'

const gsysCloudStoredToken = useStorage('gsys-token', {region:'', access_token: '', login_url: '' })
const token = ref(gsysCloudStoredToken.value.access_token)
const isActive = computed(()=> token.value != '')

const GLABS_APP_URL = import.meta.env.VITE_GLABS_APP_URL

const wStore = useWorkshopStore()
const formatter = 'YYYY-MM-DD HH:mm:ss:SSS'
const formatted = useDateFormat(useNow(), formatter)
const config = {
	headers: {
		Authorization: 'Bearer TBD',
		Accept: 'application/json, text/plain, */*'
	}
};
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 1200)
const drawerSize = ref('45%')
drawerSize.value = isMobile.value ? '85%':'45%'
const url = `${GLABS_APP_URL}/demo/api/workshops.json`;
const connectCloudPanel = ref(true)
const { data, isLoading, isFinished: isWorkshopsLoaded, error } = useAxios(url, config)

watch(isWorkshopsLoaded, () => {
	wStore.setWorkshops(data.value?.data);
})


const availableWorkshops = computed(() => {
	return wStore.getAllWorkshops
})

const connectToCloud = () => {
	connectCloudPanel.value = true
}


</script>

<template>

	<!-- <p>Loading: {{ isLoading.toString() }}</p>
  <p>Finished: {{ isFinished.toString() }}</p>
  <p>Error: {{ error?.toString() }}</p> -->

	<!-- =======================
Title and Tabs START -->
	<section class="pt-0 pb-4">
		<div class="container position-relative">
			<div class="row">
				<div class="col">
					<h3 class="fs-3 text-primary mt-4">Workshops</h3>
					<p class="text-secondary">Genesys Workshops provide detailed instructions and open source code
						repositories
						to assist partners and customers in jump-starting your custom integrations with third-party
						products and
						complex solutions within Genesys Cloud.</p>
				</div>
				<div class="col-auto pt-2">
					<el-button v-show="!isActive" type="warning" @click.prevent="connectToCloud" text bg>Connect to Genesys</el-button>
					<el-button v-show="isActive" type="success" @click.prevent="connectToCloud" text bg>Genesys Session</el-button>
				</div>
			</div>


			<!-- Title and button START -->
			<div class="row">
				<div class="col-12">
					<!-- Meta START -->
					<div class="d-flex justify-content-between">
						<!-- Filter collapse button -->
						<input type="checkbox" class="btn-check" id="btn-check-soft">
						<label class="btn btn-primary-soft btn-primary-check mb-0" for="btn-check-soft"
							data-bs-toggle="collapse" data-bs-target="#collapseFilter" aria-controls="collapseFilter">
							<i class="bi fa-fe bi-sliders me-2"></i>Show Filters
						</label>

						<!-- tabs -->
						<ul class="nav nav-pills nav-pills-dark" id="tour-pills-tab" role="tablist">
							<!-- Tab item -->
							<li class="nav-item">
								<a class="nav-link rounded-start rounded-0 mb-0" href="hotel-list.html"><i
										class="bi fa-fw bi-list-ul"></i></a>
							</li>
							<!-- Tab item -->
							<li class="nav-item">
								<a class="nav-link rounded-end rounded-0 mb-0 active" href="hotel-grid.html"><i
										class="bi fa-fw bi-grid-fill"></i></a>
							</li>
						</ul>
					</div>
					<!-- Meta END -->
				</div>
			</div>
			<!-- Title and button END -->

		</div>
	</section>
	<!-- =======================
Title and Tabs END -->

	<!-- =======================
Hotel grid START -->
	<section class="pt-0">
		<div class="container">
			<div class="row g-4">
				<template v-for="item in availableWorkshops">
					<WorkshopCard :workshop="item"></WorkshopCard>
				</template>
			</div>
			<!-- Card item START -->

			<div class="row">
				<div class="col-12">
					<nav class="mt-4 d-flex justify-content-center" aria-label="navigation">
						<ul class="pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
							<li class="page-item mb-0"><a class="page-link" href="#" tabindex="-1"><i
										class="fa-solid fa-angle-left"></i></a></li>
							<li class="page-item mb-0"><a class="page-link" href="#">1</a></li>
							<li class="page-item mb-0 active"><a class="page-link" href="#">2</a></li>
							<li class="page-item mb-0"><a class="page-link" href="#">..</a></li>
							<li class="page-item mb-0"><a class="page-link" href="#">6</a></li>
							<li class="page-item mb-0"><a class="page-link" href="#"><i
										class="fa-solid fa-angle-right"></i></a></li>
						</ul>
					</nav>
				</div>
			</div>

		</div>

	</section>
	<!-- =======================
Hotel grid END -->

	<el-drawer v-model="connectCloudPanel" title="Active Organization" direction="rtl" :size="drawerSize">
		<ConnectOrganization></ConnectOrganization>
	</el-drawer>

	<!-- <pre lang="json">{{ availableWorkshops }}</pre> -->
</template>

<style scoped lang="scss">

</style>

<route lang="yaml">
meta:
  layout: BasicTopNavigationLayout
  title: Workshops
  requiresAuth: true
</route>
