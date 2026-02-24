<script lang="ts" setup>
defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  details: { type: Array as () => string[], required: true },
  qr: { type: String, default: '' },
});
</script>

<template>
  <div class="bg-wedding-ivory rounded-lg p-6">
    <Icon :name="icon" class="text-3xl text-wedding-gold mb-3" />
    <h4 class="font-semibold text-wedding-dark mb-2">{{ title }}</h4>
    <p v-for="detail in details" :key="detail" class="text-sm text-wedding-muted">
      {{ detail }}
    </p>
    <img v-if="qr" :src="qr" :alt="`${title} QR Code`" class="w-40 h-40 mx-auto mt-4 rounded" >
  </div>
</template>
