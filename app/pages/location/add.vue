<script setup lang="ts">
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";

import { insertLocationSchema } from "~/lib/db/schema";

definePageMeta({
  layout: "dashboard",
});

const submitError = ref<string>("");
const loading = ref<boolean>(false);
const { handleSubmit, errors, setErrors, setFieldValue } = useForm({
  validationSchema: toTypedSchema(insertLocationSchema),
});
const { $csrfFetch } = useNuxtApp();
const mapStore = useMapStore();
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
      submitError.value = error.data?.statusMessage || error.statusMessage || "An error occurred while adding the location.";
    }
  }
  loading.value = false;
});

onMounted(() => {
  mapStore.addedPoint = {
    id: 1,
    name: "Added Point",
    description: "",
    long: 20,
    lat: 25,
  };
});

onBeforeRouteLeave(() => {
  mapStore.addedPoint = null;
});

effect(() => {
  if (mapStore.addedPoint) {
    setFieldValue("lat", mapStore.addedPoint.lat);
    setFieldValue("long", mapStore.addedPoint.long);
  }
});
</script>

<template>
  <div class="flex min-h-full">
    <div class="container max-w-md p-4 bg-base-300 min-h-full">
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
        <p>Drag the <BaseIcon :size="15" name="tabler:map-pin-filled" /> to your desired location.</p>
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

    <AppMap />
  </div>
</template>

<style scoped>

</style>
