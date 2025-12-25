<script setup>
const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppNavbar />
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>

</style>
