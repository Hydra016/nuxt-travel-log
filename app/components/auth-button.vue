<script setup>
const authStore = useAuthStore();
const router = useRouter();

function signOutUser() {
  authStore.signOut();
  router.push("/");
}
</script>

<template>
  <ClientOnly>
    <BaseDropdown
      v-if="!authStore.loading && authStore.user"
      :title="authStore.user?.name || 'Account'"
      :dropdown-img="authStore.user.image"
    >
      <li><a>Profile</a></li>
      <li><a>Settings</a></li>
      <li>
        <button @click="signOutUser">
          Sign Out
        </button>
      </li>
    </BaseDropdown>

    <BaseCustomButton
      v-else
      :disabled="authStore.loading"
      variant="accent"
      :action="authStore.signIn"
    >
      <span>Sign In with GitHub</span>
      <span v-if="authStore.loading" class="loading loading-spinner loading-md" />
      <Icon v-else name="tabler:brand-github" size="24" />
    </BaseCustomButton>

    <template #fallback>
      <div class="btn m-1 p-8 opacity-70">
        Loading…
      </div>
    </template>
  </ClientOnly>
</template>
