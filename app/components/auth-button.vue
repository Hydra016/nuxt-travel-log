<script setup>
const authStore = useAuthStore();
const router = useRouter();

function signOutUser() {
  authStore.signOut();
  router.push("/");
}
</script>

<template>
  <BaseDropdown v-if="!authStore.loading && authStore.user" :title="authStore.user?.name" :dropdown-img="authStore.user.image">
    <ul class="menu dropdown-content bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
      <li><a>Profile</a></li>
      <li><a>Settings</a></li>
      <li>
        <button @click="signOutUser">
          Sign Out
        </button>
      </li>
    </ul>
  </BaseDropdown>
  <BaseCustomButton v-if="!authStore.user" :disabled="authStore.loading" variant="accent" :action="authStore.signIn">
    <span>Sign In with GitHub</span>
    <span v-if="authStore.loading" class="loading loading-spinner loading-md" />
    <Icon v-else name="tabler:brand-github" size="24" />
  </BaseCustomButton>
</template>

<style scoped>

</style>
