import { defineStore } from "pinia";

export const useLocationsStore = defineStore("useLocationsStore", () => {
  const { data: locations, status, refresh } = useFetch("/api/locations", {
    lazy: true,
  });

  return {
    locations,
    status,
    refresh,
  };
});
