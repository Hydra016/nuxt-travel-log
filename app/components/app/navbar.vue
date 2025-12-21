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
        <a class="btn btn-accent">
          Sign in with GitHub
          <Icon name="tabler:brand-github" size="24" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
