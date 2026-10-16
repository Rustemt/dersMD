import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { validateCoursePackage } from "../packages/schema/dist/index.js";

const dir = join(process.cwd(), "content/courses");
const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
let failed = 0;

for (const file of files) {
  const path = join(dir, file);
  const raw = JSON.parse(readFileSync(path, "utf8"));
  const result = validateCoursePackage(raw);
  if (result.ok) {
    console.log(`OK  ${file}`);
  } else {
    failed += 1;
    console.error(`FAIL ${file}`);
    for (const err of result.errors) console.error(`  - ${err}`);
  }
}

if (failed) {
  console.error(`\n${failed} dosya hatalı.`);
  process.exit(2);
}
console.log(`\n${files.length} kurs paketi geçerli.`);
