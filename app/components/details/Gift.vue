<script lang="ts" setup>
const bankoQr = '/images/banko-qr.png'
const gcashQr = '/images/gcash-qr.png'
</script>

<template>
  <!-- Gift -->
  <div class="mt-16 max-w-5xl mx-auto text-center">
    <h3 class="font-display text-3xl text-center text-wedding-dark mb-8">
      Mga Regalo
    </h3>
    <p class="text-wedding-muted text-sm mb-2">
      Pero paano naman ang regalo, tanong ninyo siguro?
      Ang gusto lang namin ay makasama kayo na aming pamilya at mga kaibigan na mahal namin totoo.
    </p>
    <p class="text-wedding-muted text-sm mb-6">
      Ngunit kung nais ninyong may dalang handog,
      ang aming alkansya ay naghihintay na mapunong lubos.
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
