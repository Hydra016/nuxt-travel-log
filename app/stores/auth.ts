import { createAuthClient } from "better-auth/vue";
import { defineStore } from "pinia";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = authClient.useSession();
  const user = computed(() => session.value.data?.user || null);
  const loading = computed(() => session.value.isPending || session.value.isRefetching);

  async function signIn() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/404",
    });
  }

  async function signOut() {
    await authClient.signOut();
  }

  return {
    signIn,
    loading,
    user,
    signOut,
  };
});
