<script lang="ts" setup>
// import type { MapPoint } from "~/types";

const { name, description } = defineProps<{
  name: string;
  description: string;
  location: any;
  // mapPoint: MapPoint;

}>();

const mapStore = useMapStore();
</script>

<template>
  <NuxtLink
    :to="{ name: 'location-slug', params: { slug: location.slug } }"
    class="card card-compact bg-base-300 h-40 border-2 w-72 mb-2 shrink-0 hover:cursor-pointer"
    :class="{
      'border-accent': location.id === mapStore.selectedPoint?.id,
      'border-transparent': location.id !== mapStore.selectedPoint?.id,
    }"
    @mouseenter="mapStore.selectedPoint = location"
    @mouseleave="mapStore.selectedPoint = null"
  >
    <div class="card-body">
      <slot name="top" />
      <h3 class="text-xl">
        {{ name }}
      </h3>
      <p>{{ description }}</p>
    </div>
  </NuxtLink>
</template>
