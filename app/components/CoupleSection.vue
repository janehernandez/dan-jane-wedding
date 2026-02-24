<script lang="ts" setup>
const groomImg = '/images/groom.jpg'
const brideImg = '/images/bride.jpg'
</script>

<template>
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-5">
      <div class="flex flex-col lg:flex-row justify-center items-center gap-16">
        <CoupleCard
          name="Dan Jomel"
          role="The Groom"
          initial="D"
          :image="groomImg"
          bio="Supervisor minsan, Model kit builder at gamer minsan, ngunit kahit ganuon, isang malaking swerte nang dumating sakanyang buhay si Jane"
        />

        <div
          class="text-4xl text-wedding-gold animate-pulse lg:rotate-0 rotate-90"
        >
          ♥
        </div>

        <CoupleCard
          name="Jane"
          role="The Bride"
          initial="J"
          :image="brideImg"
          bio="Software Engineer minsan, Gala madalas, pero kahit ganoon pa man, siya ay pinagpala na makilala si Dan na parehas hilig kumain at mag-travel"
        />
      </div>
    </div>
  </section>
</template>
