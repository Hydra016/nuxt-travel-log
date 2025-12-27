<script lang="ts" setup>
import type { PropType } from "vue";

import { useRoute } from "vue-router";

import type { TIconVariant } from "~/types/index";

const { title, path, iconName } = defineProps({
  title: {
    type: String,
    default: "Start Logging",
  },
  path: {
    type: String,
    default: "/dashboard",
  },
  iconName: {
    type: String as PropType<TIconVariant>,
    default: "tabler:home",
  },
  action: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
});
const route = useRoute();
</script>

<template>
  <li>
    <NuxtLink
      class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
      :class="{ 'bg-base-300': route.path === path }"
      :data-tip="title"
      :to="path"
      @click="action"
    >
      <BaseIcon :name="iconName" :size="24" />
      <span class="is-drawer-close:hidden">{{ title }}</span>
    </NuxtLink>
  </li>
</template>

<style scoped>

</style>
