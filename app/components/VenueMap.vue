<script lang="ts" setup>
interface Props {
  lat: number
  lng: number
  zoom?: number
  title?: string
  address?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  zoom: 16,
  title: '',
  address: '',
  height: '400px'
})

const directionsUrl = computed(() =>
  `https://www.google.com/maps/dir/?api=1&destination=${props.lat},${props.lng}`
)
</script>

<template>
  <div class="venue-map relative z-0">
    <div class="border border-wedding-beige overflow-hidden">
      <LMap
        :zoom="zoom"
        :center="[lat, lng]"
        :use-global-leaflet="false"
        :style="{ height }"
        class="w-full"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
        />
        <LMarker :lat-lng="[lat, lng]">
          <LPopup v-if="title || address">
            <div class="text-center p-1">
              <p v-if="title" class="font-semibold">{{ title }}</p>
              <p v-if="address" class="text-sm whitespace-pre-line">{{ address }}</p>
            </div>
          </LPopup>
        </LMarker>
      </LMap>
    </div>
    <div class="text-center mt-4">
      <a
        :href="directionsUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-wedding-gold hover:text-wedding-brown transition-colors"
      >
        <Icon name="mdi:directions" class="text-xl" />
        <span class="text-sm tracking-wider uppercase">Kumuha ng Direksyon</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.venue-map :deep(.leaflet-pane),
.venue-map :deep(.leaflet-control) {
  z-index: 1 !important;
}
</style>
