<script lang="ts" setup>
defineProps({
  subtitle: { type: String, default: "" },
  title: { type: String, default: "" },
  light: { type: Boolean, default: false }
})
</script>

<template>
  <div class="text-center mb-16">
    <span class="font-display text-lg italic text-wedding-gold">{{ subtitle }}</span>
    <h2
:class="[
      'font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide mt-2',
      light ? 'text-wedding-ivory' : 'text-wedding-dark'
    ]">
      {{ title }}
    </h2>
    <div class="text-2xl text-wedding-gold mt-4">❧</div>
    <slot />
  </div>
</template>
