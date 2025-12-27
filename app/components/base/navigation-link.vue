<script setup lang="ts">
import type { PropType } from "vue";

import type { TButtonVariant } from "~/types/index";

const {
  variant,
  title,
  iconName,
  iconSize,
  rtl,
} = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as PropType<TButtonVariant>,
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
  rtl: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <NuxtLink
    class="btn"
    :class="[`btn-${variant} ${rtl ? 'flex-row-reverse' : ''}`]"
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
