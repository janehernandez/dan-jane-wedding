<script lang="ts" setup>
import VenueMap from "../VenueMap.vue";

// Venue coordinates - Villar Sipag Complex, Las Piñas
const venueLocation = {
  lat: 14.473474961520509,
  lng: 120.9801095722837,
  zoom: 16,
};
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
      <p class="text-wedding-dark font-semibold">V-Events Place</p>
      <p class="text-wedding-muted text-sm">Resepsyon</p>
    </div>
    <VenueMap
      :lat="venueLocation.lat"
      :lng="venueLocation.lng"
      :zoom="venueLocation.zoom"
      title="Villar Sipag Complex"
      address="C5 Extension Rd., Pulang Lupa Uno
Las Piñas, Philippines"
    />
  </div>
</template>
