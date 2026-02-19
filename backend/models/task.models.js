import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { projectsTable } from "./project.models.js";

export const taskStatusEnum = pgEnum('task_status', ['todo', 'in-progress', 'done']);

export const tasksTable = pgTable("tasks", {
  taskId: uuid("task_id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projectsTable.projectId, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: taskStatusEnum("status").default('todo').notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
