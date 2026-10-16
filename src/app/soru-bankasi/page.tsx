import { ModuleShell } from "@/components/module-shell";
import { getBanks } from "@/lib/questions";
import { SoruBankasiClient } from "./soru-client";

export default function SoruBankasiPage() {
  return (
    <ModuleShell
      title="Soru bankası"
      lede="Konuya göre çöz; yanlışlar otomatik tekrar kuyruğuna eklenir."
    >
      <SoruBankasiClient banks={getBanks()} />
    </ModuleShell>
  );
}
