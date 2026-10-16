import { ModuleShell } from "@/components/module-shell";
import { DikteClient } from "./dikte-client";

export default function DiktePage() {
  return (
    <ModuleShell
      title="Sesli okuma / dikte"
      lede="Cümleyi dinle, yaz. Tarayıcının konuşma sentezi kullanılır."
    >
      <DikteClient />
    </ModuleShell>
  );
}
