<script setup>
import {Swiper, SwiperSlide} from "swiper/vue";
import {Autoplay} from "swiper/modules";
import 'swiper/css';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollSmoother} from "gsap/ScrollSmoother";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import image_1 from "@/assets/1.jpeg";
import image_2 from "@/assets/1_0.jpeg";
import image_3 from "@/assets/1_1.jpeg";
import image_4 from "@/assets/1_2.jpeg";
import image_5 from "@/assets/1_3.jpeg";
import {onMounted, ref} from "vue";
import MainImage from "@/assets/1.jpeg";
import Header from "@/components/Header.vue";
import VueEasyLightbox from 'vue-easy-lightbox/external-css'
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

const modules = [Autoplay]

const images = [
  image_1,
  image_2,
  image_3,
  image_4,
  image_5,
];

let smootherInstance;
let mainTl;
let secondTl;
let thirdTl;

const visibleRef = ref(false)
const indexRef = ref(0)

const showImg = (index) => {
  indexRef.value = index
  visibleRef.value = true

  if (smootherInstance) {
    smootherInstance.paused(true)
  }
}

const onHide = () => {
  visibleRef.value = false

  if (smootherInstance) {
    smootherInstance.paused(false)
  }
}


onMounted(() => {
  let mm = gsap.matchMedia();

  mm.add(
      {
        // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        isMobile: "(max-width: 639px)",
        isTablet: "(min-width: 640px) and (max-width: 1023px)",
        isDesktop: "(min-width: 1024px)",
      },
      (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        let {isDesktop, isMobile, isTablet} = context.conditions;

        smootherInstance = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5,
          normalizeScroll: true // Evita conflictos en dispositivos táctiles
        });

        gsap.set(['.info-text'], {
          opacity: 0,
          xPercent: -10
        })

        gsap.set(['.info-image'], {
          opacity: 0,
          xPercent: 10
        })

        gsap.set(['.services-title'], {
          opacity: 0.2,
        })

        gsap.set(['.sub-1', '.sub-3'], {
          opacity: 0,
          xPercent: 10,
        })

        gsap.set(['.sub-2', '.sub-4'], {
          opacity: 0,
          xPercent: -10,
        })

        mainTl = gsap.timeline({
          scrollTrigger: {
            id: "mainPin", // <--- ID fundamental para encontrarlo después
            trigger: "#first-content",
            start: "top top",
            end: "+=500%", // Duración total de toda la experiencia
            pin: true,
            scrub: 1,
          }
        });

        mainTl.to(".s1 .title", {xPercent: isMobile ? -350 : -250, duration: isMobile ? 12 : 15})
            .to(".s1 .description", {
              y: 100,
              opacity: 0,
              stagger: isMobile ? 2 : 2.5,
              duration: isMobile ? 4 : 5,
              ease: "power2.out",
            }, isMobile ? 1 : 1.5)

        ScrollTrigger.create({
          trigger: "#second-content",
          start: "top top",
          pin: true,
          pinSpacing: true, // 🔥 importante
          end: "+=150%",
          scrub: 1,
        });

        gsap.to(".info-text", {
          opacity: 1,
          xPercent: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#second-content",
            start: "top 50%", // Empieza mucho antes de llegar arriba
            end: "top top",   // Termina justo cuando se activa el Pin
            scrub: 1.5
          }
        });

        gsap.to(".info-image", {
          opacity: 1,
          xPercent: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#second-content",
            start: "top 50%", // Empieza mucho antes de llegar arriba
            end: "top top",   // Termina justo cuando se activa el Pin
            scrub: 1.5
          }
        });

        gsap.to(".services-title", {
          opacity: 1,
          xPercent: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#third-content",
            start: "top 75%", // Empieza mucho antes de llegar arriba
            end: "top top",   // Termina justo cuando se activa el Pin
            scrub: 1.5
          }
        });

        gsap.to(".sub-1", {
          opacity: 1,
          xPercent: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#third-content",
            start: "top 75%", // Empieza mucho antes de llegar arriba
            end: "top top",   // Termina justo cuando se activa el Pin
            scrub: 1.5
          }
        });

        gsap.to(".sub-2", {
          opacity: 1,
          xPercent: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#main-sub-2",
            start: "top 75%", // Empieza mucho antes de llegar arriba
            end: "top top",   // Termina justo cuando se activa el Pin
            scrub: 1.5
          }
        });

        gsap.to(".sub-3", {
          opacity: 1,
          xPercent: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#main-sub-3",
            start: "top 75%", // Empieza mucho antes de llegar arriba
            end: "top top",   // Termina justo cuando se activa el Pin
            scrub: 1.5
          }
        });

        gsap.to(".sub-4", {
          opacity: 1,
          xPercent: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#main-sub-4",
            start: "top 75%", // Empieza mucho antes de llegar arriba
            end: "+=40%",   // Termina justo cuando se activa el Pin
            scrub: 1.5
          }
        });

      })
})

const onSwiperInit = (swiper) => {
  // Esperamos a que el DOM se asiente tras el Pin de GSAP
  setTimeout(() => {
    swiper.update();
    if (swiper.autoplay) {
      swiper.autoplay.start();
    }
  }, 100);
};

const scrollToThird = () => {
  smootherInstance.scrollTo("#third-content", true);
};
</script>

<template>
  <Header/>
  <div id="smooth-wrapper" class="overflow-x-hidden !bg-black">
    <div id="smooth-content" class="overflow-x-hidden !bg-black">
      <div id="first-content">
        <section class="s1 w-full h-screen bg-cover bg-no-repeat overflow-hidden absolute z-1">
          <div class="hero bg-cover relative z-1 h-full"
               :style="{backgroundImage: 'url(' + MainImage + ')'}">
            <div class="absolute w-full h-full bg-black/60 z-1"></div>
            <div class="w-full h-full relative flex flex-col justify-center p-4 lg:p-10 z-2">
              <h1 class="text-[35vw] sm:text-[25vw] text-white title">YUZAMLIGHTING</h1>
              <div class="text-3xl lg:text-5xl font-thin tracking-wider text-white/80">
                <div class="description">Diseño de iluminación
                </div>
                <div class="description">para algo verdaderamente
                </div>
                <div class="description font-bold">extraordinario
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>
      <div id="second-content" class="bg-black p-4 relative z-2 h-screen">
        <div id="s2-sub"
             class="s2 w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-16 px-4 pt-24 lg:pt-12 lg:px-10">
          <div class="w-full h-full flex flex-col sm:justify-center gap-6 max-w-3xl order-2 sm:order-1">

            <h2 class="text-3xl lg:text-5xl italic text-white leading-tight info-text">
              No “colocamos luces”,
              <span class="font-semibold">diseñamos atmósferas con intención</span>.
            </h2>

            <p class="text-lg lg:text-xl text-white/80 leading-relaxed info-text">
              En <span class="font-semibold text-yellow-400">Yuzam Lighting</span> hemos sido parte de más de
              <span class="font-semibold text-white">500 bodas</span>.
              Entendemos lo que este día significa para ustedes.
            </p>

            <p class="text-lg lg:text-xl text-white/70 leading-relaxed info-text">
              Escuchamos, proponemos y diseñamos junto a ustedes,
              transformando ideas en experiencias reales.
            </p>

            <p class="text-lg lg:text-xl text-white/70 leading-relaxed info-text">
              Cada proyecto es el resultado de sensibilidad, técnica y un
              <span class="font-semibold text-white">compromiso absoluto</span>
              por materializar exactamente lo que imaginan.
            </p>

          </div>
          <div class="hidden sm:flex items-center order-1 sm:order-2 info-image">
            <img src="@/assets/1_4.jpeg" alt="" class="rounded-xl">
          </div>
        </div>
        <button
            @click="scrollToThird"
            class="scroll-down bottom-20 sm:bottom-12 hover:cursor-pointer !p-4">
          <span></span>
          <span></span>
        </button>
      </div>
      <div id="third-content" class="relative z-4 bg-black space-y-20 px-4 pt-20 sm:pt-28 lg:px-10 pb-20 sm:pb-28">
        <div
            id="services-title"
            class="services-title text-3xl lg:text-5xl font-semibold text-white text-center tracking-wide"
        >
          Servicios
        </div>
        <div class="main-sub-1" id="main-sub-1">
          <div class="sub-1" id="sub-1">
            <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 font-medium">
              <div class="w-full h-full relative flex flex-col sm:justify-center gap-4 order-2 lg:order-1">
                <div class="text-2xl lg:text-4xl font-semibold text-yellow-400">
                  Iluminación Arquitectónica
                </div>

                <div class="italic text-xl lg:text-2xl font-medium text-white/90">
                  "La arquitectura cobra vida cuando la luz la interpreta".
                </div>

                <div class="text-base lg:text-lg text-white/70 leading-relaxed">
                  Creamos composiciones lumínicas que enfatizan carácter, profundidad y elegancia,
                  generando atmósferas sofisticadas y memorables.
                </div>
              </div>
              <div class="flex items-center order-1 lg:order-2 !rounded-xl">
                <div class="w-full max-w-full !rounded-xl">
                  <swiper
                      :tag="'main-1'"
                      :slides-per-view="3"
                      :space-between="20"
                      :direction="'horizontal'"
                      :centered-slides="true"
                      :loop="true"
                      :speed="8000"
                      :breakpoints="{
                                320: {
                                  slidesPerView: 1,
                                },
                                1280: {
                                  slidesPerView: 2,
                                }
                              }"
                      :modules="modules"
                      :observer="true" :observeParents="true" :observeSlideChildren="true"
                      @swiper="onSwiperInit"
                      :autoplay="{
                                delay: 0,
                                enabled: true,
                                pauseOnMouseEnter: false,
                                disableOnInteraction: false,
                              }
" class="h-82 rounded-xl"
                  >
                    <swiper-slide v-for="(image, index) in images">
                      <img :src="image" :key="'1-' + index" alt="" class="w-full h-full object-cover rounded-xl hover:cursor-pointer" @click="() => showImg(index)">
                    </swiper-slide>
                  </swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-sub-2" id="main-sub-2">
          <div class="sub-2" id="sub-2">
            <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 font-medium">
              <div class="flex items-center">
                <div class="w-full max-w-full !rounded-xl">
                  <swiper
                      :tag="'main-2'"
                      :slides-per-view="3"
                      :space-between="20"
                      :direction="'horizontal'"
                      :centered-slides="true"
                      :loop="true"
                      :speed="8000"
                      :breakpoints="{
                      320: {
                        slidesPerView: 1,
                      },
                      1280: {
                        slidesPerView: 2,
                      }
                    }"
                      :modules="modules"
                      :autoplay="{
                      delay: 0,
                      enabled: true,
                      pauseOnMouseEnter: false,
                      disableOnInteraction: false,
                    }" class="h-82 rounded-xl"
                  >
                    <swiper-slide v-for="(image, index) in images">
                      <img :src="image" :key="'2-' + index" alt="" class="w-full h-full object-cover rounded-xl hover:cursor-pointer" @click="() => showImg(index)">
                    </swiper-slide>
                  </swiper>

                </div>
              </div>
              <div class="w-full h-full relative  flex flex-col sm:justify-center gap-4">
                <div class="text-2xl lg:text-4xl font-semibold text-yellow-400">
                  Iluminación Puntual
                </div>

                <div class="italic text-xl lg:text-2xl font-medium text-white/90">
                  "Detalle que eleva el nivel de tu boda".
                </div>

                <div class="text-base lg:text-lg text-white/70 leading-relaxed">
                  Cuando las flores dependen solo de iluminación ambiental, sus colores se apagan y su
                  impacto visual se pierde. La iluminación puntual es esencial para devolverles brillo y vida,
                  logrando que cada arreglo luzca como debe y que la inversión realmente se perciba y se
                  disfrute.
                </div>
              </div>

            </div>

          </div>
        </div>
        <div class="main-sub-3" id="main-sub-3">
          <div class="sub-3" id="sub-3">
            <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 font-medium">
              <div class="w-full h-full relative flex flex-col sm:justify-center gap-4 order-2 lg:order-1">
                <div class="text-2xl lg:text-4xl font-semibold text-yellow-400">
                  Iluminación a Paisajismo
                </div>

                <div class="italic text-xl lg:text-2xl font-medium text-white/90">
                  "La naturaleza también se diseña con luz".
                </div>

                <div class="text-base lg:text-lg text-white/70 leading-relaxed">
                  Diseñamos esquemas lumínicos que realzan la belleza de jardines y áreas verdes,
                  destacando formas, alturas y texturas con elegancia.
                </div>
              </div>
              <div class="flex items-center order-1 lg:order-2">
                <div class="w-full max-w-full !rounded-xl">
                  <swiper
                      :tag="'main-3'"
                      :slides-per-view="3"
                      :space-between="20"
                      :direction="'horizontal'"
                      :centered-slides="true"
                      :loop="true"
                      :speed="8000"
                      :breakpoints="{
                      320: {
                        slidesPerView: 1,
                      },
                      1280: {
                        slidesPerView: 2,
                      }
                    }"
                      :modules="modules"
                      :autoplay="{
                      delay: 0,
                      enabled: true,
                      pauseOnMouseEnter: false,
                      disableOnInteraction: false,
                    }" class="h-82 rounded-xl"
                  >
                    <swiper-slide v-for="(image, index) in images">
                      <img :src="image" :key="'3-' + index" alt="" class="w-full h-full object-cover rounded-xl hover:cursor-pointer" @click="() => showImg(index)">
                    </swiper-slide>
                  </swiper>
                </div>

              </div>
            </div>

          </div>
        </div>
        <div class="main-sub-4" id="main-sub-4">
          <div class="sub-4" id="sub-4">
            <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 font-medium">
              <div class="flex items-center">
                <div class="w-full max-w-full !rounded-xl">
                  <swiper
                      :tag="'main-4'"
                      :slides-per-view="3"
                      :space-between="20"
                      :direction="'horizontal'"
                      :centered-slides="true"
                      :loop="true"
                      :speed="8000"
                      :breakpoints="{
                      320: {
                        slidesPerView: 1,
                      },
                      1280: {
                        slidesPerView: 2,
                      }
                    }"
                      :modules="modules"
                      :autoplay="{
                      delay: 0,
                      enabled: true,
                      pauseOnMouseEnter: false,
                      disableOnInteraction: false,
                    }" class="h-82 rounded-xl"
                  >
                    <swiper-slide v-for="(image, index) in images">
                      <img :src="image" :key="'4-' + index" alt="" class="w-full h-full object-cover rounded-xl hover:cursor-pointer" @click="() => showImg(index)">
                    </swiper-slide>
                  </swiper>

                </div>
              </div>
              <div class="w-full h-full relative  flex flex-col sm:justify-center gap-4">
                <div class="text-2xl lg:text-4xl font-semibold text-yellow-400">
                  Drapeados Textiles
                </div>

                <div class="italic text-xl lg:text-2xl font-medium text-white/90">
                  "Texturas que envuelven, formas que transforman".
                </div>

                <div class="text-base lg:text-lg text-white/70 leading-relaxed">
                  Creamos composiciones con tela que redefinen techos y áreas completas, generando
                  escenarios elegantes, envolventes y visualmente impactantes.
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  </div>

  <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="images"
      :index="indexRef"
      @hide="onHide"
      :move-disabled="true"
      :zoom-disabled="false"
      :rotate-disabled="true"
      :pinch-disabled="false"
      :loop="true"
  >
    <template v-slot:prev-btn="{ next }">
    </template>
    <template v-slot:next-btn="{ next }">
    </template>
  </vue-easy-lightbox>
</template>

<style scoped>
.hero h1 {
  font-weight: 900;
  color: rgba(255, 255, 255, 0.25);
  text-align: center;
  margin: 0;
}

#third-content {
  position: relative;
  z-index: 10;
  margin-top: -100vh; /* 🔥 clave */
}

.scroll-down {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scroll-down span {
  display: block;
  width: 15px;
  height: 15px;
  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(45deg);
  margin: -5px; /* Para que queden pegaditos como en tu imagen */
  animation: scroll-arrows 2s infinite;
}

/* Retraso para el segundo chevron para crear el efecto cascada */
.scroll-down span:nth-child(2) {
  animation-delay: -0.2s;
}

@keyframes scroll-arrows {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-10px, -10px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(10px, 10px);
  }
}

:deep(.swiper-wrapper) {
  transition-timing-function: linear !important;
}
</style>