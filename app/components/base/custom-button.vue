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
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button",
  },
});
</script>

<template>
  <button
    :disabled="disabled"
    class="btn"
    :class="[`btn-${variant}`]"
    :type="type"
    @click="action?.()"
  >
    <slot />
  </button>
</template>
