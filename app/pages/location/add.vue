<script setup lang="ts">
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";

import { insertLocationSchema } from "~/lib/db/schema";

definePageMeta({
  layout: "dashboard",
});

const submitError = ref<string>("");
const loading = ref<boolean>(false);
const { handleSubmit, errors, setErrors } = useForm({
  validationSchema: toTypedSchema(insertLocationSchema),
});
const { $csrfFetch } = useNuxtApp();

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    submitError.value = "";
    await $csrfFetch("/api/locations", {
      method: "post",
      body: values,
    });
    navigateTo(`/dashboard`);
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data.data);
    }
    else {
      submitError.value = error.statusMessage || "An error occurred while adding the location.";
    }
  }
  loading.value = false;
});
</script>

<template>
  <div class="container max-w-md mx-auto p-4">
    <div class="my-4">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
      </p>
    </div>

    <form @submit.prevent="onSubmit">
      <AppFormField
        label="Location Name"
        name="name"
        type="text"
        placeholder="e.g., Paris, France"
        :error="errors.name"
        :disabled="loading"
      />
      <AppFormField
        label="Description"
        name="description"
        type="textarea"
        placeholder="Brief description of the location"
        :error="errors.description"
        :disabled="loading"
      />
      <AppFormField
        label="Longitude"
        name="long"
        type="number"
        placeholder="51.5074° N, 0.1278° W"
        :error="errors.long"
        :disabled="loading"
      />
      <AppFormField
        label="Latitude"
        name="lat"
        type="number"
        placeholder="56.9496° N, 24.1052° E"
        :error="errors.lat"
        :disabled="loading"
      />
      <fieldset class="flex justify-between">
        <BaseCustomButton :disabled="loading" variant="ghost">
          <BaseIcon name="tabler:cancel" class="inline-block" />
          <span>Cancel</span>
        </BaseCustomButton>
        <BaseCustomButton :disabled="loading" type="submit" variant="primary">
          <BaseSpinner v-if="loading" />
          <BaseIcon v-else name="tabler:circle-plus-filled" class="inline-block" />
          <span>Add Location</span>
        </BaseCustomButton>
      </fieldset>
    </form>

    <BaseAlert
      v-if="submitError"
      :label="submitError"
      variant="error"
      icon="tabler:cancel"
      class="mt-4"
    />
  </div>
</template>

<style scoped>

</style>
