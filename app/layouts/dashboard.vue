<script setup>
const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <ClientOnly>
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" class="drawer-toggle">
      <div class="drawer-content">
        <AppNavbar />
        <div class="p-4">
          <slot />
        </div>
      </div>
      <DashboardSidebar />
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>
