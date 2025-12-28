import { defineStore } from "pinia";

import { useMapStore } from "./map";

export const useLocationsStore = defineStore("useLocationsStore", () => {
  const { data: locations, status, refresh } = useFetch("/api/locations", {
    lazy: true,
  });

  const mapStore = useMapStore();

  effect(() => {
    if (locations.value) {
      mapStore.mapPoints = locations.value;
    }
  });

  return {
    locations,
    status,
    refresh,
  };
});
