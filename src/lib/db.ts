import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const g = globalThis as unknown as { __dersmdDb?: DatabaseSync };

export function getDb() {
  if (g.__dersmdDb) return g.__dersmdDb;
  const dir = join(process.cwd(), "data");
  mkdirSync(dir, { recursive: true });
  const db = new DatabaseSync(join(dir, "dersmd.sqlite"));
  db.exec(`
    CREATE TABLE IF NOT EXISTS rooms (
      code TEXT PRIMARY KEY,
      payload TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);
  g.__dersmdDb = db;
  return db;
}
