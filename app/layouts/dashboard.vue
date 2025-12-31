<script setup>
const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <ClientOnly>
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" class="drawer-toggle">
      <div class="drawer-content flex flex-col">
        <AppNavbar />
        <div class="flex-1">
          <slot />
        </div>
      </div>
      <DashboardSidebar />
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>
