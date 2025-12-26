<script setup>
const authStore = useAuthStore();
onMounted(() => authStore.init()); // if init is client-only
</script>

<template>
  <div>
    <AppNavbar />
    <main class="p-4">
      <slot />
    </main>
  </div>
</template>
