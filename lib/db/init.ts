import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data.db");

let db: sqlite3.Database | null = null;

export function initializeDatabase(): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    // Check if database file exists
    if (!fs.existsSync(DB_PATH)) {
      reject(new Error(`Database file not found at: ${DB_PATH}`));
      return;
    }

    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error("Error opening database:", err.message);
        reject(err);
        return;
      }

      console.log("Connected to SQLite database at:", DB_PATH);
      resolve(db!);
    });
  });
}

export function getDatabase(): sqlite3.Database {
  if (!db) {
    throw new Error("Database not initialized. Call initializeDatabase() first.");
  }
  return db;
}

export function closeDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!db) {
      resolve();
      return;
    }

    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
        reject(err);
        return;
      }

      console.log("Database connection closed.");
      db = null;
      resolve();
    });
  });
}
