import { ModuleShell } from "@/components/module-shell";
import { PaketClient } from "./paket-client";

export default function PaketPage() {
  return (
    <ModuleShell
      title="Açık ders paketi"
      lede="ders.json şemasını doğrula. Geçerli paketler kurs player’a eklenebilir."
    >
      <PaketClient />
    </ModuleShell>
  );
}
