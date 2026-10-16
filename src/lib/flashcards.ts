import python from "../../content/flashcards/python-temel.json";
import english from "../../content/flashcards/ingilizce-a1.json";
import lgsMat from "../../content/flashcards/lgs-mat.json";

export type Flashcard = { id: string; front: string; back: string };
export type Deck = { id: string; title: string; cards: Flashcard[] };

export function getDecks(): Deck[] {
  return [python as Deck, english as Deck, lgsMat as Deck];
}
