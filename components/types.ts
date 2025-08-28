import { Schema } from "effect";

export const ColumnListItemSchema = Schema.Struct({
  name: Schema.String,
  type: Schema.NullOr(Schema.Literal("INT", "TEXT", "REAL", "BLOB")),
  defaultValue: Schema.String,
  index: Schema.Number,
});

export const ColumnListSchema = Schema.Array(ColumnListItemSchema);
export type ColumnListItemSchema = Schema.Schema.Type<typeof ColumnListItemSchema>;
export type ColumnListSchema = Schema.Schema.Type<typeof ColumnListSchema>;

export const SchemaGenSuccessResponse = Schema.Struct({
  success: Schema.Literal(true),
  schema: ColumnListSchema,
});

export const SchemaGenFailResponse = Schema.Struct({
  success: Schema.Literal(false),
});

export const SchemaGenResponse = Schema.Union(
  SchemaGenSuccessResponse, SchemaGenFailResponse,
);

export type SchemaGenReponse = Schema.Schema.Type<typeof SchemaGenResponse>;
export type SchemaGenSuccessResponse = Schema.Schema.Type<typeof SchemaGenSuccessResponse>;
export type SchemaGenFailResponse = Schema.Schema.Type<typeof SchemaGenFailResponse>;
