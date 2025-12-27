<script setup lang="ts">
import SidebarItem from "./sidebar-item.vue";

const locationStore = useLocationsStore();
const { locations, status } = storeToRefs(locationStore);

const authStore = useAuthStore();
</script>

<template>
  <div class="drawer-side is-drawer-close:overflow-visible">
    <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay" />
    <div class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      <ul class="menu w-full grow py-5 flex flex-col justify-between">
        <div class="flex flex-col gap-4 mt-5">
          <NuxtLink to="/dashboard" class="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-2 mb-2">
            <BaseIcon name="tabler:brand-nuxt" :size="24" />
            <h3 class="is-drawer-close:hidden text-xl font-bold">
              Travel Log
            </h3>
          </NuxtLink>
          <div class="mt-5">
            <SidebarItem title="Locations" icon-name="tabler:map" path="/dashboard" />
            <SidebarItem title="Add Location" icon-name="tabler:circle-plus-filled" path="/location/add" />
          </div>
          <div class="divider" />
          <div>
            <div class="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 mb-2">
              <BaseIcon name="tabler:map-route" :size="24" />
              <h3 class="is-drawer-close:hidden text-xl font-bold">
                Your Locations
              </h3>
            </div>
            <div v-if="status === 'pending'" class="flex justify-center py-5">
              <BaseSpinner />
            </div>
            <div v-if="locations && locations.length > 0">
              <SidebarItem
                v-for="location in locations"
                :key="location.id"
                :title="location.name"
                icon-name="tabler:map-pin"
                :path="`/location/${location.id}`"
              />
            </div>
            <div v-if="status !== 'pending' && locations.length === 0" class="px-3 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="No locations added">
              <span class="is-drawer-close:hidden ml-8">No locations added</span>
            </div>
          </div>
        </div>
        <SidebarItem
          title="Signout"
          icon-name="tabler:logout"
          path="/"
          :action="authStore.signOut"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
