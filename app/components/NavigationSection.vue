<script lang="ts" setup>
const mobileOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { href: '#home', label: 'Tahanan' },
  { href: '#story', label: 'Ang Aming Kuwento' },
  { href: '#details', label: 'Mga Detalye' },
  // { href: '#entourage', label: 'Entourage' },
  { href: '#rsvp', label: 'RSVP' },
  { href: '#faq', label: 'Mga Katanungan' },
]

watch(mobileOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})
</script>

<template>
  <nav
:class="[
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isScrolled ? 'bg-wedding-dark/95 backdrop-blur-md py-4' : 'py-5'
  ]">
    <div class="max-w-7xl mx-auto px-5 flex justify-between items-center">
      <a href="#home">
        <!-- <img :src="logo" alt="D x J" class="h-10"> -->
        <span>&nbsp;</span>
      </a>

      <ul class="hidden lg:flex gap-10">
        <li v-for="link in navLinks" :key="link.href">
          <a
:href="link.href" 
             class="text-wedding-ivory text-sm tracking-widest uppercase font-normal hover:text-wedding-gold transition-colors">
            {{ link.label }}
          </a>
        </li>
      </ul>
      
      <button class="lg:hidden p-2 group" @click="mobileOpen = !mobileOpen">
        <span
class="block w-6 h-0.5 bg-wedding-ivory mb-1.5 transition-transform" 
              :class="{ 'rotate-45 translate-y-2': mobileOpen }"/>
        <span
class="block w-6 h-0.5 bg-wedding-ivory mb-1.5 transition-opacity" 
              :class="{ 'opacity-0': mobileOpen }"/>
        <span
class="block w-6 h-0.5 bg-wedding-ivory transition-transform" 
              :class="{ '-rotate-45 -translate-y-2': mobileOpen }"/>
      </button>
    </div>
    
    <!-- Mobile Menu -->
    <Transition name="fade">
      <div
v-if="mobileOpen"
           class="lg:hidden fixed inset-0 bg-wedding-dark z-[60] flex items-center justify-center overflow-y-auto">
        <!-- Close Button -->
        <button
          class="absolute top-6 right-6 p-2"
          aria-label="Close menu"
          @click="mobileOpen = false">
          <span class="block w-7 h-0.5 bg-wedding-ivory rotate-45 translate-y-0.5"/>
          <span class="block w-7 h-0.5 bg-wedding-ivory -rotate-45 -translate-y-0"/>
        </button>

        <ul class="text-center space-y-6">
          <li v-for="link in navLinks" :key="link.href">
            <a
:href="link.href" 
               class="font-display text-3xl text-wedding-ivory hover:text-wedding-gold transition-colors"
               @click="mobileOpen = false">
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>