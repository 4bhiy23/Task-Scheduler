import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const projectsTable = pgTable("projects", {
  projectId: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull().unique(),
  description: text(),
});
