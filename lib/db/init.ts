import postgres from "postgres";

export type SQLColumnType = "INT" | "TEXT" | "REAL" | "BLOB";

export type DBColumnInfo = {
  name: string;
  type: SQLColumnType;
  defaultValue: string;
};

export type DBInfo = {
  name: string;
  columns: DBColumnInfo[];
};

const dbUrl = process.env.DB_URL || "";
const dbPwd = process.env.DB_PWD || "";

const projectId = dbUrl.replace("https://", "").replace(".supabase.co", "");
const connectionString = `postgresql://postgres.${projectId}:${dbPwd}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;

let sql: ReturnType<typeof postgres> | null = null;

export const sanitizeString = (input: string): string => {
  return input.replace(/[^a-zA-Z0-9_\-\s()]/g, "");
};

export const createTableQuery = (info: DBInfo) => {
  const name = sanitizeString(info.name);
  const columns = info.columns.map(({ name, type, defaultValue }) => {
    if (defaultValue === "") {
      return `${sanitizeString(name)} ${sanitizeString(type)}`;
    }
    return `${sanitizeString(name)} ${sanitizeString(type)} DEFAULT ${sanitizeString(defaultValue)}`;
  }).join(", ");

  return `CREATE TABLE ${sanitizeString(name)} (${columns});`;
};

export const createTable = async (info: DBInfo) => {
  const db = getDB();
  const query = createTableQuery(info);

  try {
    await db.unsafe(query);
    return { success: true };
  }

  catch (error) {
    console.error("Error creating table:", error);
    return { success: false, error };
  }
};

export const getDB = () => {
  if (sql !== null) {
    return sql;
  }
  sql = postgres(connectionString);
  return sql;
};
