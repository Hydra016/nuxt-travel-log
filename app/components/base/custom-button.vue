<script setup lang="ts">
import type { PropType } from "vue";

import type { TButtonVariant } from "~/types/index";

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
    type: String as PropType<TButtonVariant>,
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
