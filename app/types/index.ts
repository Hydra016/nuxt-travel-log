import type { User } from "better-auth";

export type TButtonVariant = "primary" | "secondary" | "accent" | "ghost" | "link" | "danger";
export type TIconVariant = "tabler:map-pin-plus" | "tabler:map-pin-filled" | "tabler:map-route" | "tabler:brand-nuxt" | "tabler:brand-google-maps" | "tabler:logout" | "tabler:map-pin" | "tabler:map" | "tabler:chevron-left" | "tabler:chevron-right" | "tabler:home" | "tabler:user" | "tabler:circle-plus-filled" | "tabler:cancel" | "tabler:map-pin ";
export type TAlertVariant = "success" | "error" | "warning" | "info";

declare module "h3" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: Omit<User, "id"> & {
      id: number;
    };
  }
}

export type LatLongItem = {
  lat: number;
  long: number;
};

export type MapPoint = {
  id: number;
  name: string;
  description?: string;
} & LatLongItem;
