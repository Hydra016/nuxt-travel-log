<script setup>

</script>

<template>
  <div>
    <div class="navbar bg-neutral text-neutral-content">
      <NuxtLink to="/" class="navbar-start btn btn-ghost text-xl">
        Nuxt Travel Log
      </NuxtLink>
      <div class="navbar-end">
        <AppThemeToggle class="mr-4" />
        <AuthButton />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
