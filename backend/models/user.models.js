import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { projectsTable } from "./project.models.js";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  project: uuid().references(()=> projectsTable.projectId),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  salt: text()
});
