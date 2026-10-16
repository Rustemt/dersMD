import { ModuleShell } from "@/components/module-shell";
import { TekrarClient } from "./tekrar-client";
import { getDecks } from "@/lib/flashcards";

export default function TekrarPage() {
  const decks = getDecks();
  return (
    <ModuleShell
      title="Tekrar motoru"
      lede="Kartları yanıtla; SM-2 lite ile bir sonraki tekrar zamanı hesaplanır."
    >
      <TekrarClient decks={decks} />
    </ModuleShell>
  );
}
