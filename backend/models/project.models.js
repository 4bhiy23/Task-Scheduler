import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('project_status', ['active', 'closed', 'in-future']);
export const rolesEnum = pgEnum('project_roles', ['admin', 'lead', 'developer']);

export const projectsTable = pgTable("projects", {
  projectId: uuid("project_id").primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull().unique(),
  startDate: varchar({ length: 255 }).notNull(),
  endDate: varchar({ length: 255 }),
  // status: statusEnum('status').notNull().default('active'),
  createdAt: timestamp("created_at").defaultNow(),
  description: text(),
});
