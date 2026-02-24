<script lang="ts" setup>
defineProps({
  name: { type: String, default: "" },
  role: { type: String, default: "" },
  initial: { type: String, default: "" },
  bio: { type: String, default: "" },
  image: { type: String, default: "" },
});
</script>

<template>
  <div class="text-center max-w-sm">
    <div
      class="w-48 h-48 rounded-full mx-auto mb-8 border-4 border-wedding-ivory shadow-xl overflow-hidden"
      :class="image ? '' : 'bg-gradient-to-br from-wedding-brown to-wedding-gold flex items-center justify-center'"
    >
      <img
        v-if="image"
        :src="image"
        :alt="name"
        class="w-full h-full object-cover"
      >
      <span v-else class="font-display text-6xl text-wedding-ivory">{{
        initial
      }}</span>
    </div>
    <h3 class="font-display text-3xl font-medium text-wedding-dark">
      {{ name }}
    </h3>
    <p class="text-xs tracking-widest uppercase text-wedding-gold mb-4">
      {{ role }}
    </p>
    <p class="text-wedding-warm leading-relaxed">{{ bio }}</p>
  </div>
</template>
