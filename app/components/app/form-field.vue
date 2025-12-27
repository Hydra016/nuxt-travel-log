<script setup lang="ts">
const { error, label, name, type, placeholder } = defineProps<{
  error?: string;
  label?: string;
  name: string;
  placeholder?: string;
  type: "text" | "number" | "textarea";
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="mb-4">
    <legend for="name" class="fieldset-legend">
      {{ label }}
    </legend>
    <Field
      :type="type || 'text'"
      :name="name"
      :disabled="disabled || false"
      class="w-full input"
      :placeholder="placeholder || label"
      :class="{
        'input-error': error,
        'text': !type || type === 'text',
        'number': type === 'number',
        'textarea': type === 'textarea',
      }"
    />
    <p v-if="error" class="fieldset-label text-error">
      {{ error }}
    </p>
  </fieldset>
</template>

<style scoped>

</style>
