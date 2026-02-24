<script lang="ts" setup>
const faqs = [
  {
    question: 'Kailan at saan ang kasal?',
    answer: 'Ang kasal ay sa Mayo 16, 2026 (Sabado) sa Santuario de San Ezekiel Moreno. Ang seremonya ay magsisimula ng 3:00 ng hapon.',
  },
  {
    question: 'Kailangan ko bang mag-RSVP?',
    answer: 'Opo! Mangyaring mag-RSVP bago mag-Mayo 1, 2026 upang matulungan kami sa paghahanda. Maaari kang mag-RSVP sa pamamagitan ng form sa website na ito.',
  },
  {
    question: 'Pwede ba akong magdala ng kasama o plus one?',
    answer: 'Dahil limitado ang bilang ng upuan, ang imbitasyon ay para lamang sa mga nakasaad na pangalan. Mangyaring makipag-ugnayan sa amin kung may katanungan.',
  },
  {
    question: 'Ano ang dress code?',
    answer: 'Modern filipiniana/barong/mixed attire. Mangyaring iwasan ang puting damit bilang paggalang sa bride. Pumunta sa dress code section.',
  },
  {
    question: 'Pwede bang dalhin ang mga bata?',
    answer: 'Gusto naming maging masaya ang lahat, ngunit gusto rin naming maiwasan ang pagdadala ng bata para hindi sila mapagod at ang okasyon na ito ay para sa pagsasama-sama ng mga adults.',
  },
  {
    question: 'Mayroon bang parking sa venue?',
    answer: 'Opo, may available na parking area sa venue. Nirerekomenda namin ang pagdating ng maaga upang makakuha ng parking slot.',
  },
  {
    question: 'Paano kung hindi ako makakapunta?',
    answer: 'Ikinalulungkot namin kung hindi ka makakapunta. Mangyaring i-update ang iyong RSVP upang malaman namin. Kami ay magpapasalamat pa rin sa iyong pagbati!',
  },
]

const openIndex = ref<number | null>(null)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section id="faq" class="py-28 bg-wedding-ivory">
    <div class="max-w-3xl mx-auto px-5">
      <SectionHeader subtitle="May katanungan ka ba?" title="Mga Madalas Itanong" />

      <div class="space-y-3">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="border border-wedding-beige bg-white overflow-hidden transition-all duration-300"
        >
          <!-- Question button -->
          <button
            class="w-full flex items-center justify-between px-6 py-5 text-left group"
            @click="toggle(index)"
          >
            <span class="font-display text-lg text-wedding-dark group-hover:text-wedding-gold transition-colors pr-4">
              {{ faq.question }}
            </span>
            <svg
              class="w-5 h-5 text-wedding-gold shrink-0 transition-transform duration-300"
              :class="{ 'rotate-180': openIndex === index }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Answer panel -->
          <Transition name="accordion">
            <div v-if="openIndex === index" class="accordion-content">
              <div class="px-6 pb-5">
                <div class="border-t border-wedding-beige pt-4">
                  <p class="text-wedding-warm leading-relaxed text-sm">
                    {{ faq.answer }}
                  </p>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 200px;
  opacity: 1;
}
</style>
