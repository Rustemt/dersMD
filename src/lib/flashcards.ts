import deck from "../../content/flashcards/python-temel.json";

export type Flashcard = { id: string; front: string; back: string };
export type Deck = { id: string; title: string; cards: Flashcard[] };

export function getDecks(): Deck[] {
  return [deck as Deck];
}
