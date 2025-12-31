<script setup lang="ts">
import type { MglEvent } from "@indoorequal/vue-maplibre-gl";
import type { LngLat, Map as MapLibreMap } from "maplibre-gl";

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

function updateAddedPoint(location: LngLat) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.lat = location.lat;
    mapStore.addedPoint.long = location.lng;
  }
}

function onDoubleClick(mglEvent: MglEvent<"dblclick">) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.lat = mglEvent.event.lngLat.lat;
    mapStore.addedPoint.long = mglEvent.event.lngLat.lng;
  }
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
    :height="100"
    @map:dblclick="onDoubleClick"
    @map:load="onMapLoad"
  >
    <MglNavigationControl />

    <MglMarker
      v-if="mapStore.addedPoint"
      :coordinates="[mapStore.addedPoint.long, mapStore.addedPoint.lat]"
      draggable
      @update:coordinates="updateAddedPoint"
    >
      <template #marker>
        <div
          class="tooltip hover:cursor-pointer tooltip-open"
          data-tip="Drag to your desired location"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="35"
            class="text-warning"
          />
        </div>
      </template>
    </MglMarker>

    <MglMarker
      v-if="userLocation"
      :coordinates="userLocation"
      anchor="bottom"
    >
      <template #marker>
        <div
          class="tooltip hover:cursor-pointer"
          data-tip="Your current location"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="35"
            class="text-primary"
          />
        </div>
      </template>
    </MglMarker>

    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <div
          class="tooltip"
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
