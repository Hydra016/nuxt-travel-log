<script setup lang="ts">
import type { PropType } from "vue";

import type { TButtonVariant } from "~/types/index";

const {
  disabled,
  variant,
  action,
  title,
  iconName,
  iconSize,
} = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as PropType<TButtonVariant>,
    default: "accent",
  },
  action: {
    type: Function as PropType<(() => void) | undefined>,
    default: undefined,
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
  <button
    :disabled="disabled"
    class="btn" :class="[`btn-${variant}`]"
    @click="action?.()"
  >
    {{ title }}
    <Icon
      v-if="iconName"
      :name="`tabler:${iconName}`"
      :size="iconSize"
    />
  </button>
</template>
