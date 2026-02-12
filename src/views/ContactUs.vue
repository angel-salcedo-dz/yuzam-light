<script setup>
import Header from "@/components/Header.vue";
import {gsap} from "gsap";
import {ScrollSmoother} from "gsap/ScrollSmoother";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {onMounted, ref} from "vue";
import { VueRecaptcha } from 'vue-recaptcha';
import InstagramLogo from '@/assets/Instagram_logo_2022.svg';
import WhatsappLogo from '@/assets/whatsapp_vertical.svg';

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import axios from "axios";
import moment from "moment";
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const isOpen = ref(false)
const siteKey = "6LdhY2QsAAAAADkqDrFnuFojsEGEZYt_2IJ8prbc";
const recaptchaRef = ref(null); // Para resetearlo después

const handleExecute = () => {
  // Ejecuta el captcha invisible manualmente
  recaptchaRef.value.execute();
};

const onVerify = (token) => {
  // Cuando el usuario resuelve el captcha, ejecutamos el envío
  sendForm(token);
};

const onExpired = () => {
  console.log("El captcha expiró");
};

function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
}

onMounted(() => {
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    normalizeScroll: true // Evita conflictos en dispositivos táctiles
  });

})

let today = moment().format('YYYY-MM-DD')

let isLoading = ref(false)
let hasFormError = ref(false)
let formError = ref('')

let form = ref({
  name: '',
  phone: '',
  date: '',
  place: '',
  type: '',
  comments: ''
});

let sendForm = (token) => {
  if (isLoading.value) {
    return;
  }

  isLoading.value = true

  try {
    axios.post('https://formspree.io/f/meelazld', {
      'Nombre': form.value.name,
      'Teléfono de contacto': form.value.phone,
      'Fecha del evento': form.value.date,
      'Lugar del evento': form.value.place,
      'Tipo de celebración': form.value.type,
      'Cuéntanos tu idea': form.value.comments,
      'g-recaptcha-response': token
    }, {
      headers: {
        'Accept': 'application/json'
      }
    }).then(() => {
      openModal()

      hasFormError.value = false
      formError.value = ''

      form.value.name = '';
      form.value.phone = '';
      form.value.date = '';
      form.value.place = '';
      form.value.type = '';
      form.value.comments = '';
    }).catch((err) => {
      hasFormError.value = true
      formError.value = 'Hubo un error al procesar tu solicitud.'

      recaptchaRef.value.reset();
    }).finally(() => isLoading.value = false )
  } catch (error) {
    hasFormError.value = true
    formError.value = 'Hubo un error al procesar tu solicitud.'
  }
}
</script>

<template>
  <Header/>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <div class="bg-black min-h-screen p-4 lg:p-10 w-full relative">
        <section class="text-white/90 text-xl z-2 pt-24">
          <div class="w-full h-full p-0 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-16 lg:divide-x">
            <div
                class="flex lg:justify-center items-center border-b border-white lg:border-b-0 lg:pt-0 pb-6 lg:pb-0">
              <div class="space-y-8">

                <div>
                  <a href="#" target="_blank">
                    <div class="flex gap-4 items-center">
                      <div>
                        <img :src="WhatsappLogo" alt="" class="size-9 rounded-lg">
                      </div>
                      <div class="space-y-1 text-base">
                        <div class="text-white/80 leading-relaxed">
                          Whatsapp
                        </div>
                        <div class="text-white underline">
                          <a href="#" target="_blank">Contáctanos aquí</a>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div>
                  <a href="https://www.instagram.com/yuzamlighting/" target="_blank">
                    <div class="flex gap-4 items-center">
                      <div>
                        <img :src="InstagramLogo" alt="" class="size-9">
                      </div>
                      <div class="space-y-1 text-base">
                        <div class="text-white/80 leading-relaxed">
                          Instagram
                        </div>
                        <div class="text-white">
                          @yuzamlighting
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="flex gap-4 items-center">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="icon icon-tabler icons-tabler-outline icon-tabler-mail size-9">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10"/>
                      <path d="M3 7l9 6l9 -6"/>
                    </svg>
                  </div>
                  <div class="space-y-1 text-base">
                    <div class="text-white/80 leading-relaxed">
                      Email
                    </div>
                    <div class="text-white">
                      yuzamlight.contact@gmail.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lg:col-span-2 pb-6 lg:pb-0">
              <form @submit.prevent="handleExecute" class="rounded-xl space-y-4">
                <div
                    class="text-3xl lg:text-5xl font-semibold text-white tracking-wide pb-4 text-left"
                >
                  Diseñemos juntos
                </div>
                <div class="text-lg lg:text-xl text-white/80 leading-relaxed">
                  Cada celebración es distinta, cuéntanos lo que tienes en mente y
                  empecemos a diseñar tu evento.
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <input v-model="form.name" required name="Nombre" id="Nombre" type="text"
                           class="mt-2 block bg-zinc-700 rounded-md w-full text-base px-4 py-2 text-white font-semibold placeholder-white/70"
                           placeholder="Nombre completo">
                  </div>
                  <div>
                    <input v-model="form.phone" required name="Teléfono de contacto" id="Teléfono de contacto"
                           type="text"
                           class="mt-2 block bg-zinc-700 rounded-md w-full text-base px-4 py-2 text-white font-semibold placeholder-white/70"
                           placeholder="Teléfono de contacto">
                  </div>
                </div>
                <div class="relative">
                  <label for="Fecha del evento"
                         class="absolute text-white/70 text-base font-semibold top-1/2 -translate-y-1/2 left-4 border-r border-white/70 pr-4">
                    Fecha del evento
                  </label>
                  <input v-model="form.date" :min="today" required name="Fecha del evento" id="Fecha del evento" type="date"
                         class="mt-2 block bg-zinc-700 rounded-md w-full text-base px-4 py-2 pl-44 text-white font-semibold placeholder-white/70 accent-white/70 scheme-dark">
                </div>
                <div>
                  <input v-model="form.place" required name="Lugar del evento" id="Lugar del evento" type="text"
                         class="mt-2 block bg-zinc-700 rounded-md w-full text-base px-4 py-2 text-white font-semibold placeholder-white/70"
                         placeholder="Lugar del evento">
                </div>
                <div>
                  <input v-model="form.type" required name="Tipo de celebración" id="Tipo de celebración" type="text"
                         class="mt-2 block bg-zinc-700 rounded-md w-full text-base px-4 py-2 text-white font-semibold placeholder-white/70"
                         placeholder="Tipo de celebración (boda, cóctel, recepción, evento privado)">
                </div>
                <div>
                  <textarea v-model="form.comments" required name="Cuéntanos tu idea" id="Cuéntanos tu idea" rows="6"
                            class="mt-2 block bg-zinc-700 rounded-md w-full text-base px-4 py-2 text-white font-semibold placeholder-white/70"
                            placeholder="Cuéntanos tu idea"></textarea>
                </div>
                <div v-if="hasFormError" class="text-base text-left text-red-500">
                    {{ formError }}
                </div>
                <VueRecaptcha
                    ref="recaptchaRef"
                    size="invisible"
                    :sitekey="siteKey"
                    @verify="onVerify"
                    @expired="onExpired"
                />
                <div class="flex justify-end">
                  <button type="submit" :disabled="isLoading"
                          class="px-6 py-3 rounded-md bg-yellow-400 font-semibold text-black text-base hover:cursor-pointer hover:bg-yellow-500 transition duration-200 flex items-center">
                    <div v-if="isLoading">
                      <svg class="mr-3 -ml-1 size-5 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </div>
                    {{ isLoading ? 'Espera un momento...' : 'Enviar mensaje' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/70"/>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
              >
                Mensaje enviado
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Gracias por compartirnos tu idea. Nos tomaremos un momento para revisar la información y muy pronto
                  nos pondremos en contacto contigo
                </p>
              </div>

              <div class="mt-4">
                <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:cursor-pointer"
                    @click="closeModal"
                >
                  Aceptar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>

</style>