<script lang="ts"></script>

<template>
    <header class="navbar-light header-sticky">
    <!-- Logo Nav START -->
    <nav class="navbar navbar-expand-xl bg-primary">
      <div class="container">
        <!-- Logo START -->
        <a class="navbar-brand" href="index.html">
          <img class="light-mode-item navbar-brand-item" src="@/assets/images/genesys_monogram_detail.svg" alt="logo">
          <img class="dark-mode-item navbar-brand-item" src="@/assets/images/logo-light.svg" alt="logo">
        </a>
        <!-- Logo END -->
        
        <!-- Responsive navbar toggler -->
        <button class="navbar-toggler ms-auto mx-3 me-md-0 p-0 p-sm-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-animation">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
  
        <!-- Main navbar START -->
        <div class="navbar-collapse collapse" id="navbarCollapse">
          <ul class="navbar-nav navbar-nav-scroll">
  
            <!-- Nav item Listing -->
            <li class="nav-item dropdown">
              <a class="nav-link text-white" href="#" aria-haspopup="true" aria-expanded="false">Workshops</a>
            </li>
  
            <!-- Nav item Pages -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-white" href="#" id="pagesMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
              <ul class="dropdown-menu" aria-labelledby="pagesMenu">
  
                <li> <a class="dropdown-item" href="about.html">About</a></li>
                <li> <a class="dropdown-item" href="contact.html">Contact</a></li>
                <li> <a class="dropdown-item" href="contact-2.html">Contact 2</a></li>
                <li> <a class="dropdown-item" href="team.html">Our Team</a></li>
  
                <!-- Dropdown submenu -->
                <li class="dropdown-submenu dropend">
                  <a class="dropdown-item dropdown-toggle" href="#">Authentication</a>
                  <ul class="dropdown-menu" data-bs-popper="none">
                    <li> <a class="dropdown-item" href="sign-in.html">Sign In</a></li>
                    <li> <a class="dropdown-item" href="sign-up.html">Sign Up</a></li>
                    <li> <a class="dropdown-item" href="forgot-password.html">Forgot Password</a></li>
                    <li> <a class="dropdown-item" href="two-factor-auth.html">Two factor authentication</a></li>
                  </ul>
                </li>
  
                <!-- Dropdown submenu -->
                <li class="dropdown-submenu dropend">
                  <a class="dropdown-item dropdown-toggle" href="#">Blog</a>
                  <ul class="dropdown-menu" data-bs-popper="none">
                    <li> <a class="dropdown-item" href="blog.html">Blog</a></li>
                    <li> <a class="dropdown-item" href="blog-detail.html">Blog Detail</a></li>
                  </ul>
                </li>
  
                <!-- Dropdown submenu -->
                <li class="dropdown-submenu dropend">
                  <a class="dropdown-item dropdown-toggle" href="#">Help</a>
                  <ul class="dropdown-menu" data-bs-popper="none">
                    <li> <a class="dropdown-item" href="help-center.html">Help Center</a></li>
                    <li> <a class="dropdown-item" href="help-detail.html">Help Detail</a></li>
                    <li> <a class="dropdown-item" href="privacy-policy.html">Privacy Policy</a></li>
                    <li> <a class="dropdown-item" href="terms-of-service.html">Terms of Service</a></li>
                  </ul>
                </li>
  
                <li> <a class="dropdown-item" href="pricing.html">Pricing</a></li>
                <li> <a class="dropdown-item" href="faq.html">FAQs</a></li>
                <li> <a class="dropdown-item" href="error.html">Error 404</a></li>
                <li> <a class="dropdown-item" href="coming-soon.html">Coming Soon</a></li>
              </ul>
            </li>
  
            <!-- Nav item Account -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="accounntMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Accounts</a>
              <ul class="dropdown-menu" aria-labelledby="accounntMenu">
                <!-- Dropdown submenu -->
                <li class="dropdown-submenu dropend">
                  <a class="dropdown-item dropdown-toggle" href="#">User Profile</a>
                  <ul class="dropdown-menu" data-bs-popper="none">
                    <li> <a class="dropdown-item" href="account-profile.html">My Profile</a> </li>
                    <li> <a class="dropdown-item" href="account-bookings.html">My Bookings</a> </li>
                    <li> <a class="dropdown-item" href="account-travelers.html">Travelers</a> </li>
                    <li> <a class="dropdown-item" href="account-payment-details.html">Payment Details</a> </li>
                    <li> <a class="dropdown-item" href="account-wishlist.html">Wishlist</a> </li>
                    <li> <a class="dropdown-item" href="account-settings.html">Settings</a> </li>
                    <li> <a class="dropdown-item" href="account-delete.html">Delete Profile</a> </li>
                  </ul>
                </li>
  
                <!-- Dropdown submenu -->
                <li class="dropdown-submenu dropend">
                  <a class="dropdown-item dropdown-toggle" href="#">Agent Dashboard</a>
                  <ul class="dropdown-menu" data-bs-popper="none">
                    <li> <a class="dropdown-item" href="agent-dashboard.html">Dashboard</a> </li>
                    <li> <a class="dropdown-item" href="agent-listings.html">Listings</a> </li>
                    <li> <a class="dropdown-item" href="agent-bookings.html">Bookings</a> </li>
                    <li> <a class="dropdown-item" href="agent-activities.html">Activities</a> </li>
                    <li> <a class="dropdown-item" href="agent-earnings.html">Earnings</a> </li>
                    <li> <a class="dropdown-item" href="agent-reviews.html">Reviews</a> </li>
                    <li> <a class="dropdown-item" href="agent-settings.html">Settings</a> </li>
                  </ul>
                </li>
                
                <li> <div class="dropdown-item">Master Admin <small>(Coming Soon)</small></div> </li>
              </ul>
            </li>
  
            <!-- Nav item Contact -->
            <li class="nav-item"> <a class="nav-link" href="contact.html">Contact Us</a>	</li>
          </ul>
        </div>
        <!-- Main navbar END -->
  
        <!-- Profile and Notification START -->
        <ul class="nav flex-row align-items-center list-unstyled ms-xl-auto">
  
          <!-- Notification dropdown START -->
          <li class="nav-item ms-0 ms-md-3 dropdown">
            <!-- Notification button -->
            <a class="nav-link p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
              <i class="bi bi-bell fa-fw fs-5"></i>
            </a>
            <!-- Notification dote -->
            <span class="notif-badge animation-blink"></span>
  
            <!-- Notification dropdown menu START -->
            <div class="dropdown-menu dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg">
              <div class="card bg-transparent">
                <!-- Card header -->
                <div class="card-header bg-transparent d-flex justify-content-between align-items-center border-bottom">
                  <h6 class="m-0">Notifications <span class="badge bg-danger bg-opacity-10 text-danger ms-2">4 new</span></h6>
                  <a class="small" href="#">Clear all</a>
                </div>
  
                <!-- Card body START -->
                <div class="card-body p-0">
                  <ul class="list-group list-group-flush list-unstyled p-2">
                    <!-- Notification item -->
                    <li>
                      <a href="#" class="list-group-item list-group-item-action rounded notif-unread border-0 mb-1 p-3">
                        <h6 class="mb-2">New! Booking flights from New York ✈️</h6>
                        <p class="mb-0 small">Find the flexible ticket on flights around the world. Start searching today</p>
                        <span>Wednesday</span>
                      </a>
                    </li>
                    <!-- Notification item -->
                    <li>
                      <a href="#" class="list-group-item list-group-item-action rounded border-0 mb-1 p-3">
                        <h6 class="mb-2">Sunshine saving are here 🌞 save 30% or more on a stay</h6>
                        <span>15 Nov 2022</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <!-- Card body END -->
  
                <!-- Card footer -->
                <div class="card-footer bg-transparent text-center border-top">
                  <a href="#" class="btn btn-sm btn-link mb-0 p-0">See all incoming activity</a>
                </div>
              </div>
            </div>
            <!-- Notification dropdown menu END -->
          </li>
          <!-- Notification dropdown END -->
  
          <!-- Profile dropdown START -->
          <li class="nav-item ms-3 dropdown">
            <!-- Avatar -->
            <a class="avatar avatar-xs p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
              <img class="avatar-img rounded-circle" src="@/assets/images/avatar/01.jpg" alt="avatar">
            </a>
  
            <!-- Profile dropdown START -->
            <ul class="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3" aria-labelledby="profileDropdown">
              <!-- Profile info -->
              <li class="px-3 mb-3">
                <div class="d-flex align-items-center">
                  <!-- Avatar -->
                  <div class="avatar me-3">
                    <img class="avatar-img rounded-circle shadow" src="@/assets/images/avatar/01.jpg" alt="avatar">
                  </div>
                  <div>
                    <a class="h6 mt-2 mt-sm-0" href="#">Lori Ferguson</a>
                    <p class="small m-0">example@gmail.com</p>
                  </div>
                </div>
              </li>
  
              <!-- Links -->
              <li> <hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-bookmark-check fa-fw me-2"></i>My Bookings</a></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-heart fa-fw me-2"></i>My Wishlist</a></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-gear fa-fw me-2"></i>Settings</a></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-info-circle fa-fw me-2"></i>Help Center</a></li>
              <li><a class="dropdown-item bg-danger-soft-hover" href="#"><i class="bi bi-power fa-fw me-2"></i>Sign Out</a></li>
              <li> <hr class="dropdown-divider"></li>
  
              <!-- Dark mode switch START -->
              <li>
                <div class="modeswitch-wrap" id="darkModeSwitch">
                  <div class="modeswitch-item">
                    <div class="modeswitch-icon"></div>
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
          <li class="nav-item ms-3 d-none d-sm-block">
            <a class="btn btn-sm btn-primary-soft mb-0" href="#"><i class="bi bi-lightning-charge"></i> Upgrade now</a>
          </li> 
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
