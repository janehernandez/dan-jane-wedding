
<script lang="ts" setup>
defineProps({
  icon: { type: String, default: '' },
  title: { type: String, default: '' },
  time: { type: String, default: '' },
  location: { type: String, default: '' },
  address: { type: String, default: '' },
  note: { type: String, default: '' },
  bg: { type: String, default: '' },
});
</script>

<template>
  <div
    class="relative text-center p-12 border border-wedding-beige hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 overflow-hidden"
  >
    <NuxtImg
      v-if="bg"
      :src="bg"
      loading="lazy"
      format="webp"
      quality="80"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div v-if="bg" class="absolute inset-0 bg-white/85" />
    <div class="relative">
    <h3 class="font-display text-2xl font-medium text-wedding-dark mb-4">
      {{ title }}
    </h3>
    <p class="text-xl text-wedding-gold font-display italic mb-5">{{ time }}</p>
    <p class="font-medium text-wedding-dark mb-2">{{ location }}</p>
    <p class="text-wedding-warm text-sm whitespace-pre-line mb-5">
      {{ address }}
    </p>
    <p class="text-xs tracking-widest uppercase text-wedding-gold">
      {{ note }}
    </p>
    </div>
  </div>
</template>
