<template>
  <!-- Header END -->

  <!-- **************** MAIN CONTENT START **************** -->
  <main>
    <!-- =======================
  Content START -->
    <section class="pt-0">
      <div class="container vstack gap-4">
        <!-- Booking table START -->
        <div class="row">
          <SidebarAccount />
          <AccountFeedback />
        </div>
        <!-- Booking table END -->
      </div>
    </section>
    <!-- =======================
  Content END -->
  </main>
  <!-- **************** MAIN CONTENT END **************** -->
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<route lang="yaml">
meta:
  layout: BasicTopNavigationLayout
  title: Feedback
  requiresAuth: true
</route>
