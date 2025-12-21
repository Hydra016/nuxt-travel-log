import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const locations = sqliteTable("locations_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});
