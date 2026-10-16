import assert from "node:assert/strict";
import test from "node:test";
import { validateCoursePackage } from "./index.js";

test("geçerli paket OK", () => {
  const result = validateCoursePackage({
    id: "t",
    title: "T",
    level: "A",
    minutes: 10,
    summary: "s",
    audience: "a",
    lessons: [
      {
        id: "l1",
        title: "L",
        minutes: 5,
        body: ["hi"],
        quiz: {
          prompt: "?",
          choices: ["a", "b"],
          answerIndex: 1,
          explain: "b",
        },
      },
    ],
  });
  assert.equal(result.ok, true);
});

test("eksik lessons FAIL", () => {
  const result = validateCoursePackage({
    id: "t",
    title: "T",
    level: "A",
    minutes: 10,
    summary: "s",
    audience: "a",
    lessons: [],
  });
  assert.equal(result.ok, false);
  assert.ok(result.errors.length > 0);
});
