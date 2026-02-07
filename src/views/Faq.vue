<script setup>
import Header from "@/components/Header.vue";
import {gsap} from "gsap";
import {ScrollSmoother} from "gsap/ScrollSmoother";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {onMounted} from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

onMounted(() => {
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    normalizeScroll: true // Evita conflictos en dispositivos táctiles
  });

})

const faqs = [
  {
    question: "¿Qué costo tiene un servicio con ustedes?",
    answer:
        " Cada evento es único, por lo que no manejamos precios en paquete. Nuestros servicios se diseñan de forma personalizada según el espacio, las ideas y el alcance del proyecto"
  },
  {
    question: '¿Con cuánta anticipación debo contactarlos? ',
    answer:
        'Recomendamos ponernos en contacto al menos con dos meses de anticipación. Esto nos permite desarrollar propuestas con mayor detalle, explorar ideas y planificar cada elemento con el tiempo que merece.',
  },
  {
    question: '¿Ofrecen servicio de DJ o música?',
    answer:
        'No. Nuestro enfoque está exclusivamente en el diseño y producción visual del venue. Nos dedicamos a crear atmósferas, no a la musicalización.',
  },
  {
    question: '¿En qué zonas ofrecen servicio?',
    answer:
        "Nos ubicamos en Cuernavaca, Morelos y sus municipios cercanos. ",
  },
  {
    question: "¿Pueden adaptar un diseño a un presupuesto específico?",
    answer:
        'Depende del alcance, complejidad y nivel de producción requerido. A partir de esto, proponemos soluciones acordes que mantengan un alto estándar estético.',
  },
  {
    question: '¿Trabajan con venues específicos o se adaptan a cualquier espacio?',
    answer:
        "Si, trabajamos continuamente en: Hotel Las Mañanitas, Hacienda Chiconcuac, Hacienda Acamilpa, Hotel Fiesta Americana San Antonio el Puente, Hacienda San Gabriel Las Palmas, " +
        "Piedra Viva y Rincón del Bosque. También nos adaptamos a distintos espacios siempre que " +
        "cuenten con las condiciones necesarias para realizar el montaje deseado. La seguridad es " +
        "prioritaria, por lo que evaluamos cuidadosamente qué es viable y qué no en cada espacio. \n",
  },
  {
    question: "¿Incluyen instalación y desmontaje?",
    answer:
        'La instalación y desmontaje por parte de técnicos se cotiza por separado y siempre se especifica dentro de la propuesta enviada.',
  },
  {
    question: "¿Realizan visitas técnicas al lugar?",
    answer:
        'Sí. Las visitas técnicas son clave para verificar viabilidad, tomar medidas y planear correctamente cada instalación.',
  },
  {
    question: "¿Pueden trabajar con referencias o ideas que ya tengamos?",
    answer:
        'Sí, y es lo ideal. Cuando los clientes tienen una idea clara, podemos comprender mejor su visión, proponer soluciones acertadas e incluso desarrollar conceptos completamente nuevos a partir de sus referencias.',
  },
  {
    question: "¿Qué pasa si ocurre un problema técnico durante el evento? ",
    answer:
        'Trabajamos con equipos confiables y una planificación precisa. Aun así, pueden surgir contratiempos fuera de nuestro alcance, por esto contamos con protocolos y respaldo ' +
        'técnico para atender cualquier imprevisto de forma inmediata. ' +
        'Cuando el proyecto lo requiere, asignamos personal técnico en sitio durante todo el evento \n' +
        'para garantizar una atención inmediata. ',
  },
  {
    question: "¿Qué otro tipo de servicios ofrecen?",
    answer:
        'Nos enfocamos únicamente en los rubros disponibles dentro del apartado "servicios" en esta misma página. ',
  },
]
</script>

<template>
  <Header/>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <div class="bg-black min-h-screen p-4 lg:p-10 w-full relative">
        <section class="text-white/90 text-xl z-2 pt-24">
          <div class="w-full h-full grid grid-cols-1 gap-4 lg:gap-16 ">
            <div class="w-full h-full relative  flex flex-col sm:justify-center gap-4 ">
              <div
                  class="text-3xl lg:text-5xl font-semibold text-white tracking-wide pb-4"
              >
                Preguntas frecuentes
              </div>
            </div>
            <div class="">
              <dl class="space-y-2">
                <Disclosure as="div" v-for="faq in faqs" :key="faq.question" class="p-4 bg-zinc-900 rounded-xl" v-slot="{ open }">
                  <dt class="">
                    <DisclosureButton class="flex w-full items-start justify-between text-left ">
                      <span class="text-base/7 font-semibold">{{ faq.question }}</span>
                      <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon v-if="!open" class="size-6" aria-hidden="true" />
                  <MinusSmallIcon v-else class="size-6" aria-hidden="true" />
                </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as="dd" class="mt-2 pr-12">
                    <p class="text-base/7 text-zinc-300/90">{{ faq.answer }}</p>
                  </DisclosurePanel>
                </Disclosure>
              </dl>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>