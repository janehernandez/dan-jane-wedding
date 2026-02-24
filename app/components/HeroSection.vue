<template>
  <section
    id="home"
    class="min-h-screen flex flex-col relative overflow-hidden"
  >
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url(&quot;/hero-bg.jpg&quot;)"
    />

    <!-- Gradient overlays - darker at top and bottom, lighter in center -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-wedding-dark/80 via-transparent to-wedding-dark/80"
    />
    <div class="absolute inset-0 bg-wedding-warm/30" />

    <!-- Pattern Overlay -->
    <div
      class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23C49A5A%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"
    />

    <!-- Top Content -->
    <div class="relative z-10 text-center px-5 pt-24 pb-8">
      <p
        class="font-body text-sm tracking-[0.25em] uppercase text-wedding-beige mb-4 font-light"
      >
        Ang Aming Pag-iisang Dibdib
      </p>

      <h1
        class="font-display text-5xl md:text-7xl lg:text-8xl font-normal text-wedding-ivory tracking-wider mb-4"
      >
        Dan Jomel<br class="md:hidden" >
        &<br class="md:hidden" >
        Jane
      </h1>

      <div class="flex items-center justify-center gap-5 mb-4">
        <span class="font-display text-2xl text-wedding-gold italic">
          #JANEuineNaPagibigNiDAN
        </span>
      </div>

      <div class="flex items-center justify-center gap-5">
        <span class="w-16 h-px bg-wedding-gold" />
        <span class="font-display text-xl md:text-2xl text-wedding-gold">
          Ika-16 ng Mayo, 2026 (Sabado)
        </span>
        <span class="w-16 h-px bg-wedding-gold" />
      </div>

      <p
        class="mt-5 text-sm tracking-[0.2em] text-wedding-beige mb-6 font-light"
      >
        Santuario de San Ezekiel Moreno
      </p>
    </div>

    <!-- Spacer for center (where faces will show) -->
    <div class="flex-1" />

    <!-- Bottom Content -->
    <div class="relative z-10 text-center px-5 pb-12 pt-8">
      <!-- Countdown -->
      <CountdownTimer />

      <a
        href="#rsvp"
        class="font-martires-bold inline-block px-12 py-5 border border-wedding-gold text-wedding-gold text-md tracking-[0.2em] uppercase font-medium hover:bg-wedding-gold hover:text-wedding-dark transition-all duration-300"
      >
        RSVP
      </a>
    </div>
  </section>
</template>
