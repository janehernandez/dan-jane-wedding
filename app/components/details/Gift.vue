<script lang="ts" setup>
import bankoQr from "~/assets/images/banko-qr.png";
import gcashQr from "~/assets/images/gcash-qr.png";
</script>

<template>
  <!-- Gift -->
  <div class="mt-16 max-w-5xl mx-auto text-center">
    <h3 class="font-display text-3xl text-center text-wedding-dark mb-8">
      Mga Regalo
    </h3>
    <p class="text-wedding-muted text-sm mb-2">
      Ang pinakamagandang regalo na maibibigay ninyo sa amin ay ang inyong
      presensya sa aming espesyal na araw.
    </p>
    <p class="text-wedding-muted text-sm mb-6">
      Subalit kung nais ninyong magbigay ng pagpapala sa aming bagong simula,
      bukas po ang aming puso sa inyong kabutihang-loob.
    </p>
    <div class="grid md:grid-cols-2 gap-6">
      <PaymentCard
        icon="mdi:bank"
        title="Bank Transfer (BPI Banko TODO Savings)"
        :details="['Account Name: Jane Hernandez', 'Account Number: 1800 2857 8561']"
        :qr="bankoQr"
      />

      <PaymentCard
        icon="mdi:cellphone"
        title="GCash"
        :details="['Name: Jane Hernandez', 'Number: 0906 735 3088']"
        :qr="gcashQr"
      />
    </div>
  </div>
</template>
