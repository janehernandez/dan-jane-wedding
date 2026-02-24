<script setup lang="ts">
const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });
const weddingDate = new Date("2026-05-16T15:00:00");
const labels: Record<string, string> = {
  days: "Araw",
  hours: "Oras",
  minutes: "Minuto",
  seconds: "Segundo",
};

const updateCountdown = () => {
  const diff = weddingDate.getTime() - new Date().getTime();
  if (diff > 0) {
    countdown.value = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  }
};

onMounted(() => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
</script>

<template>
  <div class="flex justify-center gap-6 md:gap-10 mb-12">
    <div v-for="(item, key) in countdown" :key="key" class="text-center">
      <span
        class="block font-martires-bold text-4xl md:text-5xl text-wedding-ivory font-light"
      >
        {{ item }}
      </span>
      <span
        class="font-martires-regular text-md tracking-widest uppercase text-wedding-beige font-light"
      >
        {{ labels[key] }}
      </span>
    </div>
  </div>
</template>
