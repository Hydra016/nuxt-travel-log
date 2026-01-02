<script setup lang="ts">
import { msToReadableDate } from "~/utils/date-utils";

definePageMeta({
  layout: "dashboard",
});
const route = useRoute();
const { slug } = route.params;
const mapStore = useMapStore();

const { data: location, status, error } = await useFetch(`/api/locations/${slug}`, {
  lazy: true,
});

effect(() => {
  if (location.value) {
    mapStore.mapPoints = [location.value];
  }
});
</script>

<template>
  <div class="h-full grid grid-cols-3">
    <div class="bg-base-300 p-4">
      <div v-if="status === 'pending'">
        <BaseSpinner />
      </div>
      <div v-if="location && status !== 'pending'">
        <h2>{{ location.name }}</h2>
        <p>{{ location.description }}</p>
        <p>{{ msToReadableDate(location.createdAt) }}</p>
        <div v-if="!location.locationLogs.length">
          Add a location log to get started
          <BaseButton title="Add Location Log" />
        </div>
      </div>
      <BaseAlert
        v-if="error && status !== 'pending'"
        :label="error.statusMessage"
        variant="error"
        icon="tabler:cancel"
        class="mt-4"
      />
    </div>

    <div class="col-span-2 locations-map">
      <AppMap />
    </div>
  </div>
</template>

<style scoped>

</style>
