<script setup>
import SidebarItem from "./sidebar-item.vue";

const authStore = useAuthStore();
</script>

<template>
  <div class="drawer-side is-drawer-close:overflow-visible">
    <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay" />
    <div class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      <ul class="menu w-full grow py-5 flex flex-col justify-between">
        <div class="flex flex-col gap-4 mt-5">
          <SidebarItem title="Locations" icon-name="tabler:map" path="/dashboard" />
          <SidebarItem title="Add Location" icon-name="tabler:circle-plus-filled" path="/location/add" />
        </div>
        <SidebarItem title="Signout" icon-name="tabler:logout" path="/" :action="authStore.signOut" />
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
