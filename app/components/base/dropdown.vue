<script setup>
const { title, dropdownImg } = defineProps({
  title: {
    type: String,
    required: true,
  },
  dropdownImg: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <details class="dropdown dropdown-end">
    <summary class="btn m-1 p-8 gap-4">
      <span>{{ title }}</span>

      <div v-if="dropdownImg" class="avatar">
        <div class="w-10 rounded-full">
          <img :src="dropdownImg" alt="User Avatar">
        </div>
      </div>
    </summary>

    <ul class="menu dropdown-content bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
      <slot />
    </ul>
  </details>
</template>

<style scoped>

</style>
