<script setup>
const authStore = useAuthStore();
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <label
        v-if="authStore.user"
        for="my-drawer-4"
        aria-label="open sidebar"
        class="btn btn-square btn-ghost"
      >
        <BaseIcon name="tabler:layout-sidebar-right-filled" :size="24" />
      </label>
    </div>
    <div class="navbar-end">
      <AppThemeToggle class="mr-4" />
      <AuthButton />
    </div>
  </div>
</template>

<style scoped></style>
