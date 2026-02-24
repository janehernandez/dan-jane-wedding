<script lang="ts" setup>
import DressCode from "./details/DressCode.vue";
import Entourage from "./details/Entourage.vue";
import Gift from "./details/Gift.vue";
import Program from "./details/Program.vue";
import Venue from "./details/Venue.vue";
</script>

<template>
  <section id="details" class="py-28 bg-white">
    <div class="max-w-7xl mx-auto px-5">
      <SectionHeader
        subtitle="Samahan ninyo kami"
        title="Mga Detalye ng aming Kasal"
      />
      <Entourage />
      <Program />
      <Venue />
      <DressCode />
      <Gift />
    </div>
  </section>
</template>
