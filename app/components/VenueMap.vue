<script lang="ts" setup>
interface Marker {
  lat: number
  lng: number
  title?: string
  address?: string
  color?: 'gold' | 'red' | 'blue' | 'green' | 'violet' | 'orange' | 'yellow' | 'black' | 'grey'
}

interface Props {
  lat: number
  lng: number
  zoom?: number
  title?: string
  address?: string
  height?: string
  markers?: Marker[]
}

const props = withDefaults(defineProps<Props>(), {
  zoom: 16,
  title: '',
  address: '',
  height: '400px',
  markers: () => []
})

const allMarkers = computed<Marker[]>(() => {
  if (props.markers.length > 0) return props.markers
  return [{ lat: props.lat, lng: props.lng, title: props.title, address: props.address }]
})

const markerIconUrl = (color: string) =>
  `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`

const directionsUrl = computed(() =>
  'https://www.google.com/maps/dir/14.3173221,120.9293426/Santuario+de+San+Ezekiel+Moreno,+FXFJ%2BH82,+C-5,+Las+Pi%C3%B1as,+Metro+Manila/Villar+Sipag+Events+Place,+FXFJ%2BFGW,+C-5,+Las+Pi%C3%B1as,+Metro+Manila/@14.4723749,120.9810632,18.36z/data=!4m16!4m15!1m1!4e1!1m5!1m1!1s0x3397cddbb3a5c011:0xd5104cbd3b83705!2m2!1d120.9800935!2d14.473418!1m5!1m1!1s0x3397cf15c46ee18d:0x4a51be1e0fbdf987!2m2!1d120.9813656!2d14.4737092!3e9?entry=ttu&g_ep=EgoyMDI2MDIyMy4wIKXMDSoASAFQAw%3D%3D'
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
        <LMarker v-for="(marker, i) in allMarkers" :key="i" :lat-lng="[marker.lat, marker.lng]">
          <LIcon
            v-if="marker.color"
            :icon-url="markerIconUrl(marker.color)"
            :icon-size="[25, 41]"
            :icon-anchor="[12, 41]"
            :popup-anchor="[1, -34]"
            shadow-url="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
            :shadow-size="[41, 41]"
          />
          <LPopup v-if="marker.title || marker.address">
            <div class="text-center p-1">
              <p v-if="marker.title" class="font-semibold">{{ marker.title }}</p>
              <p v-if="marker.address" class="text-sm whitespace-pre-line">{{ marker.address }}</p>
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
