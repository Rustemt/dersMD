import { ModuleShell } from "@/components/module-shell";
import { IlerlemeClient } from "./ilerleme-client";

export default function IlerlemePage() {
  return (
    <ModuleShell
      title="İlerleme yedekle"
      lede="Tarayıcıdaki DersMD ilerlemesini JSON olarak dışa/içe aktar."
    >
      <IlerlemeClient />
    </ModuleShell>
  );
}
