<script setup>
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import {onMounted} from "vue";
import {gsap} from "gsap";
import Header from "@/components/Header.vue";
import MainImage from "@/assets/1.jpeg";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


onMounted(() => {
  let mm = gsap.matchMedia();


  mm.add(
      {
        // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 639px)",
      },
      (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        let { isDesktop, isMobile, } = context.conditions;

        const smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5,
          normalizeScroll: true // Evita conflictos en dispositivos táctiles
        });

        gsap.set(['.s2', '.s3'], {
          yPercent: 100
        })

        gsap.set(['.services'], {
          opacity: 0.4
        })

        gsap.set(['.info-text'], {
          opacity: 0,
          xPercent: -10
        })

        gsap.set(['.info-image'], {
          opacity: 0,
          xPercent: 10
        })

        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#content",
            start: "top top",
            end: "+=600%", // Duración total de toda la experiencia
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });

        mainTl.to(".s1 .title", { xPercent: isMobile ? -400 : -250, duration: 1 })
            .to(".s1 .description", { y: 100, opacity: 0, stagger: 0.3}, 0.1)

        mainTl.to(".s2", {
          yPercent: 0,
          duration: 2,
          ease: "power1.inOut"
        }).to(".info-text", {
          opacity: 1,
          xPercent: 0,
          stagger: 0.1,
          duration: 1.2
        }, 2.3).to(".info-image", {
          opacity: 1,
          xPercent: 0,
          duration: 1.2
        }, 2.3);

// Pausa opcional en S2

        mainTl.to(".s3", {
          yPercent: 0,
          duration: 2,
          ease: "power1.inOut"
        }).to('.services', {
          opacity: 1
        }, 5)

        mainTl.to("#sub1", { opacity: 1, y: -20, duration: 1 }, 5)
            .to("#sub1", { opacity: 0, y: -40, duration: 1 }, ) // Pausa de 1 unidad de scroll
            .to("#sub2", { opacity: 1, y: -20, duration: 1 })
            .to("#sub2", { opacity: 0, y: -40, duration: 1 }, )
            .to("#sub3", { opacity: 1, y: -20, duration: 1 })
            .to("#sub3", { opacity: 0, y: -20, duration: 1 })
            .to("#sub4", { opacity: 1, y: -20, duration: 1 })

        mainTl.to({}, { duration: 2 });
        mainTl.to({}, { duration: 1 });

      }
  );


})
</script>

<template>
  <Header />
  <div id="smooth-wrapper" class="overflow-x-hidden">
    <div id="smooth-content" class="overflow-x-hidden">
      <div id="content" class="relative ">
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

        <section id="about-us" class="s2 w-full h-screen bg-black overflow-hidden absolute text-white/90 text-xl lg:text-2xl xl:text-3xl z-2">
          <div id="s2-sub" class="s2-sub w-full h-full grid grid-cols-1 sm:grid-cols-2 -mt-8 sm:-mt-10 gap-4 lg:gap-16 px-4 pt-24 lg:px-10">
            <div class="w-full h-full flex flex-col justify-center gap-6 max-w-3xl order-2 sm:order-1">

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
            <div class="flex items-center order-1 sm:order-2 info-image">
              <img src="@/assets/1_4.jpeg" alt="" class="rounded-md">
            </div>
          </div>
        </section>

        <section class="s3 w-full h-screen bg-black text-white/90 absolute z-3 overflow-hidden">
          <div class="px-4 pt-28 lg:px-10 space-y-16 relative services">
            <div
                id="services-title"
                class="services-title text-3xl lg:text-5xl font-semibold text-white text-center tracking-wide pb-4"
            >
              Servicios
            </div>
            <div class="sub-content pr-4 lg:pr-10" id="sub1">
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
                <div class="flex items-center order-1 lg:order-2">
                  <div class="sm:max-w-lg lg:max-w-full mx-auto">
                    <img src="@/assets/1_4.jpeg" alt="" class="rounded-md">
                  </div>
                </div>
              </div>

            </div>
            <div class="sub-content pr-4 lg:pr-10" id="sub2">
              <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 font-medium">
                <div class="flex items-center">
                  <div class="sm:max-w-lg lg:max-w-full mx-auto ">
                    <img src="@/assets/1_5.jpeg" alt="" class="rounded-md">
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
            <div class="sub-content pr-4 lg:pr-10" id="sub3">
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
                  <div class="sm:max-w-lg lg:max-w-full mx-auto">
                    <img src="@/assets/1_3.jpeg" alt="" class="rounded-md">
                  </div>
                </div>
              </div>

            </div>
            <div class="sub-content pr-4 lg:pr-10" id="sub4">
              <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 font-medium">
                <div class="flex items-center">
                  <div class="sm:max-w-lg lg:max-w-full mx-auto">
                    <img src="@/assets/1_2.jpeg" alt="" class="rounded-md">
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

        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero h1 {
  font-weight: 900;
  color: rgba(255, 255, 255, 0.25);
  text-align: center;
  margin: 0;
}
body { margin: 0; font-family: sans-serif; overflow-x: hidden; background: #000; color: white; }
#smooth-content {
  overflow: visible;
}
.sub-content { position: absolute; opacity: 0; }
</style>