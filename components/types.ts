import z from "zod";

export const ColumnListItemSchema = z.object({
  name: z.string(),
  type: z.enum(["INT", "TEXT", "REAL", "BLOB"]).nullable(),
  defaultValue: z.string(),
  index: z.number(),
});

export const ColumnListSchema = z.array(ColumnListItemSchema);

export type ColumnListItem = z.infer<typeof ColumnListItemSchema>;

export type ColumnList = z.infer<typeof ColumnListSchema>;
