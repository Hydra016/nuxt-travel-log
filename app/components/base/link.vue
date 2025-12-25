<script setup lang="ts">
import type { PropType } from "vue";

import type { ButtonVariant } from "~/types/index";

const {
  variant,
  title,
  iconName,
  iconSize,
} = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as PropType<ButtonVariant>,
    default: "accent",
  },
  path: {
    type: String,
    default: "/",
  },
  title: {
    type: String,
    default: "Button Title",
  },
  iconName: {
    type: String,
    default: "",
  },
  iconSize: {
    type: Number,
    default: 24,
  },
});
</script>

<template>
  <NuxtLink
    class="btn" :class="[`btn-${variant}`]"
    :to="path"
  >
    {{ title }}
    <Icon
      v-if="iconName"
      :name="`tabler:${iconName}`"
      :size="iconSize"
    />
  </NuxtLink>
</template>
