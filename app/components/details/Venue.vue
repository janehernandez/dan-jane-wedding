<script lang="ts" setup>
import VenueMap from "../VenueMap.vue";

const markers = [
  {
    lat: 14.473474961520509,
    lng: 120.9801095722837,
    title: "Santuario de San Ezekiel",
    address: "Seremonya",
    color: "gold" as const,
  },
  {
    lat: 14.4737092,
    lng: 120.9813656,
    title: "Villar Sipag Events Place",
    address: "Resepsyon",
    color: "red" as const,
  },
];

// Center map between both markers
const centerLat = (markers[0]!.lat + markers[1]!.lat) / 2;
const centerLng = (markers[0]!.lng + markers[1]!.lng) / 2;
</script>

<template>
  <!-- Venue -->
  <div class="mt-16 max-w-5xl mx-auto">
    <h3 class="font-display text-3xl text-center text-wedding-dark mb-8">
      Venue
    </h3>
    <div class="text-center mb-6">
      <p class="text-wedding-dark font-semibold">Santuario de San Ezekiel</p>
      <p class="text-wedding-muted text-sm mb-2">Seremonya</p>
      <p class="text-wedding-dark font-semibold">Villar Sipag Events Place</p>
      <p class="text-wedding-muted text-sm">Resepsyon</p>
    </div>
    <VenueMap
      :lat="centerLat"
      :lng="centerLng"
      :zoom="16"
      :markers="markers"
    />
  </div>
</template>
