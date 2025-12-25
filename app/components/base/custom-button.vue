<script setup lang="ts">
import type { PropType } from "vue";

import type { ButtonVariant } from "~/types/index";

const {
  disabled,
  variant,
  action,
} = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as PropType<ButtonVariant>,
    default: "accent",
  },
  action: {
    type: Function as PropType<(() => void) | undefined>,
    default: undefined,
  },
});
</script>

<template>
  <button
    :disabled="disabled"
    class="btn" :class="[`btn-${variant}`]"
    @click="action?.()"
  >
    <slot />
  </button>
</template>
