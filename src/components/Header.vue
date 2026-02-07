<script setup>
import {RouterLink} from "vue-router";
import {Bars3Icon, XMarkIcon} from "@heroicons/vue/24/outline";
import {ref} from "vue";

let showSidebar = ref(false)

</script>

<template>
  <Transition name="fade">
    <aside v-show="showSidebar" class="bg-black/70 fixed inset-0 z-30 ">
      <div class="w-full h-full relative">
        <div @click.self="showSidebar = false" class="absolute w-full h-full right-0 flex items-start justify-end gap-2">
          <button @click="showSidebar = false" class="text-white/90 border border-white/90 rounded-md mt-2">
            <XMarkIcon class="size-8"/>
          </button>
          <div class="bg-white/95 w-1/2 h-full right-0 p-4 flex flex-col items-center gap-16">
            <div class="flex flex-col w-full text-center">
              <router-link @click="showSidebar = false" to="/" class="hover:text-zinc-400 transition-all duration-200 py-4 border-b border-zinc-800">Inicio</router-link>
              <router-link @click="showSidebar = false" to="/quienes-somos" class="hover:text-zinc-400 transition-all duration-200 py-4 border-b border-zinc-800">Quiénes somos</router-link>
              <router-link @click="showSidebar = false" to="/preguntas-frecuentes" class="hover:text-zinc-400 transition-all duration-200 py-4 border-b border-zinc-800">Preguntas frecuentes</router-link>
              <router-link @click="showSidebar = false" to="/contactanos" class="hover:text-zinc-400 transition-all duration-200 pt-4">Contáctanos</router-link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </Transition>
  <div class="fixed z-20 top-0 w-full flex justify-between items-center gap-2 text-white/90 px-4 pt-4 lg:px-10 lg:pt-8">
    <div>
      <router-link to="/">
        <div class="max-w-[3rem]">
          <img src="@/assets/main_icon.jpg" alt="" class="rounded-full">
        </div>
      </router-link>
    </div>
    <div class="hidden lg:flex items-center gap-6">
      <router-link to="/quienes-somos" class="hover:text-zinc-400 transition-all duration-200">Quiénes somos</router-link>
      <router-link to="/preguntas-frecuentes" class="hover:text-zinc-400 transition-all duration-200">Preguntas frecuentes</router-link>
      <router-link to="/contactanos" class="hover:text-zinc-400 transition-all duration-200">Contáctanos</router-link>
    </div>
    <div class="block lg:hidden">
      <button @click="showSidebar = true" class="text-white/90 p-2 bg-zinc-200/10 rounded-full active:scale-95 z-10">
        <Bars3Icon class="size-8"/>
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>