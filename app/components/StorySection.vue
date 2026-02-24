<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const stories = [
  {
    title: 'Unang Pagtatagpo',
    date: 'Setyembre 2019',
    description: 'Sa di-inaakalang pagkakataon, pinagtagpo ng tadhana ang dalawang pusong galing sa bigong pagmamahalan. Isang taga-siyudad ng Las Piñas na nagpakalayo-layo sa kabundukan ng Baguio upang makalimot sa nakaraan, at isang galing sa probinsya ng Cavite na ang propesyonal na larangan ang takbuhan upang maghilom ang pusong sugatan. Sa unang tingin, agad nagkaintindihan—para bang dalawang batang walang muwang, at ang loob sa isa\'t isa ay kay gaan.',
    shape: 'circle',
    picture: '/images/2.jpg',
  },
  {
    title: 'Naging Sila',
    date: 'Oktubre 31, 2019',
    description: 'Nagsimula sa simple na asaran at kulitan, naging matalik na magkaibigan, at nagsilbing sandalan ang isa\'t isa. Lumabas ng may kasamang kaibigan, lumabas ng isa\'t isa lamang ang katuwang, hanggang ang pagibig ay hindi na maitago. Nag-amin ang ginoo ng kanyang tunay na nararamdaman. Umabot ng ilang buwan ang pagsuyo, at ang binibini ay sumagot na ng "Oo." Oktubre 31, taong 2019—isa sa pinakamasayang araw ng dalawang puso. Noon ay dalawang magkahiwalay, ngayon magkasama na tungo sa paglalakbay. Sinubok ng sakuna, gulo, at trahedya, ngunit ang pangako sa isa\'t isa ay mas matibay.',
    shape: 'rounded-square',
    picture: '/images/3.jpg',
  },
  {
    title: 'Ang Pagluhod',
    date: 'Marso 2025',
    description: 'Sumapit ang anim na matatamis na taon at nilampasan ang mga hamon. Pinagtibay ng pagsubok, mas tumamis ang pagibig sa haba ng panahon. Sa ibang nayon, sa hilagang-kanluran, lumuhod ang ginoo upang hingin ang kanyang kamay. Sinagot ng luha, ngiti, at isang matamis na "Oo"—at iniabot ang kanyang kamay. Sa araw ng Mayo 16, taong 2026, ang pagiisang dibdib—araw na hinintay ng dalawa upang maglakbay sa panibagong antas ng pagibig.',
    shape: 'circle',
    picture: '/images/proposal.jpg',
  },
]

const timelineItems = ref<HTMLElement[]>([])
const visibleItems = ref<Set<number>>(new Set())
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute('data-index'))
        if (entry.isIntersecting) {
          visibleItems.value.add(index)
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  timelineItems.value.forEach((item) => {
    if (item) observer?.observe(item)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})

const setItemRef = (el: HTMLElement | null, index: number) => {
  if (el) timelineItems.value[index] = el
}
</script>

<template>
  <section id="story" class="py-28 bg-wedding-ivory">
    <div class="max-w-6xl mx-auto px-5">
      <SectionHeader subtitle="Paano ito nagsimula?" title="Ang Aming Kuwento" />

      <!-- Timeline container -->
      <div class="relative">
        <!-- Vertical center line (hidden on mobile) -->
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-wedding-beige -translate-x-1/2" />

        <!-- Timeline items -->
        <div class="space-y-16 md:space-y-24">
          <div
            v-for="(story, index) in stories"
            :key="story.title"
            :ref="(el) => setItemRef(el as HTMLElement, index)"
            :data-index="index"
            class="timeline-item relative"
            :class="{ 'is-visible': visibleItems.has(index) }"
            :style="{ transitionDelay: `${index * 200}ms` }"
          >
            <!-- Grid layout for alternating sides -->
            <div
              class="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center"
              :class="index % 2 === 0 ? '' : 'direction-rtl'"
            >
              <!-- Content card -->
              <div
                class="relative bg-white border border-wedding-beige p-6 md:p-8 card-content"
                :class="[
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left md:order-3',
                  { 'is-visible': visibleItems.has(index) }
                ]"
                :style="{ transitionDelay: `${index * 200 + 100}ms` }"
              >
                <!-- Arrow pointer -->
                <div
                  class="card-arrow hidden md:block"
                  :class="index % 2 === 0 ? 'arrow-right' : 'arrow-left'"
                />

                <h3 class="font-display text-2xl md:text-3xl font-medium text-wedding-dark mb-1">
                  {{ story.title }}
                </h3>
                <p class="text-xs tracking-widest uppercase text-wedding-gold mb-4">
                  {{ story.date }}
                </p>
                <p class="text-wedding-warm leading-relaxed">
                  {{ story.description }}
                </p>
              </div>

              <!-- Center image with unique shape -->
              <div
                class="hidden md:flex order-2 justify-center items-center z-10 image-shape"
                :class="{ 'is-visible': visibleItems.has(index) }"
                :style="{ transitionDelay: `${index * 200}ms` }"
              >
                <div
                  class="w-48 h-48 lg:w-64 lg:h-64 shadow-lg overflow-hidden"
                  :class="{
                    'clip-hexagon': story.shape === 'hexagon',
                    'clip-diamond': story.shape === 'diamond',
                    'clip-rounded-square': story.shape === 'rounded-square',
                    'clip-circle': story.shape === 'circle'
                  }"
                >
                  <NuxtImg
                    :src="story.picture"
                    :alt="story.title"
                    loading="lazy"
                    format="webp"
                    quality="80"
                    sizes="sm:100vw md:256px"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              <!-- Empty space for alternating layout -->
              <div
                class="hidden md:block"
                :class="index % 2 === 0 ? 'order-3' : 'order-1'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Timeline item animations */
.timeline-item {
  opacity: 0;
  transition: opacity 0.6s ease-out;
}

.timeline-item.is-visible {
  opacity: 1;
}

/* Card animations */
.card-content {
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.direction-rtl .card-content {
  transform: translateX(50px);
}

.card-content.is-visible {
  opacity: 1;
  transform: translateX(0);
}

/* Image shape animations */
.image-shape {
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.image-shape.is-visible {
  opacity: 1;
  transform: scale(1);
}

/* Unique clip-path shapes */
.clip-hexagon {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.clip-diamond {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.clip-rounded-square {
  clip-path: polygon(
    10% 0%, 90% 0%, 100% 10%, 100% 90%,
    90% 100%, 10% 100%, 0% 90%, 0% 10%
  );
}

.clip-circle {
  clip-path: circle(50%);
}

/* Card arrow pointers - speech bubble style */
.card-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
}

/* Border triangle (behind) */
.card-arrow::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 14px solid transparent;
}

/* White fill triangle (front) */
.card-arrow::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 13px solid transparent;
}

.arrow-right {
  right: -14px;
}

.arrow-right::before {
  top: -14px;
  right: 0;
  border-left-color: #d9c9a8;
  border-right: none;
}

.arrow-right::after {
  top: -13px;
  right: 1px;
  border-left-color: white;
  border-right: none;
}

.arrow-left {
  left: -14px;
}

.arrow-left::before {
  top: -14px;
  left: 0;
  border-right-color: #d9c9a8;
  border-left: none;
}

.arrow-left::after {
  top: -13px;
  left: 1px;
  border-right-color: white;
  border-left: none;
}

/* Mobile: stack vertically */
@media (max-width: 767px) {
  .card-content {
    transform: translateY(30px);
  }

  .card-content.is-visible {
    transform: translateY(0);
  }
}
</style>
