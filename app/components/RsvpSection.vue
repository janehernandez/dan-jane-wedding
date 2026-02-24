<script lang="ts" setup>
const { isSubmitting, isSuccess, error, isDuplicate, duplicateField, submitRsvp, resetState } = useRsvp()
const form = ref({ name: '', phone: '', email: '', attending: 'yes', message: '' })

const attendOptions = [
  { value: 'yes', label: 'Ikinagagalak kong tanggapin ang imbitasyon' },
  { value: 'no', label: 'Ikinalulungkot ko na ako ay hindi makakapunta' },
]

const showModal = ref(false)
const rsvpDeadline = new Date('2026-05-01T00:00:00')
const isRsvpClosed = computed(() => new Date() >= rsvpDeadline)

const submitForm = async () => {
  const success = await submitRsvp(form.value)
  if (success) {
    showModal.value = true
  }
}

const closeModal = () => {
  showModal.value = false
  resetState()
  form.value = { name: '', phone: '', email: '', attending: 'yes', message: '' }
}
</script>

<template>
  <section id="rsvp" class="relative min-h-screen flex items-center bg-wedding-beige overflow-hidden">
    <!-- Decorative botanical elements -->
    <svg class="absolute top-8 right-8 w-24 h-24 text-wedding-warm/30 hidden lg:block" viewBox="0 0 100 100" fill="none">
      <path d="M50 10 Q60 30 50 50 Q40 30 50 10" stroke="currentColor" stroke-width="1" fill="none"/>
      <path d="M50 50 Q70 45 80 60" stroke="currentColor" stroke-width="1" fill="none"/>
      <path d="M50 50 Q30 45 20 60" stroke="currentColor" stroke-width="1" fill="none"/>
      <circle cx="50" cy="10" r="2" fill="currentColor"/>
      <circle cx="80" cy="60" r="2" fill="currentColor"/>
      <circle cx="20" cy="60" r="2" fill="currentColor"/>
    </svg>

    <svg class="absolute bottom-12 left-1/2 w-32 h-16 text-wedding-warm/30 hidden lg:block" viewBox="0 0 120 50" fill="none">
      <path d="M10 25 Q30 10 60 25 Q90 40 110 25" stroke="currentColor" stroke-width="1" fill="none"/>
      <path d="M30 25 L30 35 M60 20 L60 35 M90 25 L90 35" stroke="currentColor" stroke-width="1"/>
      <circle cx="30" cy="38" r="2" fill="currentColor"/>
      <circle cx="60" cy="38" r="2" fill="currentColor"/>
      <circle cx="90" cy="38" r="2" fill="currentColor"/>
    </svg>

    <div class="w-full max-w-7xl mx-auto px-0 lg:px-5 py-16 lg:py-0">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Left Side - Full Width Image -->
        <div class="relative">
          <!-- Main image container -->
          <div class="relative w-full h-72 md:h-96 lg:aspect-square lg:h-auto group">
            <!-- Image with warm tone -->
            <img
              src="/images/rsvp2.JPG"
              alt="Wedding table setup"
              class="rsvp-image w-full h-full object-cover"
            >

            <!-- Warm golden overlay -->
            <div class="absolute inset-0 bg-gradient-to-br from-wedding-gold/15 via-transparent to-wedding-warm/20 mix-blend-multiply" />

            <!-- Soft vignette effect -->
            <div class="absolute inset-0 rsvp-vignette" />

            <!-- Decorative border - top right and bottom right only (desktop only) -->
            <div class="hidden lg:block absolute -top-4 -right-4 w-full h-full pointer-events-none">
              <svg class="w-full h-full" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
                <!-- Top border (partial) -->
                <line x1="40" y1="0" x2="100" y2="0" stroke="currentColor" stroke-width="0.3" class="text-wedding-warm" />
                <!-- Right border (full) -->
                <line x1="100" y1="0" x2="100" y2="100" stroke="currentColor" stroke-width="0.3" class="text-wedding-warm" />
                <!-- Bottom border (partial) -->
                <line x1="100" y1="100" x2="40" y2="100" stroke="currentColor" stroke-width="0.3" class="text-wedding-warm" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Right Side - Form -->
        <div class="lg:pl-8 px-5">
          <!-- Header -->
          <p class="text-xs tracking-[0.3em] uppercase text-wedding-warm mb-4">
            Handa Ka Na Bang Makipagsaya?
          </p>
          <h2 class="font-display text-4xl md:text-5xl lg:text-6xl text-wedding-dark leading-tight mb-2">
            Sana'y Makasama<br>Ka sa Aming<br>Espesyal na Araw
          </h2>
          <p class="font-display italic text-wedding-warm text-lg mb-10">
            Pakisagot bago mag-Mayo 1, 2026
          </p>

          <!-- RSVP Closed Message -->
          <div v-if="isRsvpClosed" class="max-w-md">
            <p class="text-wedding-warm leading-relaxed mb-2">
              Ang RSVP ay sarado na.
            </p>
            <p class="text-wedding-dark/60 text-sm">
              Kung mayroon kang katanungan, mangyaring makipag-ugnayan sa amin nang direkta.
            </p>
          </div>

          <!-- Form with underlined inputs -->
          <form v-else class="space-y-6 max-w-md" @submit.prevent="submitForm">
            <!-- Name -->
            <div class="relative">
              <input
                v-model="form.name"
                type="text"
                placeholder="Your Name"
                required
                class="w-full py-3 bg-transparent border-b border-wedding-warm/30 text-wedding-dark placeholder-wedding-dark/50 focus:outline-none focus:border-wedding-gold transition-colors text-sm"
              >
              <p v-if="isDuplicate && duplicateField === 'name'" class="mt-1 text-xs text-amber-600">
                Naka-RSVP na ang pangalang ito
              </p>
            </div>

            <!-- Phone -->
            <div class="relative">
              <input
                v-model="form.phone"
                type="tel"
                placeholder="Your Phone"
                class="w-full py-3 bg-transparent border-b border-wedding-warm/30 text-wedding-dark placeholder-wedding-dark/50 focus:outline-none focus:border-wedding-gold transition-colors text-sm"
              >
            </div>

            <!-- Email -->
            <div class="relative">
              <input
                v-model="form.email"
                type="email"
                placeholder="Your Email"
                required
                class="w-full py-3 bg-transparent border-b border-wedding-warm/30 text-wedding-dark placeholder-wedding-dark/50 focus:outline-none focus:border-wedding-gold transition-colors text-sm"
              >
              <p v-if="isDuplicate && duplicateField === 'email'" class="mt-1 text-xs text-amber-600">
                Ang email na ito ay nagamit na sa ibang RSVP
              </p>
            </div>

            <!-- Attendance Select -->
            <div class="relative">
              <select
                v-model="form.attending"
                class="w-full py-3 bg-transparent border-b border-wedding-warm/30 text-wedding-dark focus:outline-none focus:border-wedding-gold transition-colors text-sm appearance-none cursor-pointer"
              >
                <option v-for="opt in attendOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
              <!-- Dropdown arrow -->
              <svg class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-wedding-warm pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <!-- Message -->
            <div class="relative">
              <textarea
                v-model="form.message"
                placeholder="Message (optional)"
                rows="3"
                class="w-full py-3 bg-transparent border-b border-wedding-warm/30 text-wedding-dark placeholder-wedding-dark/50 focus:outline-none focus:border-wedding-gold transition-colors text-sm resize-none"
              />
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="px-10 py-4 border border-wedding-dark text-wedding-dark text-xs tracking-[0.2em] uppercase font-medium hover:bg-wedding-dark hover:text-wedding-ivory transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting">Sending...</span>
                <span v-else-if="isSuccess">Thank You!</span>
                <span v-else>Send RSVP</span>
              </button>
              <p v-if="error" class="mt-3 text-sm text-red-600">
                {{ error }}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Success Modal -->
    <Transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center px-4"
        @click.self="closeModal"
      >
        <div class="absolute inset-0 bg-wedding-dark/60 backdrop-blur-sm" />
        <div class="relative bg-wedding-ivory rounded-sm px-8 py-12 md:px-14 md:py-16 max-w-md w-full text-center shadow-2xl">
          <div class="text-wedding-gold text-4xl mb-4">&hearts;</div>
          <h3 class="font-display text-3xl md:text-4xl text-wedding-dark mb-3">
            Maraming Salamat!
          </h3>
          <p class="font-display italic text-wedding-warm text-lg mb-2">
            Natanggap na namin ang iyong RSVP
          </p>
          <p class="text-wedding-dark/60 text-sm mb-8">
            Inaabangan ka namin sa aming espesyal na araw.
          </p>
          <button
            class="px-10 py-3 border border-wedding-dark text-wedding-dark text-xs tracking-[0.2em] uppercase font-medium hover:bg-wedding-dark hover:text-wedding-ivory transition-all duration-300"
            @click="closeModal"
          >
            Isara
          </button>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
/* RSVP image warm tone effect */
.rsvp-image {
  filter: sepia(0.15) saturate(1.1) brightness(0.95) contrast(1.05);
  transition: filter 0.6s ease;
}

.group:hover .rsvp-image {
  filter: sepia(0.08) saturate(1.15) brightness(1) contrast(1.05);
}

/* Soft vignette around edges */
.rsvp-vignette {
  background: radial-gradient(
    ellipse at center,
    transparent 50%,
    rgba(61, 48, 40, 0.25) 100%
  );
  pointer-events: none;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

.modal-leave-to .relative {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}
</style>
