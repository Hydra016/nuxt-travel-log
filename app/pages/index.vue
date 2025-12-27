<script setup>
const authStore = useAuthStore();
</script>

<template>
  <div class="hero container mx-auto mt-4 min-height-96">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Nuxt Travel Log
        </h1>
        <p class="py-6">
          Keep track of your travels and adventures with Nuxt Travel Log! Share your memories with others and enjoy!
        </p>
        <AuthButton v-if="!authStore.user" />
        <BaseNavigationLink
          v-else
          path="/dashboard"
          variant="primary"
          title="Start Logging"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
