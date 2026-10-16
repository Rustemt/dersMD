import { ModuleShell } from "@/components/module-shell";
import { RubrikClient } from "./rubrik-client";

export default function RubrikPage() {
  return (
    <ModuleShell
      title="Rubrik puanlayıcı"
      lede="Kriterlere puan ver; toplamı gör ve yazdırılabilir özet al."
    >
      <RubrikClient />
    </ModuleShell>
  );
}
