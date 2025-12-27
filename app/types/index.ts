import type { User } from "better-auth";

export type TButtonVariant = "primary" | "secondary" | "accent" | "ghost" | "link" | "danger";
export type TIconVariant = "tabler:chevron-left" | "tabler:chevron-right" | "tabler:home" | "tabler:user" | "tabler:circle-plus-filled" | "tabler:cancel";
export type TAlertVariant = "success" | "error" | "warning" | "info";

declare module "h3" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: Omit<User, "id"> & {
      id: number;
    };
  }
}
