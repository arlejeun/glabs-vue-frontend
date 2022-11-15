<script setup lang="ts">
</script>

<template>
  <!-- Sidebar START -->
  <div class="col-lg-4 col-xl-3">
    <!-- Responsive offcanvas body START -->
    <div
      id="offcanvasSidebar"
      class="offcanvas-lg offcanvas-end"
      tabindex="-1"
    >
      <!-- Offcanvas header -->
      <div class="offcanvas-header justify-content-end pb-2">
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          data-bs-target="#offcanvasSidebar"
          aria-label="Close"
        />
      </div>

      <!-- Offcanvas body -->
      <div class="offcanvas-body p-3 p-lg-0">
        <div class="card bg-light w-100">
          <!-- Edit profile button -->
          <div class="position-absolute top-0 end-0 p-3">
            <a
              href="#"
              class="text-primary-hover"
              data-bs-toggle="tooltip"
              data-bs-title="Edit profile"
            >
              <i class="bi bi-pencil-square" />
            </a>
          </div>

          <!-- Card body START -->
          <div class="card-body p-3">
            <!-- Avatar and content -->
            <div class="text-center mb-3">
              <!-- Avatar -->
              <div class="avatar avatar-xl mb-2">
                <img
                  class="avatar-img rounded-circle border border-2 border-white"
                  src="@/assets/images/avatar/01.jpg"
                  alt=""
                >
              </div>
              <h6 class="mb-0">
                Jacqueline Miller
              </h6>
              <a
                href="#"
                class="text-reset text-primary-hover small"
              >hello@gmail.com</a>
              <hr>
            </div>

            <!-- Sidebar menu item START -->
            <ul class="nav nav-pills-primary-soft flex-column">
              <li class="nav-item">
                <router-link
                  class="nav-link active"
                  to="/account/profile"
                ><i class="bi bi-person fa-fw me-2" />My
                  Profile</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  to="/account/organizations"
                ><i class="bi bi-people fa-fw me-2" />Organizations</router-link>
              </li>
              
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  to="/account/feedback"
                ><i class="bi bi-heart fa-fw me-2" />Feedback & Issues</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  to="/account/settings"
                ><i class="bi bi-gear fa-fw me-2" />Settings</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  to="/account/delete"
                ><i class="bi bi-trash fa-fw me-2" />Delete
                  Profile</router-link>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-danger bg-danger-soft-hover"
                  href="#"
                ><i
                  class="bi bi-box-arrow-right fa-fw me-2"
                />Sign Out</a>
              </li>
            </ul>
            <!-- Sidebar menu item END -->
          </div>
          <!-- Card body END -->
        </div>
      </div>
    </div>
    <!-- Responsive offcanvas body END -->
  </div>
  <!-- Sidebar END -->
</template>

<style>

</style>
