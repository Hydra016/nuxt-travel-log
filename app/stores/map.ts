import type { MapPoint } from "~/types";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);
  const selectedPoint = ref<MapPoint | null>(null);
  const addedPoint = ref<MapPoint | null>(null);

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");
    const map = useMap();
    let bounds: any = null;

    effect(() => {
      const firstPoint = mapPoints.value[0];
      if (!firstPoint)
        return;
      bounds = mapPoints.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat]);
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ));

      map.map?.fitBounds(bounds, {
        padding: 100,
      });
    });

    effect(() => {
      if (selectedPoint.value) {
        map.map?.flyTo({
          center: [selectedPoint.value?.long, selectedPoint.value?.lat],
          zoom: 5,
          curve: 1,
          easing(t) {
            return t;
          },
        });
      }
      else if (bounds) {
        map.map?.fitBounds(bounds, {
          padding: 100,
        });
      }
    });

    watch(addedPoint, (newVal, oldVal) => {
      if (newVal && !oldVal) {
        map.map?.flyTo({
          center: [newVal.long, newVal.lat],
          zoom: 20,
          curve: 1,
          easing(t) {
            return t;
          },
        });
      }
    });
  }

  return {
    addedPoint,
    init,
    mapPoints,
    selectedPoint,
  };
});
