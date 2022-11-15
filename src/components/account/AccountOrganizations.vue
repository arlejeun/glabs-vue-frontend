<script setup lang="ts">
import AccountOrganizationSummary from '../organizations/AccountOrganizationSummary.vue';

</script>

<template>
  <!-- Main content START -->
  <div class="col-lg-8 col-xl-9 ps-xl-5">

    <!-- Offcanvas menu button -->
    <div class="d-grid mb-0 d-lg-none w-100">
      <!-- <button class="btn btn-primary mb-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar"
        aria-controls="offcanvasSidebar">
        <i class="fas fa-sliders-h"></i> Menu
      </button> -->
    </div>

    <div class="card border bg-transparent">
      <!-- Card header -->
      <div class="card-header bg-transparent border-bottom">
        <h4 class="card-header-title text-primary">My Organizations</h4>
      </div>

      <!-- Card body START -->
      <div class="card-body p-0">

        <!-- Tabs -->
        <ul class="nav nav-tabs nav-bottom-line nav-responsive nav-justified">
          <li class="nav-item">
            <a class="nav-link mb-0 active" data-bs-toggle="tab" href="#tab-1"><i
                class="bi bi-box-fill fa-fw me-1"></i>Demonstrations</a>
          </li>
          <li class="nav-item">
            <a class="nav-link mb-0" data-bs-toggle="tab" href="#tab-2"><i
                class="bi bi-wrench-adjustable fa-fw me-1"></i>Development</a>
          </li>
        </ul>

        <!-- Tabs content START -->
        <div class="tab-content p-2 p-sm-4" id="nav-tabContent">

          <!-- Tab content item START -->
          <div class="tab-pane fade show active" id="tab-1">
            <h6>Orgnizations for demonstrations only with restricted permissions</h6>
            <AccountOrganizationSummary />
            
            <div class="card border mb-4">
              <!-- Card header -->
              <div class="card-header d-md-flex justify-content-md-between align-items-center">
                <!-- Icon and Title -->
                <div class="d-flex align-items-center">
                  <div class="icon-lg bg-light rounded-circle flex-shrink-0"><i class="fa-solid fa-plane"></i>
                  </div>
                  <!-- Title -->
                  <div class="ms-2">
                    <h6 class="card-title mb-0">PureCloudNowAdmin</h6>
                    <ul class="nav nav-divider small">
                      <li class="nav-item">Region: us-east</li>
                    </ul>
                  </div>
                </div>

                <!-- Button -->
                <div class="mt-2 mt-md-0">
                  <a href="#" class="btn btn-primary-soft mb-0 mr-1">Provision User</a>
                </div>
              </div>

            </div>

            <!-- Card item START -->
            <div class="card border mb-4">
              <!-- Card header -->
              <div class="card-header d-md-flex justify-content-md-between align-items-center">
                <!-- Icon and Title -->
                <div class="d-flex align-items-center">
                  <div class="icon-lg bg-light rounded-circle flex-shrink-0"><i class="fa-solid fa-plane"></i>
                  </div>
                  <!-- Title -->
                  <div class="ms-2">
                    <h6 class="card-title mb-0">GC1</h6>
                    <ul class="nav nav-divider small">
                      <li class="nav-item">Region: us-east</li>
                      <li class="nav-item">Pricing Tier 1</li>
                    </ul>
                  </div>
                </div>

                <!-- Button -->
                <div class="mt-2 mt-md-0">
                  <a href="#" class="btn btn-primary-soft mb-0 mr-1">Provision User</a>
                </div>
              </div>

            </div>
            <!-- Card item END -->
            <!-- Card item START -->
            <div class="card border mb-4">
              <!-- Card header -->
              <div class="card-header d-md-flex justify-content-md-between align-items-center">
                <!-- Icon and Title -->
                <div class="d-flex align-items-center">
                  <div class="icon-lg bg-light rounded-circle flex-shrink-0"><i class="fa-solid fa-plane"></i>
                  </div>
                  <!-- Title -->
                  <div class="ms-2">
                    <h6 class="card-title mb-0">GC2</h6>
                    <ul class="nav nav-divider small">
                      <li class="nav-item">Region: us-east</li>
                      <li class="nav-item">Pricing Tier 2</li>
                    </ul>
                  </div>
                </div>

                <!-- Button -->
                <div class="mt-2 mt-md-0">
                  <a href="#" class="btn btn-primary-soft mb-0 mr-1">Provision User</a>
                </div>
              </div>

            </div>
            <!-- Card item END -->
          </div>
          <!-- Tabs content item END -->

          <!-- Tab content item START -->
          <div class="tab-pane fade" id="tab-2">
            <div class="row pt-1 pb-2 mb-2">
              <div class="col">
              <h6>Development Organizations (1)</h6>
            </div>
            <div class="col-auto">
              <div class="mt-2 mt-md-0">
                  <a href="#" class="btn btn-primary-soft mb-0 mr-1">Add Org</a>
                </div>
              
            </div>
            </div>
            
            

            <!-- Card item START -->
                        <!-- Card item START -->
                        <div class="card border mb-4">
              <!-- Card header -->
              <div class="card-header d-md-flex justify-content-md-between align-items-center">
                <!-- Icon and Title -->
                <div class="d-flex align-items-center">
                  <div class="icon-lg bg-light rounded-circle flex-shrink-0"><i class="fa-solid fa-plane"></i>
                  </div>
                  <!-- Title -->
                  <div class="ms-2">
                    <h6 class="card-title mb-0">SC1</h6>
                    <ul class="nav nav-divider small">
                      <li class="nav-item">Region: us-europe</li>
                      <li class="nav-item">Dev Org</li>
                    </ul>
                  </div>
                </div>

                <!-- Button -->
                <div class="mt-2 mt-md-0">
                  <a href="#" class="btn btn-primary-soft mb-0 mr-1">Connect</a>
                </div>
              </div>

            </div>
            <!-- Card item END -->
            <!-- Card item END -->
          </div>
          <!-- Tabs content item END -->

          <!-- Tab content item START -->
          <div class="tab-pane fade" id="tab-3">
            <div class="bg-mode shadow p-4 rounded overflow-hidden">
              <div class="row g-4 align-items-center">
                <!-- Content -->
                <div class="col-md-9">
                  <h6>Looks like you have never booked with BOOKING</h6>
                  <h4 class="mb-2">When you book your trip will be shown here.</h4>
                  <a href="hotel-list.html" class="btn btn-primary-soft mb-0">Start booking now</a>
                </div>
                <!-- Image -->
                <div class="col-md-3 text-end">
                  <!-- <img src="assets/images/element/17.svg" class="mb-n5" alt=""> -->
                </div>
              </div>
            </div>

          </div>
          <!-- Tabs content item END -->
        </div>

      </div>
      <!-- Card body END -->
    </div>

  </div>
  <!-- Main content END -->
</template>

<style>

</style>
