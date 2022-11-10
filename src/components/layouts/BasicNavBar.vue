<script setup lang="ts">
// import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 750)
const theme = useLayoutGlobalState()
const root = document.documentElement

async function changeTheme() {
  // eslint-disable-next-line no-console
  console.log(`Change Theme - current ${theme.value}`)
  if (theme.value === 'dark') {
  // || theme.value === '' || theme.value === undefined) {
    root.classList.remove('dark-mode')
    localStorage.setItem('data-theme', '')
    await nextTick()
  }
  else {
    root.classList.add('dark-mode')
    localStorage.setItem('data-theme', 'dark')
    await nextTick()
  }
}
</script>

<template>
  <header class="navbar-light header-sticky">
    <!-- Logo Nav START -->
    <nav class="navbar navbar-expand-xl pt-0 bg-primary">
      <div class="container">
        <!-- Logo START -->
        <a
          class="navbar-brand"
          href="index.html"
        >
          <img
            class="light-mode-item navbar-brand-item"
            src="@/assets/images/genesys_monogram_detail.svg"
            alt="logo"
          >
          <img
            class="dark-mode-item navbar-brand-item"
            src="@/assets/images/genesys_monogram_detail.svg"
            alt="logo"
          >
        </a>
        <!-- Logo END -->

        <!-- Responsive navbar toggler -->
        <button
          class="navbar-toggler ms-auto mx-3 me-md-0 p-0 p-sm-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-animation">
            <span />
            <span />
            <span />
          </span>
        </button>

        <!-- Main navbar START -->
        <div
          id="navbarCollapse"
          class="navbar-collapse collapse"
        >
          <ul
            class="navbar-nav navbar-nav-scroll"
            :class="{ 'bg-secondary': isMobile }"
          >
            <!-- Nav item Listing -->
            <li class="nav-item dropdown">
              <router-link
                class="nav-link text-white fw-bolder"
                to="/workshops"
              >
                Workshops
              </router-link>
            </li>

            <li class="nav-item dropdown">
              <router-link
                class="nav-link text-white fw-bolder"
                to="/environments"
              >
                Environments
              </router-link>
            </li>
          </ul>
        </div>
        <!-- Main navbar END -->

        <!-- Profile and Notification START -->
        <ul class="nav flex-row align-items-center list-unstyled ms-xl-auto">
          <!-- Notification dropdown START -->
          <li class="nav-item ms-0 ms-md-3 dropdown">
            <!-- Notification button -->
            <a
              class="nav-link p-0"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <i class="bi bi-bell fa-fw fs-5 text-white" />
            </a>
            <!-- Notification dote -->
            <span class="notif-badge animation-blink" />

            <!-- Notification dropdown menu START -->
            <div class="dropdown-menu dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg">
              <div class="card bg-transparent">
                <!-- Card header -->
                <div class="card-header bg-transparent d-flex justify-content-between align-items-center border-bottom">
                  <h6 class="m-0">
                    Notifications <span class="badge bg-danger bg-opacity-10 text-danger ms-2">4
                      new</span>
                  </h6>
                  <a
                    class="small"
                    href="#"
                  >Clear all</a>
                </div>

                <!-- Card body START -->
                <div class="card-body p-0">
                  <ul class="list-group list-group-flush list-unstyled p-2">
                    <!-- Notification item -->
                    <li>
                      <a
                        href="#"
                        class="list-group-item list-group-item-action rounded notif-unread border-0 mb-1 p-3"
                      >
                        <h6 class="mb-2">New! Booking flights from New York ✈️</h6>
                        <p class="mb-0 small">Find the flexible ticket on flights around the world. Start searching
                          today</p>
                        <span>Wednesday</span>
                      </a>
                    </li>
                    <!-- Notification item -->
                    <li>
                      <a
                        href="#"
                        class="list-group-item list-group-item-action rounded border-0 mb-1 p-3"
                      >
                        <h6 class="mb-2">Sunshine saving are here 🌞 save 30% or more on a stay</h6>
                        <span>15 Nov 2022</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <!-- Card body END -->

                <!-- Card footer -->
                <div class="card-footer bg-transparent text-center border-top">
                  <a
                    href="#"
                    class="btn btn-sm btn-link mb-0 p-0"
                  >See all incoming activity</a>
                </div>
              </div>
            </div>
            <!-- Notification dropdown menu END -->
          </li>
          <!-- Notification dropdown END -->

          <!-- Profile dropdown START -->
          <li class="nav-item ms-3 dropdown">
            <!-- Avatar -->
            <a
              id="profileDropdown"
              class="avatar avatar-xs p-0"
              href="#"
              role="button"
              data-bs-auto-close="outside"
              data-bs-display="static"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                class="avatar-img rounded-circle"
                src="@/assets/images/avatar/01.jpg"
                alt="avatar"
              >
            </a>

            <!-- Profile dropdown START -->
            <ul
              class="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3"
              aria-labelledby="profileDropdown"
            >
              <!-- Profile info -->
              <li class="px-3 mb-3">
                <div class="d-flex align-items-center">
                  <!-- Avatar -->
                  <div class="avatar me-3">
                    <img
                      class="avatar-img rounded-circle shadow"
                      src="@/assets/images/avatar/01.jpg"
                      alt="avatar"
                    >
                  </div>
                  <div>
                    <a
                      class="h6 mt-2 mt-sm-0"
                      href="#"
                    >Lori Ferguson</a>
                    <p class="small m-0">
                      example@gmail.com
                    </p>
                  </div>
                </div>
              </li>

              <!-- Links -->
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to="/user/profile"
                >
                  <i class="bi bi-bookmark-check fa-fw me-2" />My
                  Profile
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to="/user/settings"
                >
                  <i class="bi bi-gear fa-fw me-2" />Settings
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to="/user/feedback"
                >
                  <i class="bi bi-info-circle fa-fw me-2" />Feedback / Issues
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to="user/settings"
                >
                  <i class="bi bi-power fa-fw me-2" />Sign Out
                </router-link>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>

              <!-- Dark mode switch START -->
              <li>
                <div
                  id="darkModeSwitch"
                  class="modeswitch-wrap"
                >
                  <div
                    class="modeswitch-item"
                    @click="changeTheme"
                  >
                    <div class="modeswitch-icon" />
                  </div>
                  <span>Dark mode</span>
                </div>
              </li>
              <!-- Dark mode switch END -->
            </ul>
            <!-- Profile dropdown END -->
          </li>
          <!-- Profile dropdown END -->

          <!-- Button -->
          <!-- <li class="nav-item ms-3 d-none d-sm-block">
            <a class="btn btn-sm btn-primary-soft mb-0" href="#"><i class="bi bi-lightning-charge"></i> Upgrade now</a>
          </li> -->
        </ul>
        <!-- Profile and Notification START -->
      </div>
    </nav>
    <!-- Logo Nav END -->
  </header>
</template>

<style>
.img-logo-next {
  float: left;
  padding: 8px 20px 8px 0;
}
</style>
