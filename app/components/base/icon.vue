<script setup lang="ts">
import type { PropType } from "vue";

import type { TIconVariant } from "~/types/index";

const { name } = defineProps({
  name: {
    type: String as PropType<TIconVariant>,
    required: true,
  },
  size: {
    type: Number,
    default: 24,
  },
});
</script>

<template>
  <Icon :name="name" :size="size" />
</template>

<style scoped>

</style>
