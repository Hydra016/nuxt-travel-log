<script setup lang="ts">
import type { Map as MapLibreMap } from "maplibre-gl";

import { MglMap, MglMarker, MglNavigationControl } from "@indoorequal/vue-maplibre-gl";
import { computed, onMounted, ref } from "vue";

const colorMode = useColorMode();
const mapStore = useMapStore();

const style = computed(() =>
  colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty",
);

const center = ref<[number, number]>([0, 0]);
const userLocation = ref<[number, number] | null>(null);

const zoom = ref(100);

const mapRef = ref<MapLibreMap | null>(null);
function onMapLoad(e: any) {
  mapRef.value = e?.map ?? e;
}

onMounted(() => {
  mapStore.init();
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

    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <div
          class="tooltip tooltip-top tooltip-open"
          :data-tip="point.name"
          @mouseenter="mapStore.selectedPoint === point"
          @mouseleave="mapStore.selectedPoint = null"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="35"
            :class="mapStore.selectedPoint === point ? 'text-accent' : 'text-secondary'"
          />
        </div>
      </template>
      <MglPopup>
        <div class="p-2">
          <h3 class="text-lg font-bold">
            {{ point.name }}
          </h3>
          <p v-if="point.description">
            {{ point.description }}
          </p>
        </div>
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
