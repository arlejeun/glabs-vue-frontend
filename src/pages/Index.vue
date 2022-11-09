<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="workshops">
    <div class="main-div">
      <section class="hero-image" role="banner">
        <div class="container">
          <div class="row">
            <div class="col-12 order-12 order-sm-1 col-sm-8">
              <h1 class="title-1" role="heading">
                Experience as a Service℠
              </h1>
              <p class="text-md-white">
                This website is a dedicated resource for curated workshops and
                training Modules created by the teams at Genesys. The workshops
                will teach you how to build the foundation of an empathetic
                customer experience — delivered through Experience as a
                Service℠. While it’s enabled by technology, Experience as a
                Service doesn’t happen through technology alone. It’s also an
                engagement you make across your business for your employees’
                good, for your customers’ good and for the good of your
                business.
              </p>
            </div>
            <div class="col-12 order-1 order-sm-12 col-sm-4 text-center">
              <img src="@/assets/images/workshops/banner/Genesys-Gear.svg" alt="About" class="image-icon" role="img">
            </div>
          </div>
        </div>
      </section>
      <section class="highlights-section" role="banner">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-4 d-flex">
              <div class="float-left">
                <img src="@/assets/images/workshops/icons/Genesys-workshops.svg" alt="workshops and growing"
                  title=" workshops and growing" role="img">
              </div>
              <div class="hightlight-section-content align-self-center">
                <h6 role="heading pb-0">
                  5 workshops and growing
                </h6>
                <p class="text-small">
                  New workshops and content added frequently
                </p>
              </div>
            </div>

            <div class="w-100 d-inline d-sm-none d-block border-bottom border-bottom spacer-mob-sm" />
            <div class="col-12 col-sm-4 d-flex">
              <div class="float-left">
                <img class="" src="@/assets/images/workshops/icons/Genesys-experts.svg" alt="Created by experts"
                  title="Created by experts" role="img">
              </div>
              <div class="hightlight-section-content align-self-center">
                <h6 role="heading">
                  Created by experts
                </h6>
                <p>Created by specialists in the field from Genesys</p>
              </div>
            </div>
            <div class="w-100 d-inline d-sm-none d-block border-bottom border-bottom spacer-mob-sm" />
            <div class="col-12 col-sm-4 d-flex">
              <div class="float-left">
                <img class="" src="@/assets/images/workshops/icons/Genesys-anywhere.svg"
                  alt="Avaliable for access anywhere" title="Avaliable for access anywhere" role="img">
              </div>
              <div class="hightlight-section-content align-self-center">
                <h6 role="heading">
                  Available for access anywhere
                </h6>
                <p>
                  Globally available without restriction and mobile friendly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <main role="main" class="workshops bg-gray">
        <section class="spacer-inner-tb-30">
          <div class="container">
            <div class="row">
              <div class="col-12 col-xl-8 workshops-title">
                <h1 role="heading" class="title-1 underline-orange d-inline-block spacer-mob-heading">
                  Workshops
                </h1>
              </div>
              <div class="col-12 col-xl-8 pt-sm-3 pt-xl-0" />
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
  <main>
    <TheWelcome />
  </main>
</template>

<style scoped lang="scss">
  //@import "@/assets/scss/workshops/home/site.scss";
</style>

<route lang="yaml">
meta:
  layout: TopNavigationOnly
</route>
