import { format } from "date-fns";

export function msToReadableDate(ms: number): string {
  return format(new Date(ms), "do MMMM yyyy");
}
