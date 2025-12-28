<script setup>
definePageMeta({
  layout: "dashboard",
});

const locationStore = useLocationsStore();
const { locations, status } = storeToRefs(locationStore);
onMounted(() => {
  locationStore.refresh();
});
</script>

<template>
  <div class="page-content-top">
    <div v-if="status === 'pending'">
      <div class="location-list flex flex-wrap gap-4 mt-4">
        <BaseSkeleton v-for="(i) in 7" :key="i" />
      </div>
    </div>
    <div v-else-if="locations && locations.length > 0" class="location-list flex flex-wrap gap-4 mt-4">
      <LocationCard
        v-for="location in locations"
        :key="location.id"
        :name="location.name"
        :description="location.description"
        :location="location"
      />
    </div>
    <div v-else class="flex flex-col gap-4 mt-80 items-center justify-center min-h-full">
      <NuxtLink to="/location/add" class="btn btn-primary w-40">
        Add Location
        <Icon name="tabler:circle-plus-filled" size="24" />
      </NuxtLink>
      <p>Add a location to get started</p>
    </div>

    <AppMap />
  </div>
</template>

<style scoped>

</style>
