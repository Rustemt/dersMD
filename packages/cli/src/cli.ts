#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { validateCoursePackage } from "@dersmd/schema";

const args = process.argv.slice(2);
const target = args[0] === "validate" ? args[1] : args[0];

if (!target) {
  console.error("Kullanım: npx @dersmd/cli validate <dosya.json>");
  process.exit(1);
}

try {
  const raw = JSON.parse(readFileSync(target, "utf8"));
  const result = validateCoursePackage(raw);
  if (result.ok) {
    console.log(`OK: ${target}`);
    process.exit(0);
  }
  console.error(`HATA: ${target}`);
  for (const err of result.errors) console.error(` - ${err}`);
  process.exit(2);
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
}
