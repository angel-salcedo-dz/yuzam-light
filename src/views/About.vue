<script setup>
import Header from "@/components/Header.vue";
import {gsap} from "gsap";
import {ScrollSmoother} from "gsap/ScrollSmoother";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {onMounted} from "vue";
import {Swiper, SwiperSlide} from 'swiper/vue';
import { Autoplay } from "swiper/modules";
import 'swiper/css';

import image_1 from '@/assets/1.jpeg';
import image_2 from '@/assets/1_0.jpeg';
import image_3 from '@/assets/1_1.jpeg';
import image_4 from '@/assets/1_2.jpeg';
import image_5 from '@/assets/1_3.jpeg';

const modules = [Autoplay]

const images = [
  image_1,
  image_2,
  image_3,
  image_4,
  image_5,
];

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

onMounted(() => {
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    normalizeScroll: true // Evita conflictos en dispositivos táctiles
  });

})
</script>

<template>
  <Header/>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <div class="bg-black p-4 lg:p-10 w-full relative">
        <section class="text-white/90 text-xl z-2 pt-24">
          <div class="w-full h-full grid grid-cols-1 gap-4 lg:gap-16 ">
            <div class="w-full h-full relative  space-y-4 ">
              <div
                  class="text-3xl lg:text-5xl font-semibold text-white tracking-wide pb-4"
              >
                ¿Quiénes somos?
              </div>
              <p class="text-lg lg:text-xl text-white/80 leading-relaxed">
                En <span class="font-semibold text-yellow-400">Yuzam Lighting</span> no concebimos la iluminación como
                un accesorio, sino como un lenguaje.
              </p>
              <p class="text-lg lg:text-xl text-white/80 leading-relaxed">
                Nuestro trabajo parte de una formación profesional en iluminación escénica donde la luz no
                se improvisa. <br> <br>
                Con estudios en iluminación para ópera, teatro y danza, así como en iluminación de
                vestuario, escenografía y creación de texturas con gobos. <br> <br>
                Esta base profesional es la que hoy llevamos al mundo de las bodas y nos permite diseñar
                atmósferas con intención,
                entender cómo se comporta la luz en cada material y cómo transformar un espacio sin perder
                elegancia ni emoción. <br> <br>
                Cada boda que diseñamos tiene un concepto, un ritmo y una historia contada a través de la
                luz.
              </p>

            </div>
            <div class="">
              <div class="slider">
                <swiper
                    :slides-per-view="3"
                    :space-between="20"
                    :direction="'horizontal'"
                    :centered-slides="true"
                    :loop="true"
                    :speed="6000"
                    :breakpoints="{
                      320: {
                        slidesPerView: 1,
                      },
                      1280: {
                        slidesPerView: 3,
                      }
                    }"
                    :modules="modules"
                    :autoplay="{
                      delay: 0,
                      enabled: true,
                      pauseOnMouseEnter: false,
                      disableOnInteraction: false,
                    }" class="h-82"
                >
                  <swiper-slide v-for="image in images">
                    <img :src="image" alt="" class="w-full h-full object-cover rounded-xl">
                  </swiper-slide>
                </swiper>

              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiper-wrapper {
  transition-timing-function: linear !important;
}
</style>