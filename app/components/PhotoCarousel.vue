<script setup lang="ts">
import type { SwiperContainer } from 'swiper/element';

interface SlideItem {
  src: string;
  orientation: 'portrait' | 'landscape';
}

const { data: srcs } = await useFetch<string[]>('/api/carousel-images')
const slides = ref<SlideItem[]>([]);
const containerRef = ref<SwiperContainer | null>(null);

onMounted(async () => {
  if (!srcs.value) return;
  const results = await Promise.all(
    srcs.value.map(
      (src) =>
        new Promise<SlideItem>((resolve) => {
          const img = new Image();
          img.onload = () => {
            resolve({
              src,
              orientation: img.naturalWidth >= img.naturalHeight ? 'landscape' : 'portrait',
            });
          };
          img.onerror = () => resolve({ src, orientation: 'landscape' });
          img.src = src;
        })
    )
  );
  slides.value = results;

  // Wait for Vue to render the slides into the DOM before initializing Swiper
  await nextTick();

  if (containerRef.value) {
    Object.assign(containerRef.value, {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 1.5,
        slideShadows: false,
      },
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      loop: true,
      speed: 800,
      spaceBetween: 20,
      keyboard: { enabled: true },
    });
    containerRef.value.initialize();
  }
});
</script>

<template>
  <section class="photo-carousel-section py-20 bg-wedding-dark overflow-hidden">
    <div class="text-center mb-12">
      <span class="font-display text-lg italic text-wedding-gold">Captured Moments</span>
      <h2 class="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide mt-2 text-wedding-ivory">
        Our Gallery
      </h2>
      <div class="text-2xl text-wedding-gold mt-4">&hearts;</div>
    </div>

    <ClientOnly>
      <swiper-container
        ref="containerRef"
        class="photo-swiper"
        :init="false"
      >
        <swiper-slide
          v-for="(slide, idx) in slides"
          :key="idx"
          :class="['photo-slide', `photo-slide--${slide.orientation}`]"
        >
          <div class="polaroid">
            <div class="polaroid__photo">
              <NuxtImg
                :src="slide.src"
                :alt="`Wedding photo ${idx + 1}`"
                loading="lazy"
                format="webp"
                quality="80"
                sizes="sm:100vw md:50vw lg:640px"
                class="polaroid__image"
              />
              <div class="polaroid__overlay" />
            </div>
            <div class="polaroid__caption">
              <span class="polaroid__label">D &amp; J</span>
            </div>
          </div>
        </swiper-slide>
      </swiper-container>

      <template #fallback>
        <div class="flex justify-center items-center h-80">
          <div class="text-wedding-gold font-display text-xl italic">Loading gallery...</div>
        </div>
      </template>
    </ClientOnly>
  </section>
</template>

<style lang="scss">
.photo-swiper {
  width: 95%;
  margin: 0 auto;
  padding: 20px 0 40px;

  @media (min-width: 768px) {
    width: 90%;
  }

  @media (min-width: 1024px) {
    width: 80%;
  }
}

.photo-slide {
  height: 65vw;
  transition: all 0.5s ease;

  &--portrait {
    width: 52vw;
  }

  &--landscape {
    width: 72vw;
  }

  &:hover .polaroid__image {
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    height: 45vw;

    &--portrait {
      width: 32vw;
    }

    &--landscape {
      width: 48vw;
    }
  }

  @media (min-width: 1024px) {
    height: 520px;

    &--portrait {
      width: 380px;
    }

    &--landscape {
      width: 560px;
    }
  }

  @media (min-width: 1280px) {
    height: 600px;

    &--portrait {
      width: 400px;
    }

    &--landscape {
      width: 640px;
    }
  }
}

.polaroid {
  $padding: 12px;
  $bottom: 48px;

  width: 100%;
  height: 100%;
  background: #faf9f6;
  padding: $padding $padding $bottom;
  border-radius: 4px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.15),
    0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  transition: filter 0.5s ease, opacity 0.5s ease, transform 0.4s ease;
  filter: blur(3px);
  opacity: 0.6;

  .swiper-slide-active & {
    filter: blur(0);
    opacity: 1;
  }

  &__photo {
    position: relative;
    flex: 1;
    overflow: hidden;
    min-height: 0;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(61, 48, 40, 0.15) 100%);
    pointer-events: none;
  }

  &__caption {
    height: $bottom - $padding;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__label {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 0.85rem;
    color: #9d7b5b;
    letter-spacing: 0.15em;
  }
}

.nav-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(196, 154, 90, 0.4);
  background: transparent;
  color: #c49a5a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(196, 154, 90, 0.15);
    border-color: #c49a5a;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
