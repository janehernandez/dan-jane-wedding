<script lang="ts" setup>
const principalSponsors = {
  title: "Mga Ninong at Ninang",
  subtitle: "Principal Sponsors",
  names: [
    "G. Danilo Enriquez at Gng. Elisa Enriquez",
    "G. Kem Bugarin at Gng. Angeline Bugarin",
    "G. Churchil Siao at Gng. Pearl Siao",
    "Engr. Wunibald Viaña at Gng. Adela Viaña",
    "Archt. Eduardo Ignacio at Gng. Susan Ignacio",
    "Dr. Dexter Lorenzo at Gng. Flor Lorenzo",
    "Archt. Paul Bautista at Dr. Eileen Lorenzo-Bautista",
    "G. Mariolito Vega at Gng. Gondelyna Vega",
    "G. Davimark Ignacio at Gng. Helen Veronica Ignacio-Santos",
    "G. John Gutierrez at Gng. Cherry Trinidad"
  ],
};

const row2 = [
  {
    title: "Abay na Panrangal",
    subtitle: "Best Man & Maid of Honor",
    names: ["Julian Chester Somera", "Ma. Julie Mae Sarreal"],
  },
  {
    title: "Munting Nobyo at Nobya",
    subtitle: "Little Groom & Little Bride",
    names: ["Elijah Viaña", "Julienne Manasan"],
  },
];

const row3 = [
  {
    title: "Mga Abay na Lalaki",
    subtitle: "Groomsmen",
    names: [
      "Ronald Sambajon",
      "Ralf Ramos",
      "Fernidand Miguel Labatiao",
      "Miguel Alonzo",
      "Evan Mercado",
      "Kirk Ruel Sabornido",
      "Bryan Casas",
    ],
  },
  {
    title: "Mga Abay na Babae",
    subtitle: "Bridesmaids",
    names: [
      "Angelica Papa",
      "Romavil Gamlanga",
      "Louie Rose Perolina",
      "Dea Marie Livelo",
      "Joyce Anne Torres",
      "Awduenli 'Den' Viaña",
      "Charito Espiritu",
    ],
  },
];

const row4 = [
  {
    title: "Belo",
    subtitle: "Veil Sponsors",
    names: ["Ronald Sambajon", "Angelica Papa"],
  },
  {
    title: "Cord",
    subtitle: "Cord Sponsors",
    names: ["Ralf Ramos", "Romavil Gamlanga"],
  },
  {
    title: "Kandila",
    subtitle: "Candle Sponsors",
    names: ["Bryan Casas", "Charito Espiritu"],
  },
];

const row5 = [
  {
    title: "Mga Dalagang Bulaklak",
    subtitle: "Flower Girls",
    names: ["Queenie Enriquez", "Ashlee Gabito", "Cairene Gabito"],
  },
  {
    title: "Mga Munting Abay",
    subtitle: "Ring Bearer / Coin Bearer / Bible Bearer",
    names: [
      "Liam Samuel Laparan — Singsing",
      "Wynter Raphiel Viaña — Arras",
      "Alex Gabito — Bibliya",
      "Jerance Vien Suspene — Handog",
    ],
  },
];
</script>

<template>
  <h3 class="font-display text-3xl text-center text-wedding-dark mb-8">
    Entourage
  </h3>
  <div class="max-w-5xl mx-auto mb-16">
    <!-- Row 1: Principal Sponsors (full width) -->
    <div class="text-center pb-8 border-b border-wedding-beige/50">
      <h3 class="font-display text-2xl text-wedding-dark mb-1">
        {{ principalSponsors.title }}
      </h3>
      <p class="text-xs tracking-widest uppercase text-wedding-gold mb-4">
        {{ principalSponsors.subtitle }}
      </p>
      <ul class="space-y-1">
        <li
          v-for="name in principalSponsors.names"
          :key="name"
          class="text-wedding-warm text-sm"
        >
          {{ name }}
        </li>
      </ul>
    </div>

    <!-- Row 2: Abay na Panrangal | Little Bride & Groom -->
    <div class="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto py-8 border-b border-wedding-beige/50">
      <div v-for="group in row2" :key="group.title" class="text-center">
        <h3 class="font-display text-2xl text-wedding-dark mb-1">
          {{ group.title }}
        </h3>
        <p class="text-xs tracking-widest uppercase text-wedding-gold mb-4">
          {{ group.subtitle }}
        </p>
        <ul class="space-y-1">
          <li v-for="name in group.names" :key="name" class="text-wedding-warm text-sm">
            {{ name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Row 3: Groomsmen | Bridesmaids -->
    <div class="grid md:grid-cols-2 gap-8 py-8 border-b border-wedding-beige/50">
      <div v-for="group in row3" :key="group.title" class="text-center">
        <h3 class="font-display text-2xl text-wedding-dark mb-1">
          {{ group.title }}
        </h3>
        <p class="text-xs tracking-widest uppercase text-wedding-gold mb-4">
          {{ group.subtitle }}
      </p>
        <ul class="space-y-1">
          <li v-for="name in group.names" :key="name" class="text-wedding-warm text-sm">
            {{ name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Row 4: Belo | Cord | Kandila -->
    <div class="grid md:grid-cols-3 gap-8 py-8 border-b border-wedding-beige/50">
      <div v-for="group in row4" :key="group.title" class="text-center">
        <h3 class="font-display text-2xl text-wedding-dark mb-1">
          {{ group.title }}
        </h3>
        <p class="text-xs tracking-widest uppercase text-wedding-gold mb-4">
          {{ group.subtitle }}
        </p>
        <ul class="space-y-1">
          <li v-for="name in group.names" :key="name" class="text-wedding-warm text-sm">
            {{ name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Row 5: Flower Girls | Munting Abay -->
    <div class="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto pt-8">
      <div v-for="group in row5" :key="group.title" class="text-center">
        <h3 class="font-display text-2xl text-wedding-dark mb-1">
          {{ group.title }}
        </h3>
        <p class="text-xs tracking-widest uppercase text-wedding-gold mb-4">
          {{ group.subtitle }}
        </p>
        <ul class="space-y-1">
          <li v-for="name in group.names" :key="name" class="text-wedding-warm text-sm">
            {{ name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
