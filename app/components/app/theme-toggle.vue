<script lang="ts" setup>
const colorMode = useColorMode();
const isDark = computed({
  get: () => colorMode.value === "dark",
  set: (val: boolean) => {
    colorMode.preference = val ? "dark" : "light";
  },
});
</script>

<template>
  <label class="swap swap-rotate">
    <input
      v-model="isDark"
      type="checkbox"
      class="theme-controller"
      value="synthwave"
    >
    <Icon size="24" class="swap-on" name="tabler:sun" />
    <Icon size="24" class="swap-off" name="tabler:moon" />
  </label>
</template>

<style scoped>

</style>
