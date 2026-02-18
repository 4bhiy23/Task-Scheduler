import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";
import { projectsTable } from "./project.models.js";
import { usersTable } from "./user.models.js";

export const projectDevelopers = pgTable(
  "project_developers",
  {
    projectId: uuid("project_id")
      .notNull()
      .references(() => projectsTable.projectId, { onDelete: "cascade" }),

    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.userId, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.projectId, table.userId] }),
  })
);
