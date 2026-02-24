<script lang="ts" setup>
import EventCard from '../EventCard.vue';

const eventBg1 = import.meta.glob("~/assets/images/program/church.jpg", {
  eager: true,
  import: "default",
});
const eventBg2 = import.meta.glob("~/assets/images/program/reception0.jpg", {
  eager: true,
  import: "default",
});
const eventBg3 = import.meta.glob("~/assets/images/program/reception.jpg", {
  eager: true,
  import: "default",
});

const events = [
  {
    icon: "mdi:church",
    title: "Ang Seremonya",
    time: "3:00 PM",
    note: "Samahan nyo kaming ipagdiwang ang aming pag-iisang dibdib",
    bg: Object.values(eventBg1)[0] as string,
  },
  {
    icon: "mdi:glass-cocktail",
    title: "Panimulang Salu-salo",
    time: "05:15 PM",
    note: "Makihalubilo at magsaya habang kumakain at kumukuha ng litrato",
    bg: Object.values(eventBg2)[0] as string,
  },
  {
    icon: "mdi:silverware-fork-knife",
    title: "Ang Pagdiriwang",
    time: "6:00 PM",
    bg: Object.values(eventBg3)[0] as string,
  },
];
</script>

<template>
  <!-- Program -->
  <h3 class="font-display text-3xl text-center text-wedding-dark mb-8">
    Program
  </h3>
  <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    <EventCard v-for="event in events" :key="event.title" v-bind="event" />
  </div>
</template>
