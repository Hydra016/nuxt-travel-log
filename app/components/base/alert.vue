<script setup lang="ts">
import type { TAlertVariant } from "~/types";
import type { TIconVariant } from "~/types/index";

const { label, variant } = defineProps({
  label: {
    type: String,
    default: "Alert Label",
  },
  variant: {
    type: String as PropType<TAlertVariant>,
    default: "info",
  },
  icon: {
    type: String as PropType<TIconVariant>,
    default: "",
  },
  iconSize: {
    type: Number,
    default: 24,
  },
});
</script>

<template>
  <div role="alert" class="alert" :class="[`alert-${variant}`]">
    <BaseIcon :name="icon" :size="iconSize" />
    <span>{{ label }}</span>
  </div>
</template>

<style scoped>

</style>
