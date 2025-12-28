<script setup lang="ts">
import type { Map as MapLibreMap } from "maplibre-gl";

import { MglMap, MglMarker, MglNavigationControl } from "@indoorequal/vue-maplibre-gl";
import { computed, onMounted, ref } from "vue";

const colorMode = useColorMode();

const style = computed(() =>
  colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty",
);

const center = ref<[number, number]>([0, 0]);
const userLocation = ref<[number, number] | null>(null);

const zoom = ref(8);

const mapRef = ref<MapLibreMap | null>(null);
function onMapLoad(e: any) {
  mapRef.value = e?.map ?? e;
}

onMounted(() => {
  if (!import.meta.client)
    return;
  if (!navigator.geolocation)
    return;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lngLat: [number, number] = [
        position.coords.longitude,
        position.coords.latitude,
      ];

      center.value = lngLat;
      zoom.value = 12;
      mapRef.value?.flyTo({
        center: lngLat,
        zoom: 12,
        essential: true,
      });

      userLocation.value = [
        position.coords.longitude,
        position.coords.latitude,
      ];
    },
    (error) => {
      console.warn("Geolocation denied or unavailable:", error);
    },
    { enableHighAccuracy: true, timeout: 10000 },
  );
});
</script>

<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
    height="650px"
    @map:load="onMapLoad"
  >
    <MglNavigationControl />
    <MglMarker
      v-if="userLocation"
      :coordinates="userLocation"
      anchor="bottom"
    />
  </MglMap>
</template>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
