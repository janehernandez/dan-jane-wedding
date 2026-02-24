<script lang="ts" setup>
import EventCard from '../EventCard.vue';

const events = [
  {
    icon: "mdi:church",
    title: "Ang Seremonya",
    time: "3:00 PM",
    note: "Samahan nyo kaming ipagdiwang ang aming pag-iisang dibdib",
    bg: "/images/church.jpg",
  },
  {
    icon: "mdi:glass-cocktail",
    title: "Panimulang Salu-salo",
    time: "05:15 PM",
    note: "Makihalubilo at magsaya habang kumakain at kumukuha ng litrato",
    bg: "/images/reception0.jpg",
  },
  {
    icon: "mdi:silverware-fork-knife",
    title: "Ang Pagdiriwang",
    time: "6:00 PM",
    bg: "/images/reception.jpg",
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
