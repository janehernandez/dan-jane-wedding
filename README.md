# Dan & Jane Wedding

A wedding invitation and RSVP website built with Nuxt 4.

**Live site:** [dan-jane-wedding.com](https://dan-jane-wedding.com)

## Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/) (Vue 3)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) via [@nuxt/ui](https://ui.nuxt.com/)
- **Carousel:** [Swiper](https://swiperjs.com/) via [nuxt-swiper](https://github.com/cpreston321/nuxt-swiper)
- **Maps:** [Leaflet](https://leafletjs.com/) via [@nuxtjs/leaflet](https://github.com/nuxt-modules/leaflet)
- **Images:** [@nuxt/image](https://image.nuxt.com/) with IPX

## Features

- **Hero** - Animated countdown timer to the wedding date
- **Couple** - About the bride and groom
- **Gallery** - Coverflow photo carousel with lazy-loaded images
- **Story** - Timeline of the couple's journey
- **Details** - Event schedule with interactive venue map
- **RSVP** - Form with client-side validation and duplicate detection, submitted to Google Sheets
- **FAQ** - Common guest questions
- Fully responsive (mobile, tablet, desktop)

## Project Structure

```
app/
  assets/images/carousels/   # Gallery photos (loaded via import.meta.glob)
  components/                # Vue components (auto-imported)
    HeroSection.vue
    CoupleSection.vue
    PhotoCarousel.vue
    StorySection.vue
    DetailsSection.vue
    RsvpSection.vue
    FaqSection.vue
    ...
  composables/               # Composables (auto-imported)
    useRsvp.ts               # RSVP form submission logic
  pages/
    index.vue                # Single-page layout
public/images/               # Static images (hero, rsvp, etc.)
```

## Setup

### Prerequisites

- Node.js 18+
- npm (or pnpm / yarn / bun)

### Install dependencies

```bash
npm install
```

### Environment variables

Copy the example env file and fill in your Google Apps Script URL:

```bash
cp .env.example .env
```


### Development

Start the dev server on `http://localhost:3000`:

```bash
npm run dev
```

### Production

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Static generation

Generate a fully static site:

```bash
npm run generate
```

## Nuxt Modules

| Module | Purpose |
|--------|---------|
| `@nuxt/ui` | UI components and Tailwind CSS integration |
| `@nuxt/image` | Image optimization with IPX (auto EXIF orientation) |
| `@nuxt/eslint` | ESLint integration |
| `@nuxt/hints` | Performance hints |
| `@nuxt/scripts` | Third-party script management |
| `@nuxtjs/leaflet` | Leaflet maps |
| `nuxt-swiper` | Swiper carousel |

## Deployment

See the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for platform-specific guides.
