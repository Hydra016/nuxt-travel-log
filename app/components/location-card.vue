<script lang="ts" setup>
// import type { MapPoint } from "~/lib/types";

// defineProps<{
//   mapPoint: MapPoint;
// }>();

// const mapStore = useMapStore();

const { name, description } = defineProps<{
  name: string;
  description: string;
}>();
</script>

<template>
  <NuxtLink
    class="card card-compact bg-base-300 h-40 border-2 w-72 mb-2 shrink-0 hover:cursor-pointer"
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
