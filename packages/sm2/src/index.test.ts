import assert from "node:assert/strict";
import test from "node:test";
import { createCardState, reviewCard } from "./index.js";

test("again sıfırlar", () => {
  const now = 1_000_000;
  let card = createCardState("c1", now);
  card = reviewCard(card, 2, now);
  card = reviewCard(card, 0, now + 1);
  assert.equal(card.repetitions, 0);
  assert.equal(card.interval, 0);
});

test("good aralığı büyütür", () => {
  const now = 1_000_000;
  let card = createCardState("c1", now);
  card = reviewCard(card, 2, now);
  assert.equal(card.interval, 1);
  card = reviewCard(card, 2, now + 1);
  assert.equal(card.interval, 3);
});
