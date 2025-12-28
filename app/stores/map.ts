import { useMap } from "@indoorequal/vue-maplibre-gl";
import { LngLatBounds } from "maplibre-gl";

import type { MapPoint } from "~/types";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);
  const map = useMap();
  const selectedPoint = ref<MapPoint | null>(null);
  let bounds: LngLatBounds | null = null;

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

  return {
    mapPoints,
    selectedPoint,
  };
});
