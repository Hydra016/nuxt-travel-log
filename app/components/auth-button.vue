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
  <button v-else :disabled="authStore.loading" class="btn btn-accent" @click="authStore.signIn">
    Sign in with GitHub
    <span v-if="authStore.loading" class="loading loading-spinner loading-md" />
    <Icon v-else name="tabler:brand-github" size="24" />
  </button>
</template>

<style scoped>

</style>
