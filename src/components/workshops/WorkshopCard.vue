<script setup lang="ts">

defineProps({
  workshop: {
    type: Object,
    required: true
  }
})
</script>

<template>

  <!-- Card item START -->
  <div class="col-md-6 col-xl-4">
    <div class="card shadow p-2 pb-0 h-100">
      <!-- Image -->
      <img :src="`https://gdemo.demo.genesys.com/api/gdemo-assets/${workshop.image}`" class="rounded-2" alt="Card image">

      <!-- Card body START -->
      <div class="card-body px-3 pb-0">
        <!-- Rating and cart -->
        <div class="d-flex justify-content-between mb-3">
          <a href="#" class="badge bg-dark text-white"><i class="bi fa-fw bi-star-fill me-2 text-warning"></i>4.0</a>
          <a href="#" class="h6 mb-0 z-index-2"><i class="bi fa-fw bi-bookmark"></i></a>
        </div>

        <!-- Title -->
        <h5 class="card-title"><a href="hotel-detail.html">{{workshop.title}}</a></h5>
        <p><small>{{workshop.description}}</small></p>

        <!-- List -->
        <ul class="nav nav-divider mb-2 mb-sm-3">
          <li class="nav-item">Air Conditioning</li>
          <li class="nav-item">Wifi</li>
          <li class="nav-item">Kitchen</li>
          <li class="nav-item">Pool</li>
        </ul>
      </div>
      <!-- Card body END -->

      <!-- Card footer START-->
      <div class="card-footer pt-0">
        <!-- Price and Button -->
        <div class="d-sm-flex justify-content-sm-between align-items-center">
          <!-- Price -->
          <div class="d-flex align-items-center">
            <h5 class="fw-normal text-success mb-0 me-1">$475</h5>
            <span class="mb-0 me-2">/day</span>
          </div>
          <!-- Button -->
          <div class="mt-2 mt-sm-0">
            <a href="hotel-detail.html" class="btn btn-sm btn-primary-soft mb-0 w-100">View Detail<i
                class="bi bi-arrow-right ms-2"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Card item END -->

</template>

<style>

</style>
