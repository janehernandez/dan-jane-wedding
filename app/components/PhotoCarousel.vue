<script setup lang="ts">
import type { SwiperContainer } from 'swiper/element';

const imagePaths = [
  '/images/carousels/20250325_235938_622.jpg',
  '/images/carousels/20250326_000314_924.jpg',
  '/images/carousels/20250326_000347_053.jpg',
  '/images/carousels/20250326_000518_811.jpg',
  '/images/carousels/20250326_000533_158.jpg',
  '/images/carousels/20250326_010157_685.jpg',
  '/images/carousels/20250326_010213_398.jpg',
  '/images/carousels/IMG-64454e04571c4d15d0b95f7d4a258dd4-V.jpg',
  '/images/carousels/IMG_0055.jpeg',
  '/images/carousels/IMG_0058.jpeg',
  '/images/carousels/IMG_0070.jpeg',
  '/images/carousels/IMG_0248.jpeg',
  '/images/carousels/IMG_0259.jpeg',
  '/images/carousels/IMG_0337.jpeg',
  '/images/carousels/IMG_0367.jpeg',
  '/images/carousels/IMG_0371.jpeg',
  '/images/carousels/IMG_0440.jpeg',
  '/images/carousels/IMG_0544.jpeg',
  '/images/carousels/IMG_0612.jpeg',
  '/images/carousels/IMG_0638.jpeg',
  '/images/carousels/IMG_20191122_224844.jpg',
  '/images/carousels/IMG_20191208_123036.jpg',
  '/images/carousels/IMG_20200208_210057.jpg',
  '/images/carousels/IMG_20200307_133512.jpg',
  '/images/carousels/IMG_20210207_114124.jpg',
  '/images/carousels/IMG_20210207_120426.jpg',
  '/images/carousels/IMG_20210221_135136.jpg',
  '/images/carousels/IMG_20210304_193239.jpg',
  '/images/carousels/IMG_20220220_113226.jpg',
  '/images/carousels/IMG_20220220_122824.jpg',
  '/images/carousels/IMG_20220220_130727.jpg',
  '/images/carousels/IMG_20220410_093017.jpg',
  '/images/carousels/IMG_20220410_154707.jpg',
  '/images/carousels/IMG_20220424_182825.jpg',
  '/images/carousels/IMG_20220522_131442.jpg',
  '/images/carousels/IMG_20220624_125816.jpg',
  '/images/carousels/IMG_20220703_161221.jpg',
  '/images/carousels/IMG_20220918_170702.jpg',
  '/images/carousels/IMG_20220918_171544.jpg',
  '/images/carousels/IMG_20221023_102526.jpg',
  '/images/carousels/IMG_20221030_140317.jpg',
  '/images/carousels/IMG_20221208_132234.jpg',
  '/images/carousels/IMG_20221208_132401.jpg',
  '/images/carousels/IMG_20221208_132839.jpg',
  '/images/carousels/IMG_20221225_105705.jpg',
  '/images/carousels/IMG_20221225_134629.jpg',
  '/images/carousels/IMG_20230101_003957.jpg',
  '/images/carousels/IMG_20230107_141101.jpg',
  '/images/carousels/IMG_20230122_183748.jpg',
  '/images/carousels/IMG_20230122_202600.jpg',
  '/images/carousels/IMG_20230122_202657.jpg',
  '/images/carousels/IMG_20230204_205304.jpg',
  '/images/carousels/IMG_20230204_205855.jpg',
  '/images/carousels/IMG_20230312_131746.jpg',
  '/images/carousels/IMG_20230326_172404.jpg',
  '/images/carousels/IMG_20230326_175536.jpg',
  '/images/carousels/IMG_20230619_180402_1.jpg',
  '/images/carousels/IMG_20230701_171547.jpg',
  '/images/carousels/IMG_20230708_173514.jpg',
  '/images/carousels/IMG_20240306_145126.jpg',
  '/images/carousels/IMG_20240306_145132.jpg',
  '/images/carousels/IMG_20240306_145139.jpg',
  '/images/carousels/IMG_20240306_172904.jpg',
  '/images/carousels/IMG_20240307_115510.jpg',
  '/images/carousels/IMG_20240307_115512.jpg',
  '/images/carousels/IMG_20240307_115749.jpg',
  '/images/carousels/IMG_20240308_040204.jpg',
  '/images/carousels/IMG_20240311_055951.jpg',
  '/images/carousels/IMG_20240311_060113.jpg',
  '/images/carousels/IMG_20240311_060140.jpg',
  '/images/carousels/IMG_20240311_061710.jpg',
  '/images/carousels/IMG_20250322_114824.jpg',
  '/images/carousels/IMG_20250322_114838.jpg',
  '/images/carousels/IMG_20250322_114934.jpg',
  '/images/carousels/IMG_20250322_114945.jpg',
  '/images/carousels/IMG_20250322_114946.jpg',
  '/images/carousels/IMG_20250322_115120.jpg',
  '/images/carousels/IMG_20250322_115130.jpg',
  '/images/carousels/IMG_20250322_115331.jpg',
  '/images/carousels/IMG_20250322_115348.jpg',
  '/images/carousels/IMG_20250322_133632.jpg',
  '/images/carousels/IMG_20250322_133645.jpg',
  '/images/carousels/IMG_20250322_133651.jpg',
  '/images/carousels/IMG_20250323_104318.jpg',
  '/images/carousels/IMG_20250323_104549.jpg',
  '/images/carousels/_storage_emulated_0_MIUI_Gallery_cloud_owner_dan x Jane_IMG_20240306_202216.jpg',
]

interface SlideItem {
  src: string;
  orientation: 'portrait' | 'landscape';
}

const slides = ref<SlideItem[]>(
  imagePaths.map((src) => ({ src, orientation: 'landscape' }))
);
const containerRef = ref<SwiperContainer | null>(null);

function onImageLoad(event: Event, index: number) {
  const img = event.target as HTMLImageElement;
  if (img.naturalWidth < img.naturalHeight) {
    slides.value[index].orientation = 'portrait';
  }
}

onMounted(async () => {
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
      },
      loop: true,
      speed: 800,
      spaceBetween: 20,
      keyboard: { enabled: true },
    });
    containerRef.value.initialize();

    const swiper = containerRef.value.swiper;
    const onVisible = () => {
      if (!document.hidden) swiper?.autoplay?.start();
    };
    document.addEventListener('visibilitychange', onVisible);
    onBeforeUnmount(() => document.removeEventListener('visibilitychange', onVisible));
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
              <img
                :src="slide.src"
                :alt="`Wedding photo ${idx + 1}`"
                loading="lazy"
                class="polaroid__image"
                @load="onImageLoad($event, idx)"
              >
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
  transition: opacity 0.5s ease, transform 0.4s ease;
  opacity: 0.6;

  .swiper-slide-active & {
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
