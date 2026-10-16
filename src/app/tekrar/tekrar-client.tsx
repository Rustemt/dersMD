"use client";

import { useEffect, useMemo, useState } from "react";
import type { Deck } from "@/lib/flashcards";
import { createCardState, reviewCard, type CardState } from "@/lib/sm2";
import { Button } from "@/components/ui/button";

export function TekrarClient({ decks }: { decks: Deck[] }) {
  const [deckId, setDeckId] = useState(decks[0]?.id);
  const deck = decks.find((d) => d.id === deckId) ?? decks[0];
  const [ready, setReady] = useState(false);
  const [states, setStates] = useState<Record<string, CardState>>({});
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setStates(
      Object.fromEntries(deck.cards.map((c) => [c.id, createCardState(c.id)])),
    );
    setReady(true);
    setFlipped(false);
  }, [deck]);

  const due = useMemo(() => {
    if (!ready) return [];
    const now = Date.now();
    return deck.cards
      .filter((c) => (states[c.id]?.due ?? 0) <= now)
      .sort((a, b) => (states[a.id].due ?? 0) - (states[b.id].due ?? 0));
  }, [deck.cards, states, ready]);
  const current = due[0];

  function grade(g: 0 | 1 | 2 | 3) {
    if (!current) return;
    setStates((prev) => ({
      ...prev,
      [current.id]: reviewCard(prev[current.id], g),
    }));
    setFlipped(false);
  }

  return (
    <div className="tool-block">
      <label className="field">
        <span>Deste</span>
        <select
          value={deck.id}
          onChange={(e) => {
            setReady(false);
            setDeckId(e.target.value);
          }}
        >
          {decks.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title}
            </option>
          ))}
        </select>
      </label>

      {!ready ? <p className="empty-note">Kartlar hazırlanıyor…</p> : null}
      {ready && !current ? (
        <p className="empty-note">Bu deste için bugün kart kalmadı.</p>
      ) : null}
      {ready && current ? (
        <>
          <p className="eyebrow">
            {deck.title} · kalan {due.length}
          </p>
          <button
            type="button"
            className="flash-card"
            onClick={() => setFlipped((v) => !v)}
          >
            {flipped ? current.back : current.front}
            <span>{flipped ? "Cevap" : "Soru — çevirmek için tıkla"}</span>
          </button>
          {flipped ? (
            <div className="quiz-actions">
              <Button type="button" variant="outline" onClick={() => grade(0)}>
                Tekrar
              </Button>
              <Button type="button" variant="outline" onClick={() => grade(1)}>
                Zor
              </Button>
              <Button type="button" onClick={() => grade(2)}>
                İyi
              </Button>
              <Button type="button" onClick={() => grade(3)}>
                Kolay
              </Button>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
